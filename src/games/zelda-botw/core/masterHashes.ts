/**
 * 高级编辑（哈希表编辑器）的数据层。
 *
 * 存档里每条记录都是「哈希 + 值」，游戏内部名字不写在文件里；
 * 这里用外部哈希表（hash;类型;名称）把已知记录翻译成可编辑字段。
 */
import type { SaveFile } from '../../../core/saveFile';

export const HASH_TYPE = {
  BOOL: 1,
  BOOL_ARRAY: 2,
  S32: 3,
  S32_ARRAY: 4,
  F32: 5,
  F32_ARRAY: 6,
  VECTOR2F: 7,
  VECTOR2F_ARRAY: 8,
  VECTOR3F: 9,
  VECTOR3F_ARRAY: 10,
  VECTOR4F: 11,
  VECTOR4F_ARRAY: 12,
  STRING: 13,
  STRING_ARRAY: 14,
  STRING64: 15,
  STRING64_ARRAY: 16,
  STRING256: 17,
  STRING256_ARRAY: 18,
} as const;

export type FieldKind = 'bool' | 's32' | 'f32' | 'string' | 'string64' | 'string256' | 'unknown';

export interface MasterField {
  /** 唯一键：数组元素带 [i] 后缀 */
  key: string;
  /** 哈希表里的名称 */
  id: string;
  type: number;
  /** 值所在的绝对偏移 */
  valueOffset: number;
  kind: FieldKind;
}

export interface HashEntry {
  type: number;
  id: string;
}

/** 解析 hash;类型;名称 形式的哈希表 */
export function parseHashTable(text: string): Map<number, HashEntry> {
  const table = new Map<number, HashEntry>();
  for (const line of text.split('\n')) {
    if (!line) continue;
    const [hashText, typeText, id] = line.split(';');
    const hash = Number(hashText);
    if (!Number.isFinite(hash) || !id) continue;
    table.set(hash, { type: Number(typeText), id });
  }
  return table;
}

const ELEMENT_SIZE: Record<number, number> = {
  [HASH_TYPE.BOOL]: 8,
  [HASH_TYPE.S32]: 8,
  [HASH_TYPE.F32]: 8,
  [HASH_TYPE.VECTOR2F]: 16,
  [HASH_TYPE.VECTOR3F]: 24,
  [HASH_TYPE.VECTOR4F]: 32,
  [HASH_TYPE.STRING]: 0x20,
  [HASH_TYPE.STRING64]: 0x80,
  [HASH_TYPE.STRING256]: 0x200,
};

const FIELD_KIND: Record<number, FieldKind> = {
  [HASH_TYPE.BOOL]: 'bool',
  [HASH_TYPE.S32]: 's32',
  [HASH_TYPE.F32]: 'f32',
  [HASH_TYPE.STRING]: 'string',
  [HASH_TYPE.STRING64]: 'string64',
  [HASH_TYPE.STRING256]: 'string256',
};

const VECTOR_COMPONENTS: Record<number, readonly string[]> = {
  [HASH_TYPE.VECTOR2F]: ['x', 'y'],
  [HASH_TYPE.VECTOR3F]: ['x', 'y', 'z'],
  [HASH_TYPE.VECTOR4F]: ['x', 'y', 'z', 't'],
};

/** 扫描存档里出现、且哈希表认识的记录 */
export function collectHashRecords(
  saveFile: SaveFile,
  table: Map<number, HashEntry>,
): Array<{ id: string; type: number; offset: number }> {
  const records: Array<{ id: string; type: number; offset: number }> = [];
  let previousHash = 0;
  for (let i = 0x0c; i < saveFile.fileSize - 4; i += 8) {
    const hashValue = saveFile.readU32(i);
    if (hashValue === previousHash) continue;
    previousHash = hashValue;
    const entry = table.get(hashValue);
    if (entry) records.push({ id: entry.id, type: entry.type, offset: i });
  }
  records.sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
  return records;
}

function scalarField(id: string, type: number, offset: number): MasterField {
  return { key: id, id, type, valueOffset: offset + 4, kind: FIELD_KIND[type] ?? 'unknown' };
}

function vectorFields(id: string, type: number, offset: number): MasterField[] {
  const components = VECTOR_COMPONENTS[type];
  return components.map((component, index) => ({
    key: `${id}[${component}]`,
    id,
    type,
    valueOffset: offset + 4 + index * 8,
    kind: 'f32' as const,
  }));
}

/**
 * 把扫描到的记录展开成可编辑字段。
 * 数组类型会按连续出现的同一哈希展开成多个字段，与存档里的 8 字节步长一致。
 */
