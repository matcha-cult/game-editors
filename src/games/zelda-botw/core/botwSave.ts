/**
 * 《旷野之息》存档的读写逻辑。
 *
 * 存档结构：从偏移 0x0c 开始，每 8 字节一条记录（u32 哈希 + u32 值），
 * 字段位置不固定，需要按哈希表顺序扫描定位（同类哈希会连续重复多次，形成“数组”）。
 * 本模块只做二进制读写，UI 通过快照（BotwSnapshot）渲染。
 */
import { COORDS } from '../data/coords';
import {
  DYE_COLORS,
  DEFEATED_HINOX,
  DEFEATED_MOLDUGA,
  DEFEATED_TALUS,
  HORSE_REINS,
  HORSE_SADDLES,
  HORSE_TYPES,
  HORSE_TYPES_UNTAMMED,
  KOROKS,
  LOCATIONS,
  MODIFIERS,
  PICTURE_BOOK_SIZE,
  TRANSLATIONS,
} from '../data/botw-data';
import {
  FILESIZE,
  HASHES,
  HEADER,
  ICON_TYPES,
  MAX_ITEMS,
  MAX_MAP_PINS,
  STRING64_SIZE,
  VERSION,
  type HashName,
} from './constants';
import { SaveFile } from '../../../core/saveFile';
import { calculateScaleScore } from './score';

export type ItemCategory = 'weapons' | 'bows' | 'shields' | 'clothes' | 'materials' | 'food' | 'other';
export type ConsoleType = 'Wii U' | 'Switch';
export type Vec3 = { x: number; y: number; z: number };

export interface DetectedVersion {
  versionLabel: string;
  consoleType: ConsoleType;
  modified: boolean;
  versionIndex: number;
}

export interface ItemRow {
  /** 存档中的槽位 0..419 */
  index: number;
  itemId: string;
  /** 中文名，未收录时回退为内部 ID */
  label: string;
  category: ItemCategory;
  /** 数量；防具时是染色索引 */
  quantity: number;
  maxQuantity: number;
  /** 武器/弓/盾在同类中的序号，用于定位词缀 */
  modifierSlot: number | null;
  modifier: number | null;
  modifierValue: number | null;
}

export interface HorseRow {
  index: number;
  type: string;
  name: string;
  saddle: string;
  reins: string;
}

export interface BotwSnapshot {
  version: string;
  consoleType: ConsoleType;
  modified: boolean;
  rupees: number;
  mons: number;
  maxHearts: number;
  maxStamina: number;
  relicGerudo: number;
  relicGoron: number;
  relicRito: number;
  koroks: number;
  defeatedHinox: number;
  defeatedTalus: number;
  defeatedMolduga: number;
  /** 秒 */
  playtimeSeconds: number;
  playtime: string;
  hasMotorcycle: boolean;
  motorcycle: boolean;
  position: Vec3;
  mapType: string;
  map: string;
  horsePosition: Vec3;
  items: ItemRow[];
  horses: HorseRow[];
  mapPinCount: number;
  score: number;
}

export interface ItemOption {
  id: string;
  label: string;
  category: ItemCategory;
}

export const HEART_OPTIONS = Array.from({ length: 30 }, (_, i) => ({
  value: (i + 1) * 4,
  label: `${i + 1} 颗心心`,
}));

export const STAMINA_OPTIONS = [
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
];

/** 地图区域选项：MainField 网格 + 神兽迷宫 + 其他区域 */
export const MAP_OPTIONS: readonly string[] = (() => {
  const maps: string[] = [];
  for (let i = 0; i < 10; i++) {
    for (let j = 1; j <= 8; j++) maps.push(`${String.fromCharCode(65 + i)}-${j}`);
  }
  for (let i = 0; i < 120; i++) maps.push(`Dungeon${String(i).padStart(3, '0')}`);
  maps.push('RemainsElectric', 'RemainsFire', 'RemainsWater', 'RemainsWind');
  return maps;
})();

