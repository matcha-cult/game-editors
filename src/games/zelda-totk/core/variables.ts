/**
 * TOTK 存档的变量/结构引擎。
 *
 * TOTK 的 progress.sav 由「哈希表 + 数据区」组成：0x28 起每 8 字节是
 * (哈希, 值或指针)；数组、字符串、64 位整数、向量类型存的是指向数据区的指针。
 * 本模块按既有编辑器的语义实现读取与写回，但不含任何 DOM 逻辑。
 */
import type { SaveFile } from '../../../core/saveFile';
import { hashReverse, hashText, toHex32 } from './murmur3';

export type Vector2 = { x: number; y: number };
export type Vector3 = { x: number; y: number; z: number };
export type VariableValue = number | boolean | string | bigint | Vector2 | Vector3 | VariableValue[];

export interface VariableInfo {
  readonly hash: string;
  readonly type: string;
  readonly label?: string;
  readonly propertyName?: string;
  readonly enumValues?: readonly string[];
  readonly arrayPartitionSize?: number;
}

export interface SubStructInfo {
  readonly structArray: string;
  readonly variablesInfo: readonly VariableInfo[];
}

export type StructFieldInfo = VariableInfo | SubStructInfo;

export interface StructExport {
  totkStruct: string;
  [key: string]: unknown;
}

/** 坐标转换：存档内的 Y 轴是取反的，Z 轴有 +105 偏移 */
const RAW_COORDINATES_TRANSFORM = true;
/** 元数据终止哈希（MetaData.SaveTypeHash） */
const SAVE_TYPE_HASH = 0xa3db7114;
/** 哈希表起始偏移 */
const HASH_TABLE_START = 0x28;

function isSubStruct(field: StructFieldInfo): field is SubStructInfo {
  return typeof (field as SubStructInfo).structArray === 'string';
}

export function variableSize(type: string): number {
  switch (type) {
    case 'Bool':
    case 'Int':
    case 'UInt':
    case 'Enum':
    case 'Float':
      return 4;
    case 'Vector2':
      return 8;
    case 'Vector3':
      return 12;
    case 'UInt64':
      return 8;
    case 'String64':
      return 0x40;
    case 'WString16':
      return 0x20;
    default:
      throw new Error('Invalid array type: ' + type);
  }
}

/** 一个存档文件的变量读取上下文（对应上游 tempFile + Variable 的静态缓存） */
export class VariableEngine {
  readonly saveFile: SaveFile;
  hashTableEnd: number;
  private readonly offsetCache = new Map<number, number>();

  constructor(saveFile: SaveFile, hashTableEnd = 0) {
    this.saveFile = saveFile;
    this.hashTableEnd = hashTableEnd || this.findHashTableEnd();
  }

  /** MetaData.SaveTypeHash 的位置即哈希表结束位置（不同版本/改版存档不一样） */
  findHashTableEnd(): number {
    for (let i = HASH_TABLE_START; i < this.saveFile.fileSize; i += 8) {
      if (this.saveFile.readU32(i) === SAVE_TYPE_HASH) return i + 4;
    }
    return 0;
  }

  /** 哈希表中该哈希对应的值偏移（未解引用） */
  getHashOffset(hash: number): number {
    const cached = this.offsetCache.get(hash);
    if (cached !== undefined) return cached;
    for (let i = HASH_TABLE_START; i < this.hashTableEnd; i += 8) {
      if (this.saveFile.readU32(i) === hash) {
        this.offsetCache.set(hash, i + 4);
        return i + 4;
      }
    }
    throw new Error('Hash ' + toHex32(hash) + ' not found');
  }

  /** 解析变量的实际数据偏移；指针类型需要再读一次 u32 */
  resolveOffset(hash: number, isPointer: boolean): number {
    const offset = this.getHashOffset(hash);
    return isPointer ? this.saveFile.readU32(offset) : offset;
  }

  readRaw(type: string, offset: number, bitIndex?: number): VariableValue {
    if (type === 'BoolArray' && typeof bitIndex === 'number') {
      const byteRead = this.saveFile.readU8(offset + Math.floor(bitIndex / 8));
      return !!((byteRead >> bitIndex % 8) & 0x01);
    }
    switch (type) {
      case 'Bool':
        return this.saveFile.readU32(offset);
      case 'Int':
        return this.saveFile.readS32(offset);
      case 'UInt':
        return this.saveFile.readU32(offset);
      case 'Enum': {
        const value = this.saveFile.readU32(offset);
        return hashReverse(value) ?? value;
      }
      case 'Float':
        return this.saveFile.readF32(offset);
      case 'Vector2':
        return { x: this.saveFile.readF32(offset), y: this.saveFile.readF32(offset + 4) };
      case 'Vector3':
        if (RAW_COORDINATES_TRANSFORM) {
          return {
            x: this.saveFile.readF32(offset),
            y: -this.saveFile.readF32(offset + 8),
            z: this.saveFile.readF32(offset + 4) - 105,
          };
        }
        return {
          x: this.saveFile.readF32(offset),
          y: this.saveFile.readF32(offset + 4),
          z: this.saveFile.readF32(offset + 8),
        };
      case 'UInt64': {
        const lower = this.saveFile.readU32(offset);
        const upper = this.saveFile.readU32(offset + 4);
        return (BigInt(upper) << BigInt(32)) | BigInt(lower);
      }
      case 'String64':
        return this.saveFile.readString(offset, 0x40);
      case 'WString16': {
        let text = '';
        for (let i = 0; i < 0x20; i += 2) {
          const charCode = this.saveFile.readU16(offset + i);
          if (!charCode) break;
          text += String.fromCharCode(charCode);
        }
        return text.replace(/\u0000+$/g, '');
      }
      default:
        throw new Error('Invalid variable type: ' + type);
    }
  }