export function expandMasterFields(
  saveFile: SaveFile,
  records: Array<{ id: string; type: number; offset: number }>,
): MasterField[] {
  const fields: MasterField[] = [];

  for (const record of records) {
    const { id, type, offset } = record;

    if (type in VECTOR_COMPONENTS) {
      fields.push(...vectorFields(id, type, offset));
      continue;
    }
    if (type in FIELD_KIND) {
      fields.push(scalarField(id, type, offset));
      continue;
    }
    if (type % 2 === 0) {
      // 数组类型：值类型是 type - 1
      const elementType = type - 1;
      const hash = saveFile.readU32(offset);
      const elementSize = ELEMENT_SIZE[elementType] ?? 8;
      let index = 0;
      while (saveFile.readU32(offset + index * elementSize) === hash) {
        const elementOffset = offset + index * elementSize;
        if (elementType in VECTOR_COMPONENTS) {
          fields.push(
            ...vectorFields(`${id}[${index}]`, elementType, elementOffset).map((field) => ({
              ...field,
              key: `${id}[${index}][${field.key.slice(field.key.lastIndexOf('[') + 1, -1)}]`,
            })),
          );
        } else {
          const field = scalarField(`${id}[${index}]`, elementType, elementOffset);
          if (field.kind !== 'unknown') fields.push(field);
        }
        index++;
      }
      continue;
    }
    fields.push({ key: `${id}（未知）`, id, type, valueOffset: offset + 4, kind: 'unknown' });
  }

  return fields;
}

const STRING_CHUNKS: Record<string, number> = { string: 8, string64: 16, string256: 64 };

export function readMasterString(saveFile: SaveFile, field: MasterField): string {
  const chunks = STRING_CHUNKS[field.kind] ?? 8;
  let text = '';
  let cursor = field.valueOffset;
  for (let i = 0; i < chunks; i++) {
    text += saveFile.readString(cursor, 4);
    cursor += 8;
  }
  return text;
}

export function writeMasterString(saveFile: SaveFile, field: MasterField, value: string): void {
  const chunks = STRING_CHUNKS[field.kind] ?? 8;
  let cursor = field.valueOffset;
  for (let i = 0; i < chunks; i++) {
    saveFile.writeBytes(cursor, [0, 0, 0, 0]);
    const slice = value.slice(i * 4, i * 4 + 4);
    for (let j = 0; j < slice.length; j++) saveFile.writeU8(cursor + j, slice.charCodeAt(j));
    cursor += 8;
  }
}

export function readMasterValue(saveFile: SaveFile, field: MasterField): number | boolean | string {
  switch (field.kind) {
    case 'bool':
      return saveFile.readU32(field.valueOffset) !== 0;
    case 's32':
      return saveFile.readS32(field.valueOffset);
    case 'f32':
      return saveFile.readF32(field.valueOffset);
    case 'string':
    case 'string64':
    case 'string256':
      return readMasterString(saveFile, field);
    default:
      return saveFile.readU32(field.valueOffset);
  }
}

export function writeMasterValue(saveFile: SaveFile, field: MasterField, value: number | boolean | string): void {
  switch (field.kind) {
    case 'bool':
      saveFile.writeU32(field.valueOffset, value ? 1 : 0);
      break;
    case 's32':
      saveFile.writeS32(field.valueOffset, Number(value) | 0);
      break;
    case 'f32':
      saveFile.writeF32(field.valueOffset, Number(value));
      break;
    case 'string':
    case 'string64':
    case 'string256':
      writeMasterString(saveFile, field, String(value));
      break;
    default:
      saveFile.writeU32(field.valueOffset, Number(value) >>> 0);
      break;
  }
}

/** 高级编辑顶部预设筛选 */
export const MASTER_FILTERS: ReadonlyArray<{ label: string; pattern: string }> = [
  { label: '- 所有 -', pattern: '' },
  { label: 'Amiibo', pattern: 'WolfLink_|Amiibo' },
  { label: '显示标志名称', pattern: '_DispNameFlag$' },
  { label: 'DLC1', pattern: '100enemy' },
  { label: 'DLC2', pattern: 'Motorcycle' },
  { label: '马匹', pattern: 'Horse_' },
  { label: '击败敌人', pattern: 'Defeat_Enemy_|Defeated.+Num' },
  { label: '物品', pattern: 'Porch|Cook' },
  { label: '获取标志', pattern: 'IsGet_' },
  { label: '克洛洛', pattern: 'HiddenKorok|OldKorok_' },
  { label: '访问过的地点', pattern: '^Location_' },
  { label: '图鉴', pattern: 'AlbumPicture|PictureBook' },
];

export const HASHES_PER_PAGE = 100;