export const MAP_TYPE_OPTIONS = ['MainField', 'MainFieldDungeon'] as const;

/** 影响坐标的神兽迷宫 */
const DUNGEON_COORDINATES: Record<string, Vec3> = {
  RemainsFire: { x: 0, y: 16.8, z: 69.5 },
  RemainsWater: { x: 47.7, y: 6.05, z: 6.3 },
  RemainsWind: { x: 0, y: 3.4, z: -77.7 },
  RemainsElectric: { x: 0, y: 71.9, z: 3.7 },
  FinalTrial: { x: 0, y: -0.4, z: 64.5 },
};

const ITEM_TRANSLATIONS = new Map<string, string>();
const ITEM_CATEGORIES = new Map<string, ItemCategory>();
for (const group of TRANSLATIONS) {
  for (const [id, name] of Object.entries(group.items)) {
    ITEM_TRANSLATIONS.set(id, name);
    ITEM_CATEGORIES.set(id, group.id as ItemCategory);
  }
}

/** 可添加物品清单（按分类，保持原有顺序） */
export const ITEM_OPTIONS: readonly ItemOption[] = TRANSLATIONS.flatMap((group) =>
  Object.entries(group.items).map(([id, label]) => ({ id, label, category: group.id as ItemCategory })),
);

export function getItemLabel(itemId: string): string {
  return ITEM_TRANSLATIONS.get(itemId) ?? itemId;
}

export function getItemCategory(itemId: string): ItemCategory {
  return ITEM_CATEGORIES.get(itemId) ?? 'other';
}

export function getDyeLabel(value: number): string {
  const entry = DYE_COLORS[value];
  if (entry !== undefined) return typeof entry === 'string' ? entry : entry.name;
  const objectEntry = DYE_COLORS.find(
    (candidate): candidate is { readonly value: number; readonly name: string } =>
      typeof candidate !== 'string' && candidate.value === value,
  );
  return objectEntry ? objectEntry.name : `0x${(value >>> 0).toString(16)}`;
}

export function getModifierLabel(value: number): string {
  return MODIFIERS.find((m) => m.value === value)?.name ?? `0x${(value >>> 0).toString(16).padStart(8, '0')}`;
}

/** 可选的词缀（含存档里出现的未知值） */
export function buildModifierOptions(current: number) {
  const options = MODIFIERS.map((m) => ({ value: m.value, label: m.name }));
  if (!options.some((o) => o.value === current)) {
    options.push({ value: current, label: `0x${(current >>> 0).toString(16).padStart(8, '0')}` });
  }
  return options;
}

