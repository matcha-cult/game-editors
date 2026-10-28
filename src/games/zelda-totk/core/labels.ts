import { ARMOR_INFO, DYE_COLORS, EQUIPMENT_MODIFIERS, FOOD_EFFECTS } from '../data/itemMeta';
import { ZH } from '../data/locale-zh';
import { hashReverse, hashText, toHex32 } from './murmur3';

/** 界面文案：优先用中文词条，没有则回退英文原文 */
export function t(text: string): string {
  return ZH[text] ?? text;
}

/** 物品/装备/马匹等 ID 的中文名 */
export function itemLabel(itemId: string): string {
  return ZH[itemId] ?? itemId;
}

/** 词缀：存档里以枚举名字符串保存（如 DurabilityUp），显示名从数据表里取 */
const MODIFIER_NAMES = new Map<number, string>();
for (const options of Object.values(EQUIPMENT_MODIFIERS)) {
  for (const option of options) MODIFIER_NAMES.set(option.value, option.name);
}

export function modifierLabel(value: string | number): string {
  if (typeof value === 'number') {
    const name = MODIFIER_NAMES.get(value >>> 0);
    return name ? t(name) : toHex32(value);
  }
  const numeric = hashText(value);
  const name = MODIFIER_NAMES.get(numeric);
  return name ? t(name) : t(value);
}

/** 枚举 id（字符串）→ 下拉选项 */
export function modifierOptions(category: string): Array<{ value: string; label: string }> {
  const options = EQUIPMENT_MODIFIERS[category] ?? [];
  return options.map((option) => ({
    value: hashReverse(option.value) ?? String(option.value),
    label: t(option.name),
  }));
}

/** 染色枚举名 → 中文 */
export function dyeLabel(value: string | number): string {
  const numeric = typeof value === 'number' ? value >>> 0 : hashText(value);
  const entry = DYE_COLORS.find((color) => color.value === numeric);
  if (entry) return t(entry.name);
  return typeof value === 'string' ? t(value) : toHex32(numeric);
}

/** 染色下拉：value 用存档里的枚举名（如 Blue），显示用中文名 */
export function dyeOptions(): Array<{ value: string; label: string }> {
  return DYE_COLORS.map((color) => ({
    value: hashReverse(color.value) ?? String(color.value),
    label: t(color.name),
  }));
}

/** 料理效果：存档里是枚举名（如 ResistHot），展示用官方中文名（如 耐热） */
export function effectLabel(value: string | number): string {
  const numeric = typeof value === 'number' ? value >>> 0 : hashText(value);
  const effect = FOOD_EFFECTS.find((entry) => entry.value === numeric);
  if (!effect) return typeof value === 'string' ? t(value) : toHex32(numeric);
  return t(effect.name);
}

export function effectOptions(): Array<{ value: number; label: string }> {
  return FOOD_EFFECTS.map((effect) => ({ value: effect.value, label: t(effect.name) }));
}

export function effectHash(value: string | number): number {
  return typeof value === 'number' ? value >>> 0 : hashText(value);
}

/** 防具是否可以升级（有升级目标 ID） */
export function armorUpgradeTarget(armorId: string): string | undefined {
  const upgradeable = ARMOR_INFO[armorId]?.upgradeable;
  return typeof upgradeable === 'string' ? upgradeable : undefined;
}