  writeRaw(type: string, offset: number, value: VariableValue, bitIndex?: number): void {
    if (type === 'BoolArray' && typeof bitIndex === 'number') {
      const byteOffset = offset + Math.floor(bitIndex / 8);
      const bitMask = 1 << bitIndex % 8;
      let fullByte = this.saveFile.readU8(byteOffset);
      fullByte = value ? fullByte | bitMask : fullByte & (~bitMask & 0xff);
      this.saveFile.writeU8(byteOffset, fullByte);
      return;
    }
    switch (type) {
      case 'Bool':
        this.saveFile.writeU32(offset, value ? 1 : 0);
        return;
      case 'Int':
        this.saveFile.writeS32(offset, Number(value));
        return;
      case 'UInt':
        this.saveFile.writeU32(offset, Number(value));
        return;
      case 'Enum':
        this.saveFile.writeU32(offset, typeof value === 'string' ? hashText(value) : Number(value));
        return;
      case 'Float':
        this.saveFile.writeF32(offset, Number(value));
        return;
      case 'Vector2': {
        const vector = value as Vector2;
        this.saveFile.writeF32(offset, vector.x);
        this.saveFile.writeF32(offset + 4, vector.y);
        return;
      }
      case 'Vector3': {
        const vector = value as Vector3;
        if (RAW_COORDINATES_TRANSFORM) {
          this.saveFile.writeF32(offset, vector.x);
          this.saveFile.writeF32(offset + 4, vector.z + 105);
          this.saveFile.writeF32(offset + 8, -vector.y);
        } else {
          this.saveFile.writeF32(offset, vector.x);
          this.saveFile.writeF32(offset + 4, vector.y);
          this.saveFile.writeF32(offset + 8, vector.z);
        }
        return;
      }
      case 'UInt64': {
        const bigint = typeof value === 'bigint' ? value : BigInt(String(value));
        this.saveFile.writeU32(offset, Number(bigint & BigInt(0xffffffff)));
        this.saveFile.writeU32(offset + 4, Number(bigint >> BigInt(32)));
        return;
      }
      case 'String64': {
        const text = String(value);
        this.saveFile.writeString(offset, text, Math.min(text.length + 1, 0x40));
        return;
      }
      case 'WString16': {
        const text = String(value);
        const bytes = new Array<number>(0x20).fill(0);
        for (let i = 0; i < text.length && i * 2 + 1 < bytes.length; i++) {
          const charCode = text.charCodeAt(i);
          bytes[i * 2] = charCode & 0xff;
          bytes[i * 2 + 1] = charCode >>> 8;
        }
        this.saveFile.writeBytes(offset, bytes);
        return;
      }
      default:
        throw new Error('Invalid variable type: ' + type);
    }
  }
}

/** 单个变量：按类型读取/写回 */
export class Variable {
  readonly engine: VariableEngine;
  readonly hash: number;
  readonly hashHex: string;
  readonly hashText: string;
  readonly type: string;
  readonly enumValues: readonly string[];
  label: string;
  offset: number;
  value: VariableValue = 0;

  constructor(
    engine: VariableEngine,
    hashSource: string | number,
    type: string,
    enumValues: readonly string[] = [],
    label?: string,
  ) {
    this.engine = engine;
    this.type = type;
    if (typeof hashSource === 'string') {
      this.hash = hashText(hashSource);
      this.hashText = hashSource;
    } else {
      this.hash = hashSource >>> 0;
      this.hashText = toHex32(this.hash);
    }
    this.hashHex = toHex32(this.hash);
    this.label = label ?? this.hashText;
    this.enumValues = enumValues;
    if (this.isEnum()) {
      for (const enumValue of enumValues) hashText(enumValue);
    }
    this.offset = engine.resolveOffset(this.hash, this.isPointer());
    this.read();
  }

  isPointer(): boolean {
    return /Array|Vector|String|UInt64/.test(this.type);
  }