export function formatPlaytime(totalSeconds: number): string {
  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  return `${Math.floor(totalSeconds / 3600)}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

/** 由坐标推算地图网格编号，如 "A-1" */
export function guessMainFieldGrid(x: number, z: number): string {
  const gridX = Math.min(10, Math.max(1, Math.trunc(((x + 4974.629) / 9949.258) * 10 + 1)));
  const gridZ = Math.min(8, Math.max(1, Math.trunc(((z + 3974.629) / 7949.258) * 8 + 1)));
  return `${String.fromCharCode(64 + gridX)}-${gridZ}`;
}

export function dungeonCoordinatesFor(map: string): Vec3 | undefined {
  return DUNGEON_COORDINATES[map];
}

const TRANSLATION_OTHER = 'other';

export class BotwSave {
  readonly saveFile: SaveFile;
  readonly version: DetectedVersion;
  private offsets: Partial<Record<HashName, number>> = {};
  private headers: Partial<Record<HashName, number>> = {};

  constructor(saveFile: SaveFile, version: DetectedVersion) {
    this.saveFile = saveFile;
    this.version = version;
    this.saveFile.littleEndian = version.consoleType === 'Switch';
    this.computeOffsets();
  }

  /**
   * 识别存档版本。
   * 先按 Wii U（大端）再按 Switch（小端）尝试：文件大小 + 版本头 + 偏移 4 的 0xffffffff 三者都要对上。
   */
  static detect(saveFile: SaveFile): DetectedVersion | null {
    for (const consoleType of ['Wii U', 'Switch'] as ConsoleType[]) {
      const switchMode = consoleType === 'Switch';
      saveFile.littleEndian = switchMode;
      for (let i = 0; i < FILESIZE.length; i++) {
        const versionHash = saveFile.readU32(0);
        const validHeader = versionHash === HEADER[i] && saveFile.readU32(4) === 0xffffffff;
        if (!validHeader) continue;
        if (saveFile.fileSize === FILESIZE[i]) {
          return { versionLabel: VERSION[i], consoleType, modified: false, versionIndex: i };
        }
        // 打 mod 的存档会改文件大小，放宽到 0xdb...0x16e3 区间
        if (saveFile.fileSize >= 896976 && saveFile.fileSize <= 1500000) {
          return { versionLabel: VERSION[i], consoleType, modified: true, versionIndex: i };
        }
      }
    }
    return null;
  }

  static async load(file: File): Promise<BotwSave> {
    const saveFile = await SaveFile.fromFile(file);
    const version = BotwSave.detect(saveFile);
    if (!version) throw new InvalidSaveFileError();
    return new BotwSave(saveFile, version);
  }

  // ---- 偏移扫描 ----

  private computeOffsets(): void {
    let startSearchOffset = 0x0c;
    for (const [hash, name] of HASHES) {
      for (let j = startSearchOffset; j < this.saveFile.fileSize; j += 8) {
        if (this.saveFile.readU32(j) === hash) {
          this.offsets[name] = j + 4;
          this.headers[name] = hash;
          startSearchOffset = j + 8;
          break;
        }
      }
    }
  }

  private offsetOf(name: HashName): number | undefined {
    return this.offsets[name];
  }

  private readAt(name: HashName): number {
    const offset = this.offsetOf(name);
    return offset === undefined ? 0 : this.saveFile.readU32(offset);
  }

  private writeAt(name: HashName, value: number): void {
    const offset = this.offsetOf(name);
    if (offset !== undefined) this.saveFile.writeU32(offset, value);
  }

  searchHash(hash: number): number | null {
    for (let i = 0x0c; i < this.saveFile.fileSize; i += 8) {
      if (this.saveFile.readU32(i) === hash) return i;
    }
    return null;
  }

  // ---- 字符串（每 8 字节存 4 个 ASCII 字符） ----

  private readStrideString(offset: number, chunks: number): string {
    let text = '';
    let cursor = offset;
    for (let i = 0; i < chunks; i++) {
      text += this.saveFile.readString(cursor, 4);
      cursor += 8;
    }
    return text;
  }

  private writeStrideString(offset: number, value: string, chunks: number): void {
    let cursor = offset;
    for (let i = 0; i < chunks; i++) {
      this.saveFile.writeBytes(cursor, [0, 0, 0, 0]);
      const slice = value.slice(i * 4, i * 4 + 4);
      for (let j = 0; j < slice.length; j++) this.saveFile.writeU8(cursor + j, slice.charCodeAt(j));
      cursor += 8;
    }
  }

  private readString64(offset: number, index = 0): string {
    return this.readStrideString(offset + STRING64_SIZE * index, 16);
  }

  private writeString64(offset: number, value: string, index = 0): void {
    this.writeStrideString(offset + STRING64_SIZE * index, value, 16);
  }

  // ---- 物品 ----

  readItemName(index: number): string {
    const base = this.offsetOf('ITEMS');
    return base === undefined ? '' : this.readString64(base, index);
  }

  private writeItemName(index: number, itemId: string): void {
    const base = this.offsetOf('ITEMS');
    if (base !== undefined) this.writeString64(base, itemId, index);
  }

  private itemQuantityOffset(index: number): number {
    return (this.offsetOf('ITEMS_QUANTITY') ?? 0) + index * 8;
  }

  static maxQuantityFor(itemId: string): number {
    const category = getItemCategory(itemId);
    if (itemId.endsWith('Arrow') || itemId.endsWith('Arrow_A') || category === 'materials' || category === 'food') {
      return 999;
    }
    if (category === 'weapons' || category === 'bows' || category === 'shields') return 6553500;
    if (itemId === 'Obj_DungeonClearSeal') return 120;
    if (itemId === 'Obj_KorokNuts') return 900;
    return 0xffffffff;
  }

  private static modifierHashFor(category: ItemCategory, values: boolean): HashName | null {
    if (category === 'weapons') return values ? 'FLAGSV_WEAPON' : 'FLAGS_WEAPON';
    if (category === 'bows') return values ? 'FLAGSV_BOW' : 'FLAGS_BOW';
    if (category === 'shields') return values ? 'FLAGSV_SHIELD' : 'FLAGS_SHIELD';
    return null;
  }

  private readModifier(category: ItemCategory, slot: number): { modifier: number; value: number } | null {
    const flagHash = BotwSave.modifierHashFor(category, false);
    const valueHash = BotwSave.modifierHashFor(category, true);
    if (!flagHash || !valueHash) return null;
    const flagOffset = this.offsetOf(flagHash);
    const valueOffset = this.offsetOf(valueHash);
    if (flagOffset === undefined || valueOffset === undefined) return null;
    return {
      modifier: this.saveFile.readU32(flagOffset + slot * 8),
      value: this.saveFile.readU32(valueOffset + slot * 8),
    };
  }

  setItemModifier(category: ItemCategory, slot: number, modifier: number, value: number): void {
    const flagHash = BotwSave.modifierHashFor(category, false);
    const valueHash = BotwSave.modifierHashFor(category, true);
    if (!flagHash || !valueHash) return;
    const flagOffset = this.offsetOf(flagHash);
    const valueOffset = this.offsetOf(valueHash);
    if (flagOffset === undefined || valueOffset === undefined) return;
    this.saveFile.writeU32(flagOffset + slot * 8, modifier);
    this.saveFile.writeU32(valueOffset + slot * 8, value);
  }

  private readItems(): ItemRow[] {
    const items: ItemRow[] = [];
    const slots: Record<string, number> = { weapons: 0, bows: 0, shields: 0 };
    for (let i = 0; i < MAX_ITEMS; i++) {
      const itemId = this.readItemName(i);
      if (itemId === '') break;
      const category = getItemCategory(itemId);
      const rawValue = this.saveFile.readU32(this.itemQuantityOffset(i));
      const modifierSlot = category in slots ? slots[category]++ : null;
      const modifierInfo = modifierSlot === null ? null : this.readModifier(category, modifierSlot);
      items.push({
        index: i,
        itemId,
        label: getItemLabel(itemId),
        category,
        quantity: rawValue,
        maxQuantity: BotwSave.maxQuantityFor(itemId),
        modifierSlot,
        modifier: modifierInfo?.modifier ?? null,
        modifierValue: modifierInfo?.value ?? null,
      });
    }
    return items;
  }

  setItemQuantity(index: number, value: number): void {
    this.saveFile.writeU32(this.itemQuantityOffset(index), value);
  }

  /** 改物品：写入名称并返回新的分类（分类变化时 UI 需要把行挪到对应页签） */
  setItemId(index: number, itemId: string): ItemCategory {
    this.writeItemName(index, itemId);
    return getItemCategory(itemId);
  }

  /** 添加物品到下一个空槽位，返回新行；达到上限返回 null */
  addItem(itemId: string): ItemRow | null {
    let index = 0;
    while (index < MAX_ITEMS && this.readItemName(index) !== '') index++;
    if (index >= MAX_ITEMS) return null;
    return this.insertItem(index, itemId);
  }

  /** 在指定槽位写入物品（用于空槽位新增） */
  insertItem(index: number, itemId: string): ItemRow {
    this.writeItemName(index, itemId);
    if (getItemCategory(itemId) === 'clothes') this.saveFile.writeU32(this.itemQuantityOffset(index), 0);
    else if (this.saveFile.readU32(this.itemQuantityOffset(index)) === 0) {
      this.saveFile.writeU32(this.itemQuantityOffset(index), 1);
    }
    return this.readSlot(index);
  }

  private readSlot(index: number): ItemRow {
    const itemId = this.readItemName(index);
    const category = getItemCategory(itemId);
    const slots: Record<string, number> = { weapons: 0, bows: 0, shields: 0 };
    let modifierSlot: number | null = null;
    for (let i = 0; i <= index; i++) {
      const id = this.readItemName(i);
      if (id === '') continue;
      const cat = getItemCategory(id);
      if (cat === category && cat in slots) {
        if (i === index) {
          modifierSlot = slots[cat];
          slots[cat]++;
          break;
        }
        slots[cat]++;
      }
    }
    const modifierInfo = modifierSlot === null ? null : this.readModifier(category, modifierSlot);
    return {
      index,
      itemId,
      label: getItemLabel(itemId),
      category,
      quantity: this.saveFile.readU32(this.itemQuantityOffset(index)),
      maxQuantity: BotwSave.maxQuantityFor(itemId),
      modifierSlot,
      modifier: modifierInfo?.modifier ?? null,
      modifierValue: modifierInfo?.value ?? null,
    };
  }

  // ---- 马匹 ----

  readHorse(index: number): HorseRow {
    const names = this.offsetOf('HORSE_NAMES');
    const saddles = this.offsetOf('HORSE_SADDLES');
    const reins = this.offsetOf('HORSE_REINS');
    const types = this.offsetOf('HORSE_TYPES');
    return {
      index,
      type: types === undefined ? '' : this.readString64(types, index),
      name: names === undefined || index >= 5 ? '' : this.readString64(names, index),
      saddle: saddles === undefined || index >= 5 ? '' : this.readString64(saddles, index),
      reins: reins === undefined || index >= 5 ? '' : this.readString64(reins, index),
    };
  }

  setHorseName(index: number, value: string): void {
    const offset = this.offsetOf('HORSE_NAMES');
    if (offset !== undefined && index < 5) this.writeString64(offset, value, index);
  }

  setHorseSaddle(index: number, value: string): void {
    const offset = this.offsetOf('HORSE_SADDLES');
    if (offset !== undefined && index < 5) this.writeString64(offset, value, index);
  }

  setHorseReins(index: number, value: string): void {
    const offset = this.offsetOf('HORSE_REINS');
    if (offset !== undefined && index < 5) this.writeString64(offset, value, index);
  }

  setHorseType(index: number, value: string): void {
    const types = this.offsetOf('HORSE_TYPES');
    const manes = this.offsetOf('HORSE_MANES');
    if (types !== undefined) this.writeString64(types, value, index);
    if (manes !== undefined) {
      this.writeString64(manes, value === 'GameRomHorse00L' ? 'Horse_Link_Mane_00L' : 'Horse_Link_Mane', index);
    }
  }

  // ---- 地图图钉 ----

  private iterateMapPins(callback: (value: number, valueOffset: number) => boolean): void {
    const base = this.offsetOf('MapApp_MapIconNo');
    const header = this.headers.MapApp_MapIconNo;
    if (base === undefined || header === undefined) return;
    for (let i = 0; ; i++) {
      const offset = base - 4 + i * 8;
      if (this.saveFile.readU32(offset) !== header) return;
      if (!callback(this.saveFile.readU32(offset + 4), offset + 4)) return;
    }
  }

  private iterateMapPinLocations(callback: (value: number, valueOffset: number) => boolean): void {
    const base = this.offsetOf('MapApp_MapIconPos');
    const header = this.headers.MapApp_MapIconPos;
    if (base === undefined || header === undefined) return;
    for (let i = 0; ; i++) {
      const offset = base - 4 + i * 8;
      if (this.saveFile.readU32(offset) !== header) return;
      if (!callback(this.saveFile.readF32(offset + 4), offset + 4)) return;
    }
  }

  countMapPins(): number {
    let count = 0;
    this.iterateMapPins((value) => {
      if (value === 0xffffffff) return false;
      count++;
      return true;
    });
    return count;
  }

  clearMapPins(): number {
    let removed = 0;
    this.iterateMapPins((value, offset) => {
      if (value !== 0xffffffff) {
        removed++;
        this.saveFile.writeU32(offset, 0xffffffff);
      }
      return true;
    });
    let index = 0;
    let fixedLocations = 0;
    this.iterateMapPinLocations((value, offset) => {
      const expected = index % 3 === 0 ? -100000 : 0;
      index++;
      if (value !== expected) {
        fixedLocations++;
        this.saveFile.writeF32(offset, expected);
      }
      return true;
    });
    return Math.max(removed, Math.floor(fixedLocations / 3));
  }

  addMapPin(icon: number, location: readonly [number, number, number]): void {
    this.iterateMapPins((value, offset) => {
      if (value === 0xffffffff) {
        this.saveFile.writeU32(offset, icon);
        return false;
      }
      return true;
    });
    let index = 0;
    this.iterateMapPinLocations((value, offset) => {
      if (index % 3 !== 0) {
        index++;
        return true;
      }
      index++;
      if (value === -100000) {
        this.saveFile.writeF32(offset, location[0]);
        this.saveFile.writeF32(offset + 8, location[1]);
        this.saveFile.writeF32(offset + 16, location[2]);
        return false;
      }
      return true;
    });
  }

  /** 把一组哈希对应的未发现对象作为图钉加到地图上（按到玩家的 2D 距离由近到远，最多 100 个） */
  addToMap(hashes: readonly number[], icon: number): number {
    const position = this.readPosition();
    const points = hashes
      .map((hash) => ({ hash, location: COORDS[hash] }))
      .filter((point): point is { hash: number; location: readonly [number, number, number] } => !!point.location)
      .map((point) => ({
        ...point,
        distance: Math.hypot(point.location[0] - position.x, point.location[2] - position.z),
      }))
      .sort((a, b) => a.distance - b.distance);

    let pinCount = this.countMapPins();
    let added = 0;
    for (const point of points) {
      if (pinCount >= MAX_MAP_PINS) break;
      const offset = this.searchHash(point.hash);
      if (offset === null || this.saveFile.readU32(offset + 4) !== 0) continue;
      this.addMapPin(icon, point.location);
      pinCount++;
      added++;
    }
    return added;
  }

  addKoroksToMap(): number {
    return this.addToMap(KOROKS, ICON_TYPES.LEAF);
  }

  addHinoxToMap(): number {
    return this.addToMap(DEFEATED_HINOX, ICON_TYPES.SKULL);
  }

  addTalusToMap(): number {
    return this.addToMap(DEFEATED_TALUS, ICON_TYPES.SHIELD);
  }

  addMoldugaToMap(): number {
    return this.addToMap(DEFEATED_MOLDUGA, ICON_TYPES.CHEST);
  }

  addLocationsToMap(): number {
    return this.addToMap(LOCATIONS, ICON_TYPES.STAR);
  }

  // ---- 批量解锁 ----

  /** 把哈希表里值为 0 的布尔项全部置 1，返回解锁数量 */
  private setBooleans(hashTable: readonly number[]): number {
    let count = 0;
    for (const hash of hashTable) {
      const offset = this.searchHash(hash);
      if (offset !== null && this.saveFile.readU32(offset + 4) === 0) {
        this.saveFile.writeU32(offset + 4, 1);
        count++;
      }
    }
    return count;
  }

  unlockKoroks(): number {
    const unlocked = this.setBooleans(KOROKS);
    const completeOffset = this.searchHash(0x64622a86); // HiddenKorok_Complete
    if (completeOffset !== null) this.saveFile.writeU32(completeOffset + 4, 1);

    this.writeAt('KOROK_SEED_COUNTER', this.readAt('KOROK_SEED_COUNTER') + unlocked);

    // 背包里的克洛洛果实数量一起加，保持与计数器一致
    for (let i = 0; i < MAX_ITEMS; i++) {
      if (this.readItemName(i) === 'Obj_KorokNuts') {
        const offset = this.itemQuantityOffset(i);
        this.saveFile.writeU32(offset, this.saveFile.readU32(offset) + unlocked);
        break;
      }
    }
    return unlocked;
  }

  defeatAllHinox(): number {
    const count = this.setBooleans(DEFEATED_HINOX);
    this.writeAt('DEFEATED_HINOX_COUNTER', this.readAt('DEFEATED_HINOX_COUNTER') + count);
    return count;
  }

  defeatAllTalus(): number {
    const count = this.setBooleans(DEFEATED_TALUS);
    this.writeAt('DEFEATED_TALUS_COUNTER', this.readAt('DEFEATED_TALUS_COUNTER') + count);
    return count;
  }

  defeatAllMolduga(): number {
    const count = this.setBooleans(DEFEATED_MOLDUGA);
    this.writeAt('DEFEATED_MOLDUGA_COUNTER', this.readAt('DEFEATED_MOLDUGA_COUNTER') + count);
    return count;
  }

  visitAllLocations(): number {
    return this.setBooleans(LOCATIONS);
  }

  /** 把图鉴里拍过的照片重置为“库存”状态（0xffffffff），否则删照片文件夹会掉图鉴 */
  setCompendiumToStock(): number {
    let changed = 0;
    for (const hash of PICTURE_BOOK_SIZE) {
      const offset = this.searchHash(hash);
      if (offset === null) continue;
      const value = this.saveFile.readU32(offset + 4);
      if (value !== 0 && value !== 0xffffffff) {
        this.saveFile.writeU32(offset + 4, 0xffffffff);
        changed++;
      }
    }
    return changed;
  }

  // ---- 数值字段 ----

  private readPosition(): Vec3 {
    const offset = this.offsetOf('PLAYER_POSITION') ?? 0;
    return {
      x: this.saveFile.readF32(offset),
      y: this.saveFile.readF32(offset + 8),
      z: this.saveFile.readF32(offset + 16),
    };
  }

  readSnapshot(): BotwSnapshot {
    const position = this.readPosition();
    const horseOffset = this.offsetOf('HORSE_POSITION') ?? 0;
    const mapOffset = this.offsetOf('MAP');
    const mapTypeOffset = this.offsetOf('MAPTYPE');
    const playtimeSeconds = this.readAt('PLAYTIME');

    return {
      version: this.version.versionLabel,
      consoleType: this.version.consoleType,
      modified: this.version.modified,
      rupees: this.readAt('RUPEES'),
      mons: this.readAt('MONS'),
      maxHearts: this.readAt('MAX_HEARTS'),
      maxStamina: this.readAt('MAX_STAMINA'),
      relicGerudo: this.readAt('RELIC_GERUDO'),
      relicGoron: this.readAt('RELIC_GORON'),
      relicRito: this.readAt('RELIC_RITO'),
      koroks: this.readAt('KOROK_SEED_COUNTER'),
      defeatedHinox: this.readAt('DEFEATED_HINOX_COUNTER'),
      defeatedTalus: this.readAt('DEFEATED_TALUS_COUNTER'),
      defeatedMolduga: this.readAt('DEFEATED_MOLDUGA_COUNTER'),
      playtimeSeconds,
      playtime: formatPlaytime(playtimeSeconds),
      hasMotorcycle: this.offsetOf('MOTORCYCLE') !== undefined,
      motorcycle: this.readAt('MOTORCYCLE') !== 0,
      position,
      mapType: mapTypeOffset === undefined ? '' : this.readStrideString(mapTypeOffset, 8),
      map: mapOffset === undefined ? '' : this.readStrideString(mapOffset, 8),
      horsePosition: {
        x: this.saveFile.readF32(horseOffset),
        y: this.saveFile.readF32(horseOffset + 8),
        z: this.saveFile.readF32(horseOffset + 16),
      },
      items: this.readItems(),
      horses: Array.from({ length: 6 }, (_, i) => this.readHorse(i)),
      mapPinCount: this.countMapPins(),
      score: calculateScaleScore(this.saveFile),
    };
  }

  setRupees(value: number): void {
    this.writeAt('RUPEES', value);
  }

  setMons(value: number): void {
    this.writeAt('MONS', value);
  }

  setMaxHearts(value: number): void {
    this.writeAt('MAX_HEARTS', value);
  }

  setMaxStamina(value: number): void {
    this.writeAt('MAX_STAMINA', value);
  }

  setRelic(kind: 'gerudo' | 'goron' | 'rito', value: number): void {
    const name: HashName = kind === 'gerudo' ? 'RELIC_GERUDO' : kind === 'goron' ? 'RELIC_GORON' : 'RELIC_RITO';
    this.writeAt(name, value);
  }

  setKoroks(value: number): void {
    this.writeAt('KOROK_SEED_COUNTER', value);
  }

  setDefeated(kind: 'hinox' | 'talus' | 'molduga', value: number): void {
    const name: HashName =
      kind === 'hinox' ? 'DEFEATED_HINOX_COUNTER' : kind === 'talus' ? 'DEFEATED_TALUS_COUNTER' : 'DEFEATED_MOLDUGA_COUNTER';
    this.writeAt(name, value);
  }

  setMotorcycle(enabled: boolean): void {
    this.writeAt('MOTORCYCLE', enabled ? 1 : 0);
  }

  setPosition(axis: 'x' | 'y' | 'z', value: number): void {
    const offset = this.offsetOf('PLAYER_POSITION');
    if (offset === undefined) return;
    this.saveFile.writeF32(offset + (axis === 'x' ? 0 : axis === 'y' ? 8 : 16), value);
  }

  setHorsePosition(axis: 'x' | 'y' | 'z', value: number): void {
    const offset = this.offsetOf('HORSE_POSITION');
    if (offset === undefined) return;
    this.saveFile.writeF32(offset + (axis === 'x' ? 0 : axis === 'y' ? 8 : 16), value);
  }

  setMap(map: string): void {
    const mapOffset = this.offsetOf('MAP');
    if (mapOffset !== undefined) this.writeStrideString(mapOffset, map, 8);
  }

  setMapType(mapType: string): void {
    const offset = this.offsetOf('MAPTYPE');
    if (offset !== undefined) this.writeStrideString(offset, mapType, 8);
  }

  toBlob(): Blob {
    return this.saveFile.toBlob();
  }
}

export class InvalidSaveFileError extends Error {
  constructor() {
    super('无效的存档文件');
    this.name = 'InvalidSaveFileError';
  }
}

/** 供 UI 使用的静态选项 */
export const HORSE_TYPE_OPTIONS = HORSE_TYPES.map((id) => ({ value: id, label: getItemLabel(id) }));
export const HORSE_WILD_TYPE_OPTIONS = HORSE_TYPES_UNTAMMED.map((id) => ({ value: id, label: getItemLabel(id) }));
export const HORSE_SADDLE_OPTIONS = HORSE_SADDLES.map((id) => ({ value: id, label: getItemLabel(id) }));
export const HORSE_REINS_OPTIONS = HORSE_REINS.map((id) => ({ value: id, label: getItemLabel(id) }));

export const ITEM_CATEGORY_LABELS: Record<ItemCategory, string> = {
  weapons: '武器',
  bows: '弓箭',
  shields: '盾',
  clothes: '防具',
  materials: '材料',
  food: '料理',
  other: '重要物品',
};

export const TAB_ORDER: readonly ItemCategory[] = [
  'weapons',
  'bows',
  'shields',
  'clothes',
  'materials',
  'food',
  'other',
];

export { TRANSLATION_OTHER };
