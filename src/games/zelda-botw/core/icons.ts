/**
 * 物品图标定位。
 *
 * 图标不在单个文件里，而是按类别拼在 23 张 16 列 × 64px 的图集（sprite sheet）中；
 * 这里只算出「用哪张图集、第几列、第几行」，渲染交给 ItemIcon 组件。
 * 防具还可以按染色号取同一行相邻的染色版本。
 */
import { ICON_COLS, ICON_SHEETS, REPEAT_ARMOR_ICONS_1, REPEAT_ARMOR_ICONS_2 } from './iconSheets';

export { ICON_COLS, ICON_SIZE } from './iconSheets';

export interface IconPosition {
  sheet: string;
  column: number;
  row: number;
}

const ARMOR_PATTERN = /^Armor_([0-9]{3})_(Head|Upper|Lower)(_Dye[0-9]{2})?/;
const ITEM_PATTERN = /^Item_(Chilled|ChilledFish|Enemy|Material|Meat|Roast|RoastFish)_([0-9]{2})/;
const GATHER_PATTERN = /^Item_(FishGet|Fruit|InsectGet|MushroomGet|Ore|PlantGet)_([A-Z][A-B]?)/;
const COOK_PATTERN = /^Item_Cook_([A-P]_[0-9]{2})/;
const WEAPON_PATTERN = /^Weapon_(Sword|Lsword|Spear|Bow|Shield)_([0-9]{3})/;

/** 计算物品图标在图集中的位置；找不到返回 null（显示空白图标） */
export function getItemIcon(itemId: string, clothesColor?: number): IconPosition | null {
  let sheet: string;
  let iconId: string;

  const armorMatch = itemId.match(ARMOR_PATTERN);
  const itemMatch = itemId.match(ITEM_PATTERN);
  const gatherMatch = itemId
    .replace('Animal_Insect_', 'Item_InsectGet_')
    .replace('Mushroom_', 'MushroomGet_')
    .replace('Plant_', 'PlantGet_')
    .match(GATHER_PATTERN);
  const cookMatch = itemId.match(COOK_PATTERN);
  const weaponMatch = itemId.match(WEAPON_PATTERN);

  if (armorMatch) {
    sheet = `Armor_${armorMatch[2]}`;
    iconId = armorMatch[1];
    // 部分防具没有独立图标，复用到同一套护甲图
    const repeatIndex = REPEAT_ARMOR_ICONS_1.indexOf(iconId);
    if (repeatIndex >= 0) iconId = REPEAT_ARMOR_ICONS_2[Math.trunc(repeatIndex / 4)];
  } else if (itemMatch) {
    sheet = `Item_${itemMatch[1]}`;
    iconId = itemMatch[2];
  } else if (itemId === 'Item_Enemy_Put_57') {
    sheet = 'Item_Enemy';
    iconId = 'Put_57';
  } else if (gatherMatch) {
    sheet = `Item_${gatherMatch[1]}`;
    iconId = gatherMatch[2];
    // 普通（非"Get"）的螃蟹/昆虫在图集里带 Normal 前缀
    if ((iconId === 'K' || iconId === 'O' || iconId === 'Z') && itemId.startsWith('Animal_Insect_')) {
      iconId = `Normal${iconId}`;
    }
  } else if (cookMatch) {
    sheet = 'Item_Cook';
    iconId = cookMatch[1];
  } else if (weaponMatch) {
    sheet = `Weapon_${weaponMatch[1]}`;
    iconId = weaponMatch[2];
  } else {
    sheet = 'Other';
    iconId = itemId;
  }

  const sheetIds = ICON_SHEETS[sheet];
  if (!sheetIds) return null;
  let icon = sheetIds.indexOf(iconId);
  if (icon === -1) return null;

  if (itemId.startsWith('Armor_') && clothesColor !== undefined && clothesColor <= 15) icon += clothesColor;

  return { sheet, column: icon % ICON_COLS, row: Math.trunc(icon / ICON_COLS) };
}

/** 空白图标资源（图集之外的回退） */
export const BLANK_ICON = 'assets/_blank.png';

export function iconSheetUrl(sheet: string): string {
  return `assets/${sheet}.png`;
}
