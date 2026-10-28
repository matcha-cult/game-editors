/**
 * 《塞尔达传说：王国之泪》progress.sav 的读写逻辑。
 *
 * 存档结构：偏移 0/4/8 分别是固定魔数、版本头、元数据起点；0x28 起是哈希表，
 * 每 8 字节一条 (哈希, 值或指针)，直到 MetaData.SaveTypeHash 结束。
 * 物品栏是若干“结构数组”，每个元素是一组变量（id、数量、耐久、词缀……）。
 */
import { SaveFile } from '../../../core/saveFile';
import { ARMOR_INFO, ARMOR_AVAILABILITY, DYE_COLORS, FOOD_EFFECTS, KEY_COUNTABLE, MAXIMUM_QUANTITY } from '../data/itemMeta';
import { POUCH_CATEGORIES, type PouchCategoryDef, type PouchCategoryId } from '../data/pouch';
import { GAME_VERSIONS, type GameVersion } from '../data/versions';
import { ZH } from '../data/locale-zh';
import { hashReverse, hashText, toHex32 } from './murmur3';
import { Struct, Variable, VariableEngine, type StructFieldInfo, type VariableValue } from './variables';

const MAGIC = 0x01020304;
const MIN_FILE_SIZE = 2307552;
const MAX_FILE_SIZE = 4194304;

/**
 * 固定字段。多数按名称哈希定位；个别字段在存档里的哈希与名称对不上，
 * 只能用字面量哈希（游戏时间的键名至今未知，值是秒数）。
 */
const STAT_FIELDS = {
  maxLife: { hash: 'PlayerStatus.MaxLife', type: 'UInt' },
  rupees: { hash: 'PlayerStatus.CurrentRupee', type: 'UInt' },
  maxStamina: { hash: 'PlayerStatus.MaxStamina', type: 'UInt' },
  maxEnergy: { hash: 'PlayerStatus.MaxEnergy', type: 'Float' },
  ponyPoints: { hash: 'HorseInnMemberPoint', type: 'Int' },
  playtime: { literalHash: 0xe573f564, type: 'UInt' },
  savePosition: { hash: 'PlayerStatus.SavePos', type: 'Vector3' },
  pouchSwords: { hash: 'Pouch.Weapon.ValidNum', type: 'UIntArray' },
  pouchBows: { hash: 'Pouch.Bow.ValidNum', type: 'UIntArray' },
  pouchShields: { hash: 'Pouch.Shield.ValidNum', type: 'UIntArray' },
} as const;

/** 识别存档时至少要能定位到的字段（改版存档可能缺个别字段） */
const REQUIRED_STAT_KEYS = ['maxLife', 'rupees', 'maxStamina', 'savePosition'] as const;

function statHash(field: { hash?: string; literalHash?: number }): number {
  return typeof field.hash === 'string' ? hashText(field.hash) : (field.literalHash as number);
}

export interface TotkVersionInfo {
  version: string;
  gameMod: boolean;
  fileSize: number;
  header: number;
  metaDataStart: number;
}

export interface TotkItemRow {
  /** 在结构数组中的下标 */
  index: number;
  id: string;
  label: string;
  values: Record<string, VariableValue>;
}

export interface TotkHorseRow extends TotkItemRow {
  name: string;
}

export interface TotkSnapshot {
  version: string;
  gameMod: boolean;
  playtime: string;
  rupees: number;
  maxLife: number;
  maxStamina: number;
  maxEnergy: number;
  ponyPoints: number;
  pouchSizes: { swords: number; bows: number; shields: number };
  position: { x: number; y: number; z: number };
  pouches: Record<PouchCategoryId, TotkItemRow[]>;
  horses: TotkHorseRow[];
}

export interface MasterEntry {
  hash: number;
  hashHex: string;
  name: string | null;
  type: string | null;
  valueOffset: number;
  u32: number;
  f32: number;
}