  isVector(): boolean {
    return /Vector/.test(this.type);
  }

  isArray(): boolean {
    return /Array/.test(this.type);
  }

  isEnum(): boolean {
    return /Enum/.test(this.type);
  }

  getTypeSingle(): string {
    return this.type.replace('Array', '');
  }

  read(): void {
    if (!this.isArray()) {
      this.value = this.engine.readRaw(this.type, this.offset);
      return;
    }
    const single = this.getTypeSingle();
    const size = variableSize(single);
    const dataOffset = this.offset + 4;
    const length = this.engine.readRaw('UInt', this.offset) as number;
    const values: VariableValue[] = new Array(length);
    if (this.type === 'BoolArray') {
      for (let i = 0; i < length; i++) values[i] = this.engine.readRaw('BoolArray', dataOffset, i);
    } else {
      let cursor = dataOffset;
      for (let i = 0; i < length; i++) {
        values[i] = this.engine.readRaw(single, cursor);
        cursor += size;
      }
    }
    this.value = values;
  }

  save(): void {
    if (!this.isArray()) {
      this.engine.writeRaw(this.type, this.offset, this.value);
      return;
    }
    const single = this.getTypeSingle();
    const size = variableSize(single);
    const dataOffset = this.offset + 4;
    const length = this.engine.readRaw('UInt', this.offset) as number;
    const values = this.value as VariableValue[];
    if (this.type === 'BoolArray') {
      for (let i = 0; i < length && i < values.length; i++) {
        this.engine.writeRaw('BoolArray', dataOffset, values[i], i);
      }
      return;
    }
    let cursor = dataOffset;
    for (let i = 0; i < length && i < values.length; i++) {
      this.engine.writeRaw(single, cursor, values[i]);
      cursor += size;
    }
  }

  exportValue(): VariableValue {
    return this.value;
  }

  /** 值为中文/英文可读字符串时的显示文本 */
  displayValue(): string {
    if (typeof this.value === 'boolean') return this.value ? '是' : '否';
    if (typeof this.value === 'bigint') return this.value.toString();
    if (typeof this.value === 'object' && this.value !== null && !Array.isArray(this.value)) {
      return Object.values(this.value as Vector2 | Vector3).join(', ');
    }
    if (Array.isArray(this.value)) return `[${this.value.length}]`;
    return String(this.value);
  }
}

/** 结构：一组变量（可嵌套数组结构），对应上游的 Struct */
export class Struct {
  readonly engine: VariableEngine;
  readonly structId: string;
  readonly fields: readonly StructFieldInfo[];
  readonly variables: Array<Struct | Variable>;

  constructor(engine: VariableEngine, structId: string, fields: readonly StructFieldInfo[], isArray = false) {
    this.engine = engine;
    this.structId = structId;
    this.fields = fields;
    this.variables = fields.map((field) => {
      if (isSubStruct(field)) {
        return new Struct(engine, field.structArray, field.variablesInfo, true);
      }
      const variable = new Variable(engine, field.hash, field.type, field.enumValues, field.label ?? field.hash);
      if (isArray && !variable.isArray()) {
        throw new Error(`Struct array variable[${field.hash}] is not an Array`);
      }
      return variable;
    });
  }

  private fieldName(index: number): string {
    const field = this.fields[index];
    if (isSubStruct(field)) return field.structArray;
    return field.propertyName ?? field.hash;
  }

  /** 导出为嵌套对象（结构数组导出为对象数组） */
  export(): StructExport {
    const result: StructExport = { totkStruct: this.structId };
    for (let i = 0; i < this.variables.length; i += 1) {
      const variable = this.variables[i];
      const name = this.fieldName(i);
      if (variable instanceof Struct) {
        const firstValue = (variable.variables[0] as Variable).value;
        const arrayLength = Array.isArray(firstValue) ? firstValue.length : 0;
        const rows: Array<Record<string, unknown>> = [];
        for (let row = 0; row < arrayLength; row += 1) {
          const entry: Record<string, unknown> = {};
          for (let k = 0; k < variable.variables.length; k += 1) {
            const child = variable.variables[k];
            const childName = variable.fieldName(k);
            const field = variable.fields[k];
            if (child instanceof Struct) {
              entry[childName] = child.export();
            } else if (!isSubStruct(field) && typeof field.arrayPartitionSize === 'number') {
              const partition = field.arrayPartitionSize;
              entry[childName] = (child.value as VariableValue[]).slice(row * partition, row * partition + partition);
            } else {
              entry[childName] = (child.value as VariableValue[])[row];
            }
          }
          rows.push(entry);
        }
        result[name] = rows;
      } else {
        result[name] = variable.value;
      }
    }
    return result;
  }

  saveAll(): void {
    for (const variable of this.variables) {
      if (variable instanceof Struct) variable.saveAll();
      else variable.save();
    }
  }
}