function formatPlaytime(totalSeconds: number): string {
  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const hours = Math.floor(totalSeconds / 3600);
  return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export function totkLabel(itemId: string): string {
  return ZH[itemId] ?? itemId;
}

export function totkMaxQuantity(itemId: string): number {
  return MAXIMUM_QUANTITY[itemId] ?? 999;
}

export function isKeyCountable(itemId: string): boolean {
  return KEY_COUNTABLE.includes(itemId);
}

/** 某个分类下可编辑的字段（用于表格列生成） */
export function editableFields(def: PouchCategoryDef): readonly string[] {
  const properties = def.variables.map((variable) => variable.propertyName).filter((name): name is string => !!name);
  if (def.id === 'horses') {
    return properties.filter((name) => ['name', 'manes', 'saddles', 'reins', 'bond', 'statsStrength', 'statsSpeed', 'statsStamina', 'statsPull'].includes(name) || name === 'name');
  }
  if (def.id === 'weapons' || def.id === 'shields') {
    return properties.filter((name) => ['durability', 'modifier', 'modifierValue', 'fuseId', 'extraDurability'].includes(name));
  }
  if (def.id === 'bows') return properties.filter((name) => ['durability', 'modifier', 'modifierValue'].includes(name));
  if (def.id === 'armors') return ['dyeColor'];
  if (def.id === 'food') {
    return ['quantity', 'heartsHeal', 'effect', 'effectMultiplier', 'effectTime', 'price'];
  }
  return ['quantity'];
}

/** 分类物品结构对应的默认值（新增物品时使用，与既有编辑器一致） */
function defaultValuesFor(category: PouchCategoryId): Record<string, VariableValue> {
  const none = hashText('None');
  switch (category) {
    case 'weapons':
      return {
        durability: 70,
        modifier: none,
        modifierValue: 0,
        fuseId: '',
        fuseDurability: 0,
        extraDurability: 0,
        recordExtraDurability: 0,
      };
    case 'shields':
      return { durability: 70, modifier: none, modifierValue: 0, fuseId: '', fuseDurability: 0, extraDurability: 0 };
    case 'bows':
      return { durability: 70, modifier: none, modifierValue: 0 };
    case 'armors':
      return { dyeColor: none };
    case 'materials':
      return { quantity: 1, getOrder: 0, useOrder: 0 };
    case 'devices':
      return { quantity: 1, useOrder: 0 };
    case 'food':
      return {
        quantity: 1,
        heartsHeal: 4,
        effect: none,
        effectMultiplier: 0,
        effectTime: 0,
        price: 1,
        recipe: ['', '', '', '', ''],
      };
    default:
      return { quantity: 1 };
  }
}

/** 单个物品分类的读写状态 */
class PouchState {
  readonly def: PouchCategoryDef;
  private readonly struct: Struct;
  private readonly itemStruct: Struct;
  private readonly variableByProperty = new Map<string, Variable>();

  constructor(engine: VariableEngine, def: PouchCategoryDef) {
    this.def = def;
    const fields: StructFieldInfo[] = [{ structArray: def.itemStructId, variablesInfo: def.variables }];
    this.struct = new Struct(engine, def.structId, fields);
    this.itemStruct = this.struct.variables[0] as Struct;
    for (const variable of this.itemStruct.variables) {
      if (variable instanceof Variable) {
        const info = def.variables.find((candidate) => hashText(candidate.hash) === variable.hash);
        if (info?.propertyName) this.variableByProperty.set(info.propertyName, variable);
      }
    }
  }

  get maxSize(): number {
    const idVariable = this.variableByProperty.get('id');
    return idVariable ? (idVariable.value as VariableValue[]).length : 0;
  }

  readRows(): TotkItemRow[] {
    const rows: TotkItemRow[] = [];
    const idVariable = this.variableByProperty.get('id');
    if (!idVariable) return rows;
    const ids = idVariable.value as VariableValue[];
    for (let index = 0; index < ids.length; index += 1) {
      const id = String(ids[index] ?? '');
      if (!id) break;
      const values: Record<string, VariableValue> = {};
      for (const [property, variable] of this.variableByProperty) {
        const raw = variable.value as VariableValue[];
        const value = raw[index];
        values[property] = value;
      }
      rows.push({ index, id, label: totkLabel(id), values });
    }
    return rows;
  }

  setField(index: number, property: string, value: VariableValue): void {
    const variable = this.variableByProperty.get(property);
    if (!variable) throw new Error(`字段 ${property} 不存在于分类 ${this.def.id}`);
    const array = variable.value as VariableValue[];
    array[index] = value;
    variable.save();
  }

  /** 在第一个空槽位写入物品，返回下标；已满返回 null */
  add(itemId: string): number | null {
    const idVariable = this.variableByProperty.get('id');
    if (!idVariable) return null;
    const ids = idVariable.value as VariableValue[];
    let index = 0;
    while (index < ids.length && String(ids[index] ?? '') !== '') index += 1;
    if (index >= ids.length) return null;

    const defaults = defaultValuesFor(this.def.id);
    for (const [property, variable] of this.variableByProperty) {
      const array = variable.value as VariableValue[];
      if (property === 'id') array[index] = itemId;
      else if (property === 'recipe') array[index] = ['', '', '', '', ''];
      else if (property in defaults) array[index] = defaults[property];
      else if (this.def.id === 'horses' && property === 'horseType') array[index] = 0;
      else array[index] = array[index] ?? 0;
    }
    // 写入默认值后再写 id，避免默认值覆盖顺序问题
    (idVariable.value as VariableValue[])[index] = itemId;
    this.struct.saveAll();
    return index;
  }

  remove(index: number): boolean {
    const idVariable = this.variableByProperty.get('id');
    if (!idVariable) return false;
    const ids = idVariable.value as VariableValue[];
    if (ids.length < 2) return false;
    for (const variable of this.variableByProperty.values()) {
      const array = variable.value as VariableValue[];
      array.splice(index, 1);
      array.push(variable.isArray() ? (typeof array[0] === 'object' ? [...(array[0] as VariableValue[])] : '') : '');
    }
    // 清空最后一位的 id，保证空槽位能被识别
    (idVariable.value as VariableValue[])[ids.length - 1] = '';
    this.struct.saveAll();
    return true;
  }
}

export class TotkSave {
  readonly saveFile: SaveFile;
  readonly version: TotkVersionInfo;
  readonly engine: VariableEngine;
  private readonly stats: Record<keyof typeof STAT_FIELDS, Variable>;
  private readonly pouches = new Map<PouchCategoryId, PouchState>();

  private constructor(saveFile: SaveFile, version: TotkVersionInfo) {
    this.saveFile = saveFile;
    this.version = version;
    this.engine = new VariableEngine(saveFile);
    this.stats = Object.fromEntries(
      Object.entries(STAT_FIELDS).map(([key, field]) => [key, new Variable(this.engine, statHash(field), field.type)]),
    ) as Record<keyof typeof STAT_FIELDS, Variable>;
  }

  /** 识别版本：魔数 + 文件大小区间 + 全部固定哈希都能找到 */
  static detect(saveFile: SaveFile): TotkVersionInfo | null {
    saveFile.littleEndian = true;
    if (saveFile.readU32(0) !== MAGIC) return null;
    if (saveFile.fileSize < MIN_FILE_SIZE || saveFile.fileSize >= MAX_FILE_SIZE) return null;
    const engine = new VariableEngine(saveFile);
    if (!engine.hashTableEnd) return null;
    try {
      for (const key of REQUIRED_STAT_KEYS) engine.getHashOffset(statHash(STAT_FIELDS[key]));
    } catch {
      return null;
    }
    const header = saveFile.readU32(4);
    const metaDataStart = saveFile.readU32(8);
    const known: GameVersion | undefined = GAME_VERSIONS.find(
      (candidate) => candidate.fileSize === saveFile.fileSize && candidate.header === header && candidate.metaDataStart === metaDataStart,
    );
    return {
      version: known?.version ?? '改版存档',
      gameMod: !known,
      fileSize: saveFile.fileSize,
      header,
      metaDataStart,
    };
  }

  static async load(file: File): Promise<TotkSave> {
    const saveFile = await SaveFile.fromFile(file);
    const version = TotkSave.detect(saveFile);
    if (!version) throw new InvalidTotkSaveError();
    return new TotkSave(saveFile, version);
  }

  private pouch(category: PouchCategoryId): PouchState {
    let state = this.pouches.get(category);
    if (!state) {
      const def = POUCH_CATEGORIES.find((candidate) => candidate.id === category);
      if (!def) throw new Error('未知物品分类: ' + category);
      state = new PouchState(this.engine, def);
      this.pouches.set(category, state);
    }
    return state;
  }

  private statValue(key: keyof typeof STAT_FIELDS): number {
    return Number(this.stats[key].value);
  }

  private setStat(key: keyof typeof STAT_FIELDS, value: VariableValue): void {
    this.stats[key].value = value;
    this.stats[key].save();
  }

  readSnapshot(): TotkSnapshot {
    const pouches = Object.fromEntries(
      POUCH_CATEGORIES.filter((def) => def.id !== 'horses').map((def) => [def.id, this.pouch(def.id).readRows()]),
    ) as Record<Exclude<PouchCategoryId, 'horses'>, TotkItemRow[]>;

    const horseRows = this.pouch('horses').readRows();

    return {
      version: this.version.version,
      gameMod: this.version.gameMod,
      playtime: formatPlaytime(this.statValue('playtime')),
      rupees: this.statValue('rupees'),
      maxLife: this.statValue('maxLife'),
      maxStamina: this.statValue('maxStamina'),
      maxEnergy: this.statValue('maxEnergy'),
      ponyPoints: this.statValue('ponyPoints'),
      pouchSizes: {
        swords: Number((this.stats.pouchSwords.value as VariableValue[])[0] ?? 0),
        bows: Number((this.stats.pouchBows.value as VariableValue[])[0] ?? 0),
        shields: Number((this.stats.pouchShields.value as VariableValue[])[0] ?? 0),
      },
      position: this.stats.savePosition.value as { x: number; y: number; z: number },
      pouches: pouches as Record<PouchCategoryId, TotkItemRow[]>,
      horses: horseRows.map((row) => ({ ...row, name: String(row.values.name ?? '') })),
    };
  }

  // ---- 状态字段 ----

  setRupees(value: number): void {
    this.setStat('rupees', value);
  }

  setMaxLife(value: number): void {
    this.setStat('maxLife', value);
  }

  setMaxStamina(value: number): void {
    this.setStat('maxStamina', value);
  }

  setMaxEnergy(value: number): void {
    this.setStat('maxEnergy', value);
  }

  /** 游戏时间只读（值为秒；键名未知，用字面量哈希定位） */
  getPlaytimeSeconds(): number {
    return Math.trunc(this.statValue('playtime'));
  }

  setPonyPoints(value: number): void {
    this.setStat('ponyPoints', value);
  }

  setPouchSize(kind: 'swords' | 'bows' | 'shields', value: number): void {
    const key = kind === 'swords' ? 'pouchSwords' : kind === 'bows' ? 'pouchBows' : 'pouchShields';
    const variable = this.stats[key];
    const array = variable.value as VariableValue[];
    array[0] = value;
    variable.save();
  }

  setPosition(axis: 'x' | 'y' | 'z', value: number): void {
    const variable = this.stats.savePosition;
    const vector = { ...(variable.value as { x: number; y: number; z: number }), [axis]: value };
    variable.value = vector;
    variable.save();
  }

  // ---- 物品 ----

  setItemField(category: PouchCategoryId, index: number, property: string, value: VariableValue): void {
    this.pouch(category).setField(index, property, value);
  }

  /** 改物品 ID；分类不变 */
  setItemId(category: PouchCategoryId, index: number, itemId: string): void {
    this.pouch(category).setField(index, 'id', itemId);
  }

  addItem(category: PouchCategoryId, itemId: string): boolean {
    if (category === 'horses') return false;
    return this.pouch(category).add(itemId) !== null;
  }

  removeItem(category: PouchCategoryId, index: number): boolean {
    return this.pouch(category).remove(index);
  }

  /** 分类可选物品（中文名 + ID） */
  static availableItems(category: PouchCategoryId): ReadonlyArray<{ id: string; label: string }> {
    const def = POUCH_CATEGORIES.find((candidate) => candidate.id === category);
    const ids = def?.availability ?? [];
    const unique: string[] = [];
    for (const id of ids) {
      if (id && !unique.includes(id)) unique.push(id);
    }
    return unique.map((id) => ({ id, label: totkLabel(id) }));
  }

  /** 防具基础 ID（用于图标） */
  static armorBaseId(armorId: string): string {
    return ARMOR_INFO[armorId]?.base ?? armorId;
  }

  static armorCanUpgrade(armorId: string): string | undefined {
    const upgradeable = ARMOR_INFO[armorId]?.upgradeable;
    return typeof upgradeable === 'string' ? upgradeable : undefined;
  }

  static dyeName(value: number): string {
    const entry = DYE_COLORS.find((color) => color.value === (value >>> 0));
    return entry ? entry.name : toHex32(value);
  }

  static dyeValue(name: string): number {
    return hashText(name);
  }

  static foodEffectLabel(value: number): string {
    const effect = FOOD_EFFECTS.find((entry) => entry.value === (value >>> 0));
    return effect ? effect.name : toHex32(value);
  }

  /** 物品图标路径（public 下的相对路径） */
  static itemIconPath(category: PouchCategoryId, item: TotkItemRow): string {
    const base = 'assets/totk/item_icons/';
    const id = String(item.id);
    if (category === 'armors') {
      const baseId = TotkSave.armorBaseId(id);
      const dye = item.values.dyeColor;
      if (typeof dye === 'number' && dye !== hashText('None')) {
        return `${base}armors/dye/${baseId}_${hashReverse(dye) ?? toHex32(dye)}.png`;
      }
      return `${base}armors/${baseId}.png`;
    }
    if (category === 'food') {
      return `${base}food/${id}.png`;
    }
    return `${base}${category}/${id}.png`;
  }

  static armorAvailability(): readonly string[] {
    return ARMOR_AVAILABILITY;
  }

  // ---- 高级编辑 ----

  /** 列出哈希表里的全部条目（含未知哈希），供高级编辑器使用 */
  listMasterEntries(hashNames?: Map<number, { name: string; type: string }>): MasterEntry[] {
    const entries: MasterEntry[] = [];
    for (let i = 0x28; i < this.engine.hashTableEnd; i += 8) {
      const hash = this.saveFile.readU32(i);
      if (hash === 0) continue;
      const valueOffset = i + 4;
      const value = this.saveFile.readU32(valueOffset);
      const known = hashNames?.get(hash);
      entries.push({
        hash,
        hashHex: toHex32(hash),
        name: known?.name ?? hashReverse(hash) ?? null,
        type: known?.type ?? null,
        valueOffset,
        u32: value,
        f32: this.saveFile.readF32(valueOffset),
      });
    }
    return entries.sort((a, b) => (a.name ?? a.hashHex).localeCompare(b.name ?? b.hashHex));
  }

  setMasterValue(entry: MasterEntry, value: number): void {
    this.saveFile.writeU32(entry.valueOffset, value >>> 0);
  }

  setMasterFloat(entry: MasterEntry, value: number): void {
    this.saveFile.writeF32(entry.valueOffset, value);
  }

  toBlob(): Blob {
    return this.saveFile.toBlob();
  }
}

export class InvalidTotkSaveError extends Error {
  constructor() {
    super('无效的王国之泪存档（需要 progress.sav）');
    this.name = 'InvalidTotkSaveError';
  }
}

/** 解析 hashes.csv：`哈希;类型;名称` 行 */
export function parseTotkHashNames(text: string): Map<number, { name: string; type: string }> {
  const map = new Map<number, { name: string; type: string }>();
  for (const line of text.split('\n')) {
    if (!line || line.startsWith('#')) continue;
    const parts = line.split(';');
    if (parts.length !== 3) continue;
    if (!/^[0-9a-fA-F]{8}$/.test(parts[0])) continue;
    map.set(parseInt(parts[0], 16) >>> 0, { type: parts[1], name: parts[2] });
  }
  return map;
}

export const TOTK_HEART_OPTIONS = Array.from({ length: 40 }, (_, index) => ({
  value: (index + 1) * 4,
  label: `${index + 1} 颗心`,
}));

export const TOTK_STAMINA_OPTIONS = [
  { value: 1148846080, label: '1 圈' },
  { value: 1150681088, label: '1 圈+1/5' },
  { value: 1152319488, label: '1 圈+2/5' },
  { value: 1153957888, label: '1 圈+3/5' },
  { value: 1155596288, label: '1 圈+4/5' },
  { value: 1157234688, label: '2 圈' },
  { value: 1158250496, label: '2 圈+1/5' },
  { value: 1159069696, label: '2 圈+2/5' },
  { value: 1159888896, label: '2 圈+3/5' },
  { value: 1160708096, label: '2 圈+4/5' },
  { value: 1161527296, label: '3 圈' },
  { value: 1342177279, label: '无限' },
];

export const TOTK_ENERGY_OPTIONS = Array.from({ length: 46 }, (_, index) => {
  const value = 3000 + index * 1000;
  return { value, label: String(value) };
});

export const TOTK_MODIFIER_OPTIONS: Record<string, readonly string[]> = {
  weapons: ['None', 'AttackUp', 'AttackUpPlus', 'DurabilityUp', 'DurabilityUpPlus', 'FinishBlow', 'LongThrow'],
  bows: ['None', 'AttackUp', 'AttackUpPlus', 'DurabilityUp', 'DurabilityUpPlus', 'RapidFire', 'FiveWay'],
  shields: ['None', 'DurabilityUp', 'DurabilityUpPlus', 'GuardUp', 'GuardUpPlus'],
};

export const TOTK_DYE_COLORS = DYE_COLORS;
