/* 由既有 TOTK 编辑器源码机械提取，勿手工编辑。 */

/** 物品数量上限（未列出的默认 999） */
export const MAXIMUM_QUANTITY: Readonly<Record<string, number>> = {
 "Item_Ore_L": 999999,
 "Item_Ore_M": 999999,
 "Energy_Material_01": 999999,
 "Obj_WarpDLC": 3,
 "Obj_KorokNuts": 1000,
 "MinusRupee_00": 999999
};

/** 可显示数量的重要物品 */
export const KEY_COUNTABLE: readonly string[] = [
 "Obj_DungeonClearSeal",
 "Obj_SageWill",
 "Obj_KorokNuts",
 "CaveMasterMedal",
 "Energy_Material_01",
 "Item_Ore_L",
 "Item_Ore_M",
 "MinusRupee_00",
 "Obj_WarpDLC",
 "Obj_TreasureMap_00",
 "Obj_AutoBuilderDraft_00",
 "Obj_AutoBuilderDraftAssassin_00",
 "Item_StableHostelAccommodationCoupon_A"
];

/** 料理增益效果（value 为效果名称的 murmur3 哈希） */
export const FOOD_EFFECTS: ReadonlyArray<{ readonly name: string; readonly value: number }> = [
 {
  "name": "None",
  "value": 3069107721
 },
 {
  "name": "Heat Resistance",
  "value": 502767633
 },
 {
  "name": "Flame Guard",
  "value": 288897789
 },
 {
  "name": "Cold Resistance",
  "value": 2607651067
 },
 {
  "name": "Shock Resistance",
  "value": 406640674
 },
 {
  "name": "Swim Speed Up",
  "value": 1736862829
 },
 {
  "name": "Climb Speed Up",
  "value": 3699355502
 },
 {
  "name": "Attack Up",
  "value": 2839039084
 },
 {
  "name": "Cold Weather Attack Up",
  "value": 1245599990
 },
 {
  "name": "Hot Weather Attack Up",
  "value": 1282049490
 },
 {
  "name": "Stormy Weather Attack Up",
  "value": 4281629240
 },
 {
  "name": "Stealth Up",
  "value": 1947474072
 },
 {
  "name": "Sand Speed Up",
  "value": 2598212259
 },
 {
  "name": "Snow Speed Up",
  "value": 858136132
 },
 {
  "name": "Defense Up",
  "value": 2694843406
 },
 {
  "name": "Speed Up",
  "value": 3019290746
 },
 {
  "name": "Gloom Resistance",
  "value": 1293847284
 },
 {
  "name": "Extra Heart",
  "value": 3252357477
 },
 {
  "name": "Stamina Recovery",
  "value": 3919773782
 },
 {
  "name": "Extra Stamina",
  "value": 1624781149
 },
 {
  "name": "Gloom Recovery",
  "value": 54892627
 },
 {
  "name": "Skydive Mobility Up",
  "value": 1735783536
 },
 {
  "name": "Slip Resistance",
  "value": 722252265
 },
 {
  "name": "Glow",
  "value": 1228528801
 }
];

/** 各装备分类可选词缀：value 是词缀名的哈希，name 是英文显示名 */
export const EQUIPMENT_MODIFIERS: Readonly<Record<string, ReadonlyArray<{ readonly name: string; readonly value: number }>>> = {
 "weapons": [
  {
   "name": "No bonus",
   "value": 3069107721
  },
  {
   "name": "Durability ↑",
   "value": 3586839451
  },
  {
   "name": "Durability ↑↑",
   "value": 2999534574
  },
  {
   "name": "Attack ↑",
   "value": 2839039084
  },
  {
   "name": "Attack ↑↑",
   "value": 3671131671
  },
  {
   "name": "Critical Hit ↑",
   "value": 3505368147
  },
  {
   "name": "Throw ↑↑",
   "value": 2522466308
  }
 ],
 "bows": [
  {
   "name": "No bonus",
   "value": 3069107721
  },
  {
   "name": "Durability ↑",
   "value": 3586839451
  },
  {
   "name": "Durability ↑↑",
   "value": 2999534574
  },
  {
   "name": "Attack ↑",
   "value": 2839039084
  },
  {
   "name": "Attack ↑↑",
   "value": 3671131671
  },
  {
   "name": "Quick Shot",
   "value": 2102418372
  },
  {
   "name": "Arrow Shot x5",
   "value": 2470472141
  }
 ],
 "shields": [
  {
   "name": "No bonus",
   "value": 3069107721
  },
  {
   "name": "Durability ↑",
   "value": 3586839451
  },
  {
   "name": "Durability ↑↑",
   "value": 2999534574
  },
  {
   "name": "Block ↑",
   "value": 938140431
  },
  {
   "name": "Block ↑↑",
   "value": 188519653
  }
 ]
};

/** 装备默认耐久（未列出时按 70） */
export const EQUIPMENT_DEFAULT_DURABILITY: Readonly<Record<string, number>> = {
 "Weapon_Sword_001": 20,
 "Weapon_Sword_002": 23,
 "Weapon_Sword_003": 27,
 "Weapon_Sword_019": 5,
 "Weapon_Sword_020": 5,
 "Weapon_Sword_021": 6,
 "Weapon_Sword_022": 5,
 "Weapon_Sword_024": 35,
 "Weapon_Sword_025": 27,
 "Weapon_Sword_027": 27,
 "Weapon_Sword_029": 14,
 "Weapon_Sword_031": 27,
 "Weapon_Sword_041": 26,
 "Weapon_Sword_043": 8,
 "Weapon_Sword_044": 4,
 "Weapon_Sword_047": 12,
 "Weapon_Sword_051": 18,
 "Weapon_Sword_052": 60,
 "Weapon_Sword_057": 45,
 "Weapon_Sword_058": 27,
 "Weapon_Sword_059": 20,
 "Weapon_Sword_070": 40,
 "Weapon_Sword_101": 15,
 "Weapon_Sword_103": 12,
 "Weapon_Sword_105": 16,
 "Weapon_Sword_106": 16,
 "Weapon_Sword_107": 17,
 "Weapon_Sword_108": 24,
 "Weapon_Sword_109": 14,
 "Weapon_Sword_112": 17,
 "Weapon_Sword_113": 18,
 "Weapon_Sword_114": 16,
 "Weapon_Sword_124": 20,
 "Weapon_Sword_125": 17,
 "Weapon_Sword_127": 20,
 "Weapon_Sword_129": 10,
 "Weapon_Sword_131": 18,
 "Weapon_Sword_147": 10,
 "Weapon_Sword_161": 14,
 "Weapon_Sword_163": 16,
 "Weapon_Sword_164": 18,
 "Weapon_Sword_166": 15,
 "Weapon_Sword_167": 4,
 "Weapon_Sword_168": 12,
 "Weapon_Sword_077": 40,
 "Weapon_Sword_071": 15,
 "Weapon_Sword_071_Broken": 6,
 "Weapon_Sword_152_Main": 60,
 "Weapon_Sword_152_Sub": 60,
 "Weapon_Sword_070_Broken": 6,
 "Npc_Zelda_Torch": 8,
 "Demo910_Torch": 8,
 "Weapon_Sword_043_SetFire": 8,
 "Weapon_Lsword_001": 20,
 "Weapon_Lsword_002": 25,
 "Weapon_Lsword_003": 30,
 "Weapon_Lsword_019": 5,
 "Weapon_Lsword_020": 8,
 "Weapon_Lsword_024": 40,
 "Weapon_Lsword_027": 30,
 "Weapon_Lsword_029": 14,
 "Weapon_Lsword_036": 30,
 "Weapon_Lsword_038": 8,
 "Weapon_Lsword_041": 25,
 "Weapon_Lsword_045": 6,
 "Weapon_Lsword_047": 12,
 "Weapon_Lsword_051": 40,
 "Weapon_Lsword_054": 40,
 "Weapon_Lsword_057": 50,
 "Weapon_Lsword_059": 60,
 "Weapon_Lsword_060": 35,
 "Weapon_Lsword_101": 15,
 "Weapon_Lsword_103": 14,
 "Weapon_Lsword_106": 16,
 "Weapon_Lsword_108": 26,
 "Weapon_Lsword_109": 16,
 "Weapon_Lsword_112": 17,
 "Weapon_Lsword_113": 18,
 "Weapon_Lsword_114": 18,
 "Weapon_Lsword_124": 20,
 "Weapon_Lsword_127": 20,
 "Weapon_Lsword_129": 10,
 "Weapon_Lsword_136": 18,
 "Weapon_Lsword_147": 11,
 "Weapon_Lsword_161": 14,
 "Weapon_Lsword_163": 16,
 "Weapon_Lsword_164": 18,
 "Weapon_Lsword_166": 14,
 "Weapon_Lsword_168": 14,
 "Weapon_Lsword_174": 18,
 "Weapon_Lsword_154": 40,
 "Weapon_Spear_001": 30,
 "Weapon_Spear_002": 35,
 "Weapon_Spear_003": 40,
 "Weapon_Spear_021": 12,
 "Weapon_Spear_022": 12,
 "Weapon_Spear_024": 50,
 "Weapon_Spear_025": 35,
 "Weapon_Spear_027": 40,
 "Weapon_Spear_029": 20,
 "Weapon_Spear_030": 26,
 "Weapon_Spear_032": 35,
 "Weapon_Spear_036": 8,
 "Weapon_Spear_038": 12,
 "Weapon_Spear_047": 15,
 "Weapon_Spear_050": 70,
 "Weapon_Spear_101": 22,
 "Weapon_Spear_103": 18,
 "Weapon_Spear_106": 24,
 "Weapon_Spear_108": 34,
 "Weapon_Spear_109": 22,
 "Weapon_Spear_112": 25,
 "Weapon_Spear_113": 26,
 "Weapon_Spear_124": 30,
 "Weapon_Spear_125": 24,
 "Weapon_Spear_127": 26,
 "Weapon_Spear_129": 15,
 "Weapon_Spear_132": 25,
 "Weapon_Spear_147": 14,
 "Weapon_Spear_161": 14,
 "Weapon_Spear_163": 24,
 "Weapon_Spear_164": 27,
 "Weapon_Spear_166": 16,
 "Weapon_Spear_168": 18,
 "Weapon_Spear_173": 20,
 "Weapon_Spear_036_MercenarySoldier": 8,
 "Weapon_Spear_150": 70,
 "Weapon_RaumiGolem_Left": 20,
 "Weapon_RaumiGolem_Right": 20,
 "Weapon_DungeonBossZonau": 20,
 "Weapon_Goron_Knuckle": 20,
 "Weapon_Bow_001": 22,
 "Weapon_Bow_002": 36,
 "Weapon_Bow_003": 20,
 "Weapon_Bow_004": 16,
 "Weapon_Bow_006": 25,
 "Weapon_Bow_009": 30,
 "Weapon_Bow_011": 35,
 "Weapon_Bow_013": 35,
 "Weapon_Bow_014": 40,
 "Weapon_Bow_015": 40,
 "Weapon_Bow_016": 30,
 "Weapon_Bow_017": 35,
 "Weapon_Bow_026": 35,
 "Weapon_Bow_027": 30,
 "Weapon_Bow_028": 60,
 "Weapon_Bow_029": 45,
 "Weapon_Bow_030": 50,
 "Weapon_Bow_032": 45,
 "Weapon_Bow_033": 20,
 "Weapon_Bow_035": 48,
 "Weapon_Bow_036": 60,
 "Weapon_Bow_038": 20,
 "Weapon_Bow_040": 18,
 "Weapon_Bow_072": 40,
 "Weapon_Bow_101": 50,
 "Weapon_Bow_104": 18,
 "Weapon_Bow_105": 26,
 "Weapon_Bow_106": 34,
 "Weapon_Bow_107": 20,
 "Weapon_Bow_166": 42,
 "Weapon_Bow_016_Event": 30,
 "Weapon_Bow_116": 30,
 "Weapon_Bow_128": 60,
 "Weapon_Bow_129": 60,
 "Weapon_Bow_166_For_Ganondorf": 42,
 "Weapon_Shield_001": 12,
 "Weapon_Shield_001_NoBurned": 12,
 "Weapon_Shield_002": 16,
 "Weapon_Shield_002_NoBurned": 16,
 "Weapon_Shield_003": 23,
 "Weapon_Shield_004": 5,
 "Weapon_Shield_005": 7,
 "Weapon_Shield_006": 8,
 "Weapon_Shield_007": 8,
 "Weapon_Shield_008": 12,
 "Weapon_Shield_009": 15,
 "Weapon_Shield_016": 12,
 "Weapon_Shield_017": 15,
 "Weapon_Shield_018": 20,
 "Weapon_Shield_021": 16,
 "Weapon_Shield_022": 29,
 "Weapon_Shield_023": 18,
 "Weapon_Shield_025": 20,
 "Weapon_Shield_026": 20,
 "Weapon_Shield_030": 800,
 "Weapon_Shield_031": 10,
 "Weapon_Shield_031_NoBurned": 10,
 "Weapon_Shield_032": 10,
 "Weapon_Shield_032_NoBurned": 10,
 "Weapon_Shield_033": 14,
 "Weapon_Shield_034": 12,
 "Weapon_Shield_034_NoBurned": 12,
 "Weapon_Shield_035": 12,
 "Weapon_Shield_035_NoBurned": 12,
 "Weapon_Shield_036": 26,
 "Weapon_Shield_037": 60,
 "Weapon_Shield_040": 10,
 "Weapon_Shield_041": 16,
 "Weapon_Shield_042": 16,
 "Weapon_Shield_042_NoBurned": 16,
 "Weapon_Shield_057": 90,
 "Weapon_Shield_101": 15,
 "Weapon_Shield_102": 15,
 "Weapon_Shield_103": 20,
 "Weapon_Shield_107": 12,
 "Weapon_DungeonBossZonau_Front": 12,
 "Weapon_RaumiGolem_Back": 12
};

/** 余料建造（fuse）物品的默认耐久 */
export const FUSE_DURABILITY: Readonly<Record<string, number>> = {
 "Weapon_Sword_001": 25,
 "Weapon_Sword_002": 25,
 "Weapon_Sword_003": 25,
 "Weapon_Sword_019": 3,
 "Weapon_Sword_020": 3,
 "Weapon_Sword_021": 10,
 "Weapon_Sword_022": 10,
 "Weapon_Sword_024": 25,
 "Weapon_Sword_025": 25,
 "Weapon_Sword_027": 25,
 "Weapon_Sword_029": 5,
 "Weapon_Sword_031": 25,
 "Weapon_Sword_041": 25,
 "Weapon_Sword_043": 10,
 "Weapon_Sword_043_SetFire": 25,
 "Weapon_Sword_044": 10,
 "Weapon_Sword_047": 10,
 "Weapon_Sword_051": 25,
 "Weapon_Sword_052": 25,
 "Weapon_Sword_057": 25,
 "Weapon_Sword_058": 25,
 "Weapon_Sword_059": 25,
 "Weapon_Sword_070": 25,
 "Weapon_Sword_071": 25,
 "Weapon_Sword_101": 25,
 "Weapon_Sword_103": 25,
 "Weapon_Sword_105": 25,
 "Weapon_Sword_106": 25,
 "Weapon_Sword_107": 25,
 "Weapon_Sword_108": 25,
 "Weapon_Sword_109": 25,
 "Weapon_Sword_112": 25,
 "Weapon_Sword_113": 25,
 "Weapon_Sword_114": 25,
 "Weapon_Sword_124": 25,
 "Weapon_Sword_125": 25,
 "Weapon_Sword_127": 25,
 "Weapon_Sword_129": 5,
 "Weapon_Sword_131": 25,
 "Weapon_Sword_147": 10,
 "Weapon_Sword_161": 25,
 "Weapon_Sword_163": 25,
 "Weapon_Sword_164": 25,
 "Weapon_Sword_166": 10,
 "Weapon_Sword_167": 10,
 "Weapon_Sword_168": 25,
 "Weapon_Sword_077": 25,
 "Weapon_Sword_070_Broken": 25,
 "Npc_Zelda_Torch": 25,
 "Weapon_Sword_152_Main": 25,
 "Weapon_Sword_152_Sub": 25,
 "Demo910_Torch": 25,
 "Weapon_Lsword_001": 25,
 "Weapon_Lsword_002": 25,
 "Weapon_Lsword_003": 25,
 "Weapon_Lsword_019": 3,
 "Weapon_Lsword_020": 10,
 "Weapon_Lsword_024": 25,
 "Weapon_Lsword_027": 25,
 "Weapon_Lsword_029": 5,
 "Weapon_Lsword_036": 25,
 "Weapon_Lsword_038": 10,
 "Weapon_Lsword_041": 25,
 "Weapon_Lsword_045": 10,
 "Weapon_Lsword_047": 10,
 "Weapon_Lsword_051": 25,
 "Weapon_Lsword_054": 25,
 "Weapon_Lsword_057": 25,
 "Weapon_Lsword_059": 25,
 "Weapon_Lsword_060": 25,
 "Weapon_Lsword_101": 25,
 "Weapon_Lsword_103": 25,
 "Weapon_Lsword_106": 25,
 "Weapon_Lsword_108": 25,
 "Weapon_Lsword_109": 25,
 "Weapon_Lsword_112": 25,
 "Weapon_Lsword_113": 25,
 "Weapon_Lsword_114": 25,
 "Weapon_Lsword_124": 25,
 "Weapon_Lsword_127": 25,
 "Weapon_Lsword_129": 5,
 "Weapon_Lsword_136": 25,
 "Weapon_Lsword_147": 10,
 "Weapon_Lsword_154": 25,
 "Weapon_Lsword_161": 25,
 "Weapon_Lsword_163": 25,
 "Weapon_Lsword_164": 25,
 "Weapon_Lsword_166": 10,
 "Weapon_Lsword_168": 25,
 "Weapon_Lsword_174": 25,
 "Weapon_Spear_001": 25,
 "Weapon_Spear_002": 25,
 "Weapon_Spear_003": 25,
 "Weapon_Spear_021": 10,
 "Weapon_Spear_022": 10,
 "Weapon_Spear_024": 25,
 "Weapon_Spear_025": 25,
 "Weapon_Spear_027": 25,
 "Weapon_Spear_029": 5,
 "Weapon_Spear_030": 25,
 "Weapon_Spear_032": 25,
 "Weapon_Spear_036": 10,
 "Weapon_Spear_036_MercenarySoldier": 25,
 "Weapon_Spear_038": 10,
 "Weapon_Spear_047": 10,
 "Weapon_Spear_050": 25,
 "Weapon_Spear_101": 25,
 "Weapon_Spear_103": 25,
 "Weapon_Spear_106": 25,
 "Weapon_Spear_108": 25,
 "Weapon_Spear_109": 25,
 "Weapon_Spear_112": 25,
 "Weapon_Spear_113": 25,
 "Weapon_Spear_124": 25,
 "Weapon_Spear_125": 25,
 "Weapon_Spear_127": 25,
 "Weapon_Spear_129": 5,
 "Weapon_Spear_132": 25,
 "Weapon_Spear_147": 10,
 "Weapon_Spear_150": 25,
 "Weapon_Spear_161": 25,
 "Weapon_Spear_163": 25,
 "Weapon_Spear_164": 25,
 "Weapon_Spear_166": 10,
 "Weapon_Spear_168": 25,
 "Weapon_Spear_173": 25,
 "Weapon_RaumiGolem_Left": 25,
 "Weapon_RaumiGolem_Right": 25,
 "Weapon_Goron_Knuckle": 25,
 "Weapon_DungeonBossZonau": 25
};

/** 防具信息：baseId 决定图标/基础外观，upgradeable 指向可升级到的 ID */
export const ARMOR_INFO: Readonly<
  Record<
    string,
    { readonly base: string; readonly level?: number | null; readonly upgradeable?: string | false; readonly dyeable?: boolean }
  >
> = {
 "Armor_001_Head": {
  "base": "Armor_001_Head",
  "level": 0,
  "upgradeable": "Armor_002_Head",
  "dyeable": true
 },
 "Armor_002_Head": {
  "base": "Armor_001_Head",
  "level": 1,
  "upgradeable": "Armor_003_Head",
  "dyeable": true
 },
 "Armor_003_Head": {
  "base": "Armor_001_Head",
  "level": 2,
  "upgradeable": "Armor_004_Head",
  "dyeable": true
 },
 "Armor_004_Head": {
  "base": "Armor_001_Head",
  "level": 3,
  "upgradeable": "Armor_015_Head",
  "dyeable": true
 },
 "Armor_015_Head": {
  "base": "Armor_001_Head",
  "level": 4,
  "upgradeable": false,
  "dyeable": true
 },
 "Armor_1152_Head": {
  "base": "Armor_1152_Head",
  "level": 0,
  "upgradeable": "Armor_1153_Head",
  "dyeable": true
 },
 "Armor_1153_Head": {
  "base": "Armor_1152_Head",
  "level": 1,
  "upgradeable": "Armor_1154_Head",
  "dyeable": true
 },
 "Armor_1154_Head": {
  "base": "Armor_1152_Head",
  "level": 2,
  "upgradeable": "Armor_1155_Head",
  "dyeable": true
 },
 "Armor_1155_Head": {
  "base": "Armor_1152_Head",
  "level": 3,
  "upgradeable": "Armor_1156_Head",
  "dyeable": true
 },
 "Armor_1156_Head": {
  "base": "Armor_1152_Head",
  "level": 4,
  "upgradeable": false,
  "dyeable": true
 },
 "Armor_001_Upper": {
  "base": "Armor_001_Upper",
  "level": 0,
  "upgradeable": "Armor_002_Upper",
  "dyeable": true
 },
 "Armor_002_Upper": {
  "base": "Armor_001_Upper",
  "level": 1,
  "upgradeable": "Armor_003_Upper",
  "dyeable": true
 },
 "Armor_003_Upper": {
  "base": "Armor_001_Upper",
  "level": 2,
  "upgradeable": "Armor_004_Upper",
  "dyeable": true
 },
 "Armor_004_Upper": {
  "base": "Armor_001_Upper",
  "level": 3,
  "upgradeable": "Armor_015_Upper",
  "dyeable": true
 },
 "Armor_015_Upper": {
  "base": "Armor_001_Upper",
  "level": 4,
  "upgradeable": false,
  "dyeable": true
 },
 "Armor_001_Lower": {
  "base": "Armor_001_Lower",
  "level": 0,
  "upgradeable": "Armor_002_Lower",
  "dyeable": true
 },
 "Armor_002_Lower": {
  "base": "Armor_001_Lower",
  "level": 1,
  "upgradeable": "Armor_003_Lower",
  "dyeable": true
 },
 "Armor_003_Lower": {
  "base": "Armor_001_Lower",
  "level": 2,
  "upgradeable": "Armor_004_Lower",
  "dyeable": true
 },
 "Armor_004_Lower": {
  "base": "Armor_001_Lower",
  "level": 3,
  "upgradeable": "Armor_015_Lower",
  "dyeable": true
 },
 "Armor_015_Lower": {
  "base": "Armor_001_Lower",
  "level": 4,
  "upgradeable": false,
  "dyeable": true
 },
 "Armor_005_Head": {
  "base": "Armor_005_Head",
  "level": 0,
  "upgradeable": "Armor_035_Head",
  "dyeable": true
 },
 "Armor_035_Head": {
  "base": "Armor_005_Head",
  "level": 1,
  "upgradeable": "Armor_039_Head",
  "dyeable": true
 },
 "Armor_039_Head": {
  "base": "Armor_005_Head",
  "level": 2,
  "upgradeable": "Armor_060_Head",
  "dyeable": true
 },
 "Armor_060_Head": {
  "base": "Armor_005_Head",
  "level": 3,
  "upgradeable": "Armor_061_Head",
  "dyeable": true
 },
 "Armor_061_Head": {
  "base": "Armor_005_Head",
  "level": 4,
  "upgradeable": false,
  "dyeable": true
 },
 "Armor_005_Upper": {
  "base": "Armor_005_Upper",
  "level": 0,
  "upgradeable": "Armor_035_Upper",
  "dyeable": true
 },
 "Armor_035_Upper": {
  "base": "Armor_005_Upper",
  "level": 1,
  "upgradeable": "Armor_039_Upper",
  "dyeable": true
 },
 "Armor_039_Upper": {
  "base": "Armor_005_Upper",
  "level": 2,
  "upgradeable": "Armor_060_Upper",
  "dyeable": true
 },
 "Armor_060_Upper": {
  "base": "Armor_005_Upper",
  "level": 3,
  "upgradeable": "Armor_061_Upper",
  "dyeable": true
 },
 "Armor_061_Upper": {
  "base": "Armor_005_Upper",
  "level": 4,
  "upgradeable": false,
  "dyeable": true
 },
 "Armor_005_Lower": {
  "base": "Armor_005_Lower",
  "level": 0,
  "upgradeable": "Armor_035_Lower",
  "dyeable": true
 },
 "Armor_035_Lower": {
  "base": "Armor_005_Lower",
  "level": 1,
  "upgradeable": "Armor_039_Lower",
  "dyeable": true
 },
 "Armor_039_Lower": {
  "base": "Armor_005_Lower",
  "level": 2,
  "upgradeable": "Armor_060_Lower",
  "dyeable": true
 },
 "Armor_060_Lower": {
  "base": "Armor_005_Lower",
  "level": 3,
  "upgradeable": "Armor_061_Lower",
  "dyeable": true
 },
 "Armor_061_Lower": {
  "base": "Armor_005_Lower",
  "level": 4,
  "upgradeable": false,
  "dyeable": true
 },
 "Armor_006_Head": {
  "base": "Armor_006_Head",
  "level": 0,
  "upgradeable": "Armor_007_Head",
  "dyeable": true
 },
 "Armor_007_Head": {
  "base": "Armor_006_Head",
  "level": 1,
  "upgradeable": "Armor_062_Head",
  "dyeable": true
 },
 "Armor_062_Head": {
  "base": "Armor_006_Head",
  "level": 2,
  "upgradeable": "Armor_063_Head",
  "dyeable": true
 },
 "Armor_063_Head": {
  "base": "Armor_006_Head",
  "level": 3,
  "upgradeable": "Armor_064_Head",
  "dyeable": true
 },
 "Armor_064_Head": {
  "base": "Armor_006_Head",
  "level": 4,
  "upgradeable": false,
  "dyeable": true
 },
 "Armor_006_Upper": {
  "base": "Armor_006_Upper",
  "level": 0,
  "upgradeable": "Armor_007_Upper",
  "dyeable": true
 },
 "Armor_007_Upper": {
  "base": "Armor_006_Upper",
  "level": 1,
  "upgradeable": "Armor_062_Upper",
  "dyeable": true
 },
 "Armor_062_Upper": {
  "base": "Armor_006_Upper",
  "level": 2,
  "upgradeable": "Armor_063_Upper",
  "dyeable": true
 },
 "Armor_063_Upper": {
  "base": "Armor_006_Upper",
  "level": 3,
  "upgradeable": "Armor_064_Upper",
  "dyeable": true
 },
 "Armor_064_Upper": {
  "base": "Armor_006_Upper",
  "level": 4,
  "upgradeable": false,
  "dyeable": true
 },
 "Armor_006_Lower": {
  "base": "Armor_006_Lower",
  "level": 0,
  "upgradeable": "Armor_007_Lower",
  "dyeable": true
 },
 "Armor_007_Lower": {
  "base": "Armor_006_Lower",
  "level": 1,
  "upgradeable": "Armor_062_Lower",
  "dyeable": true
 },
 "Armor_062_Lower": {
  "base": "Armor_006_Lower",
  "level": 2,
  "upgradeable": "Armor_063_Lower",
  "dyeable": true
 },
 "Armor_063_Lower": {
  "base": "Armor_006_Lower",
  "level": 3,
  "upgradeable": "Armor_064_Lower",
  "dyeable": true
 },
 "Armor_064_Lower": {
  "base": "Armor_006_Lower",
  "level": 4,
  "upgradeable": false,
  "dyeable": true
 },
 "Armor_008_Head": {
  "base": "Armor_008_Head",
  "level": 0,
  "upgradeable": "Armor_040_Head",
  "dyeable": true
 },
 "Armor_040_Head": {
  "base": "Armor_008_Head",
  "level": 1,
  "upgradeable": "Armor_065_Head",
  "dyeable": true
 },
 "Armor_065_Head": {
  "base": "Armor_008_Head",
  "level": 2,
  "upgradeable": "Armor_066_Head",
  "dyeable": true
 },
 "Armor_066_Head": {
  "base": "Armor_008_Head",
  "level": 3,
  "upgradeable": "Armor_067_Head",
  "dyeable": true
 },
 "Armor_067_Head": {
  "base": "Armor_008_Head",
  "level": 4,
  "upgradeable": false,
  "dyeable": true
 },
 "Armor_008_Upper": {
  "base": "Armor_008_Upper",
  "level": 0,
  "upgradeable": "Armor_040_Upper",
  "dyeable": true
 },
 "Armor_040_Upper": {
  "base": "Armor_008_Upper",
  "level": 1,
  "upgradeable": "Armor_065_Upper",
  "dyeable": true
 },
 "Armor_065_Upper": {
  "base": "Armor_008_Upper",
  "level": 2,
  "upgradeable": "Armor_066_Upper",
  "dyeable": true
 },
 "Armor_066_Upper": {
  "base": "Armor_008_Upper",
  "level": 3,
  "upgradeable": "Armor_067_Upper",
  "dyeable": true
 },
 "Armor_067_Upper": {
  "base": "Armor_008_Upper",
  "level": 4,
  "upgradeable": false,
  "dyeable": true
 },
 "Armor_008_Lower": {
  "base": "Armor_008_Lower",
  "level": 0,
  "upgradeable": "Armor_040_Lower",
  "dyeable": true
 },
 "Armor_040_Lower": {
  "base": "Armor_008_Lower",
  "level": 1,
  "upgradeable": "Armor_065_Lower",
  "dyeable": true
 },
 "Armor_065_Lower": {
  "base": "Armor_008_Lower",
  "level": 2,
  "upgradeable": "Armor_066_Lower",
  "dyeable": true
 },
 "Armor_066_Lower": {
  "base": "Armor_008_Lower",
  "level": 3,
  "upgradeable": "Armor_067_Lower",
  "dyeable": true
 },
 "Armor_067_Lower": {
  "base": "Armor_008_Lower",
  "level": 4,
  "upgradeable": false,
  "dyeable": true
 },
 "Armor_009_Head": {
  "base": "Armor_009_Head",
  "level": 0,
  "upgradeable": "Armor_036_Head",
  "dyeable": true
 },
 "Armor_036_Head": {
  "base": "Armor_009_Head",
  "level": 1,
  "upgradeable": "Armor_071_Head",
  "dyeable": true
 },
 "Armor_071_Head": {
  "base": "Armor_009_Head",
  "level": 2,
  "upgradeable": "Armor_072_Head",
  "dyeable": true
 },
 "Armor_072_Head": {
  "base": "Armor_009_Head",
  "level": 3,
  "upgradeable": "Armor_073_Head",
  "dyeable": true
 },
 "Armor_073_Head": {
  "base": "Armor_009_Head",
  "level": 4,
  "upgradeable": false,
  "dyeable": true
 },
 "Armor_009_Upper": {
  "base": "Armor_009_Upper",
  "level": 0,
  "upgradeable": "Armor_036_Upper",
  "dyeable": true
 },
 "Armor_036_Upper": {
  "base": "Armor_009_Upper",
  "level": 1,
  "upgradeable": "Armor_071_Upper",
  "dyeable": true
 },
 "Armor_071_Upper": {
  "base": "Armor_009_Upper",
  "level": 2,
  "upgradeable": "Armor_072_Upper",
  "dyeable": true
 },
 "Armor_072_Upper": {
  "base": "Armor_009_Upper",
  "level": 3,
  "upgradeable": "Armor_073_Upper",
  "dyeable": true
 },
 "Armor_073_Upper": {
  "base": "Armor_009_Upper",
  "level": 4,
  "upgradeable": false,
  "dyeable": true
 },
 "Armor_009_Lower": {
  "base": "Armor_009_Lower",
  "level": 0,
  "upgradeable": "Armor_036_Lower",
  "dyeable": true
 },
 "Armor_036_Lower": {
  "base": "Armor_009_Lower",
  "level": 1,
  "upgradeable": "Armor_071_Lower",
  "dyeable": true
 },
 "Armor_071_Lower": {
  "base": "Armor_009_Lower",
  "level": 2,
  "upgradeable": "Armor_072_Lower",
  "dyeable": true
 },
 "Armor_072_Lower": {
  "base": "Armor_009_Lower",
  "level": 3,
  "upgradeable": "Armor_073_Lower",
  "dyeable": true
 },
 "Armor_073_Lower": {
  "base": "Armor_009_Lower",
  "level": 4,
  "upgradeable": false,
  "dyeable": true
 },
 "Armor_011_Head": {
  "base": "Armor_011_Head",
  "level": 0,
  "upgradeable": "Armor_037_Head",
  "dyeable": true
 },
 "Armor_037_Head": {
  "base": "Armor_011_Head",
  "level": 1,
  "upgradeable": "Armor_074_Head",
  "dyeable": true
 },
 "Armor_074_Head": {
  "base": "Armor_011_Head",
  "level": 2,
  "upgradeable": "Armor_075_Head",
  "dyeable": true
 },
 "Armor_075_Head": {
  "base": "Armor_011_Head",
  "level": 3,
  "upgradeable": "Armor_076_Head",
  "dyeable": true
 },
 "Armor_076_Head": {
  "base": "Armor_011_Head",
  "level": 4,
  "upgradeable": false,
  "dyeable": true
 },
 "Armor_011_Upper": {
  "base": "Armor_011_Upper",
  "level": 0,
  "upgradeable": "Armor_037_Upper",
  "dyeable": true
 },
 "Armor_037_Upper": {
  "base": "Armor_011_Upper",
  "level": 1,
  "upgradeable": "Armor_074_Upper",
  "dyeable": true
 },
 "Armor_074_Upper": {
  "base": "Armor_011_Upper",
  "level": 2,
  "upgradeable": "Armor_075_Upper",
  "dyeable": true
 },
 "Armor_075_Upper": {
  "base": "Armor_011_Upper",
  "level": 3,
  "upgradeable": "Armor_076_Upper",
  "dyeable": true
 },
 "Armor_076_Upper": {
  "base": "Armor_011_Upper",
  "level": 4,
  "upgradeable": false,
  "dyeable": true
 },
 "Armor_011_Lower": {
  "base": "Armor_011_Lower",
  "level": 0,
  "upgradeable": "Armor_037_Lower",
  "dyeable": true
 },
 "Armor_037_Lower": {
  "base": "Armor_011_Lower",
  "level": 1,
  "upgradeable": "Armor_074_Lower",
  "dyeable": true
 },
 "Armor_074_Lower": {
  "base": "Armor_011_Lower",
  "level": 2,
  "upgradeable": "Armor_075_Lower",
  "dyeable": true
 },
 "Armor_075_Lower": {
  "base": "Armor_011_Lower",
  "level": 3,
  "upgradeable": "Armor_076_Lower",
  "dyeable": true
 },
 "Armor_076_Lower": {
  "base": "Armor_011_Lower",
  "level": 4,
  "upgradeable": false,
  "dyeable": true
 },
 "Armor_012_Head": {
  "base": "Armor_012_Head",
  "level": 0,
  "upgradeable": "Armor_042_Head",
  "dyeable": true
 },
 "Armor_042_Head": {
  "base": "Armor_012_Head",
  "level": 1,
  "upgradeable": "Armor_077_Head",
  "dyeable": true
 },
 "Armor_077_Head": {
  "base": "Armor_012_Head",
  "level": 2,
  "upgradeable": "Armor_078_Head",
  "dyeable": true
 },
 "Armor_078_Head": {
  "base": "Armor_012_Head",
  "level": 3,
  "upgradeable": "Armor_079_Head",
  "dyeable": true
 },
 "Armor_079_Head": {
  "base": "Armor_012_Head",
  "level": 4,
  "upgradeable": false,
  "dyeable": true
 },
 "Armor_012_Upper": {
  "base": "Armor_012_Upper",
  "level": 0,
  "upgradeable": "Armor_042_Upper",
  "dyeable": true
 },
 "Armor_042_Upper": {
  "base": "Armor_012_Upper",
  "level": 1,
  "upgradeable": "Armor_077_Upper",
  "dyeable": true
 },
 "Armor_077_Upper": {
  "base": "Armor_012_Upper",
  "level": 2,
  "upgradeable": "Armor_078_Upper",
  "dyeable": true
 },
 "Armor_078_Upper": {
  "base": "Armor_012_Upper",
  "level": 3,
  "upgradeable": "Armor_079_Upper",
  "dyeable": true
 },
 "Armor_079_Upper": {
  "base": "Armor_012_Upper",
  "level": 4,
  "upgradeable": false,
  "dyeable": true
 },
 "Armor_012_Lower": {
  "base": "Armor_012_Lower",
  "level": 0,
  "upgradeable": "Armor_042_Lower",
  "dyeable": true
 },
 "Armor_042_Lower": {
  "base": "Armor_012_Lower",
  "level": 1,
  "upgradeable": "Armor_077_Lower",
  "dyeable": true
 },
 "Armor_077_Lower": {
  "base": "Armor_012_Lower",
  "level": 2,
  "upgradeable": "Armor_078_Lower",
  "dyeable": true
 },
 "Armor_078_Lower": {
  "base": "Armor_012_Lower",
  "level": 3,
  "upgradeable": "Armor_079_Lower",
  "dyeable": true
 },
 "Armor_079_Lower": {
  "base": "Armor_012_Lower",
  "level": 4,
  "upgradeable": false,
  "dyeable": true
 },
 "Armor_014_Head": {
  "base": "Armor_014_Head",
  "level": 0,
  "upgradeable": "Armor_083_Head",
  "dyeable": true
 },
 "Armor_083_Head": {
  "base": "Armor_014_Head",
  "level": 1,
  "upgradeable": "Armor_084_Head",
  "dyeable": true
 },
 "Armor_084_Head": {
  "base": "Armor_014_Head",
  "level": 2,
  "upgradeable": "Armor_085_Head",
  "dyeable": true
 },
 "Armor_085_Head": {
  "base": "Armor_014_Head",
  "level": 3,
  "upgradeable": "Armor_086_Head",
  "dyeable": true
 },
 "Armor_086_Head": {
  "base": "Armor_014_Head",
  "level": 4,
  "upgradeable": false,
  "dyeable": true
 },
 "Armor_014_Upper": {
  "base": "Armor_014_Upper",
  "level": 0,
  "upgradeable": "Armor_083_Upper",
  "dyeable": true
 },
 "Armor_083_Upper": {
  "base": "Armor_014_Upper",
  "level": 1,
  "upgradeable": "Armor_084_Upper",
  "dyeable": true
 },
 "Armor_084_Upper": {
  "base": "Armor_014_Upper",
  "level": 2,
  "upgradeable": "Armor_085_Upper",
  "dyeable": true
 },
 "Armor_085_Upper": {
  "base": "Armor_014_Upper",
  "level": 3,
  "upgradeable": "Armor_086_Upper",
  "dyeable": true
 },
 "Armor_086_Upper": {
  "base": "Armor_014_Upper",
  "level": 4,
  "upgradeable": false,
  "dyeable": true
 },
 "Armor_014_Lower": {
  "base": "Armor_014_Lower",
  "level": 0,
  "upgradeable": "Armor_083_Lower",
  "dyeable": true
 },
 "Armor_083_Lower": {
  "base": "Armor_014_Lower",
  "level": 1,
  "upgradeable": "Armor_084_Lower",
  "dyeable": true
 },
 "Armor_084_Lower": {
  "base": "Armor_014_Lower",
  "level": 2,
  "upgradeable": "Armor_085_Lower",
  "dyeable": true
 },
 "Armor_085_Lower": {
  "base": "Armor_014_Lower",
  "level": 3,
  "upgradeable": "Armor_086_Lower",
  "dyeable": true
 },
 "Armor_086_Lower": {
  "base": "Armor_014_Lower",
  "level": 4,
  "upgradeable": false,
  "dyeable": true
 },
 "Armor_017_Head": {
  "base": "Armor_017_Head",
  "level": 0,
  "upgradeable": "Armor_087_Head",
  "dyeable": true
 },
 "Armor_087_Head": {
  "base": "Armor_017_Head",
  "level": 1,
  "upgradeable": "Armor_088_Head",
  "dyeable": true
 },
 "Armor_088_Head": {
  "base": "Armor_017_Head",
  "level": 2,
  "upgradeable": "Armor_089_Head",
  "dyeable": true
 },
 "Armor_089_Head": {
  "base": "Armor_017_Head",
  "level": 3,
  "upgradeable": "Armor_090_Head",
  "dyeable": true
 },
 "Armor_090_Head": {
  "base": "Armor_017_Head",
  "level": 4,
  "upgradeable": false,
  "dyeable": true
 },
 "Armor_017_Upper": {
  "base": "Armor_017_Upper",
  "level": 0,
  "upgradeable": "Armor_087_Upper",
  "dyeable": true
 },
 "Armor_087_Upper": {
  "base": "Armor_017_Upper",
  "level": 1,
  "upgradeable": "Armor_088_Upper",
  "dyeable": true
 },
 "Armor_088_Upper": {
  "base": "Armor_017_Upper",
  "level": 2,
  "upgradeable": "Armor_089_Upper",
  "dyeable": true
 },
 "Armor_089_Upper": {
  "base": "Armor_017_Upper",
  "level": 3,
  "upgradeable": "Armor_090_Upper",
  "dyeable": true
 },
 "Armor_090_Upper": {
  "base": "Armor_017_Upper",
  "level": 4,
  "upgradeable": false,
  "dyeable": true
 },
 "Armor_017_Lower": {
  "base": "Armor_017_Lower",
  "level": 0,
  "upgradeable": "Armor_087_Lower",
  "dyeable": true
 },
 "Armor_087_Lower": {
  "base": "Armor_017_Lower",
  "level": 1,
  "upgradeable": "Armor_088_Lower",
  "dyeable": true
 },
 "Armor_088_Lower": {
  "base": "Armor_017_Lower",
  "level": 2,
  "upgradeable": "Armor_089_Lower",
  "dyeable": true
 },
 "Armor_089_Lower": {
  "base": "Armor_017_Lower",
  "level": 3,
  "upgradeable": "Armor_090_Lower",
  "dyeable": true
 },
 "Armor_090_Lower": {
  "base": "Armor_017_Lower",
  "level": 4,
  "upgradeable": false,
  "dyeable": true
 },
 "Armor_020_Head": {
  "base": "Armor_020_Head",
  "level": 0,
  "upgradeable": "Armor_095_Head",
  "dyeable": true
 },
 "Armor_095_Head": {
  "base": "Armor_020_Head",
  "level": 1,
  "upgradeable": "Armor_096_Head",
  "dyeable": true
 },
 "Armor_096_Head": {
  "base": "Armor_020_Head",
  "level": 2,
  "upgradeable": "Armor_097_Head",
  "dyeable": true
 },
 "Armor_097_Head": {
  "base": "Armor_020_Head",
  "level": 3,
  "upgradeable": "Armor_098_Head",
  "dyeable": true
 },
 "Armor_098_Head": {
  "base": "Armor_020_Head",
  "level": 4,
  "upgradeable": false,
  "dyeable": true
 },
 "Armor_020_Upper": {
  "base": "Armor_020_Upper",
  "level": 0,
  "upgradeable": "Armor_095_Upper",
  "dyeable": true
 },
 "Armor_095_Upper": {
  "base": "Armor_020_Upper",
  "level": 1,
  "upgradeable": "Armor_096_Upper",
  "dyeable": true
 },
 "Armor_096_Upper": {
  "base": "Armor_020_Upper",
  "level": 2,
  "upgradeable": "Armor_097_Upper",
  "dyeable": true
 },
 "Armor_097_Upper": {
  "base": "Armor_020_Upper",
  "level": 3,
  "upgradeable": "Armor_098_Upper",
  "dyeable": true
 },
 "Armor_098_Upper": {
  "base": "Armor_020_Upper",
  "level": 4,
  "upgradeable": false,
  "dyeable": true
 },
 "Armor_020_Lower": {
  "base": "Armor_020_Lower",
  "level": 0,
  "upgradeable": "Armor_095_Lower",
  "dyeable": true
 },
 "Armor_095_Lower": {
  "base": "Armor_020_Lower",
  "level": 1,
  "upgradeable": "Armor_096_Lower",
  "dyeable": true
 },
 "Armor_096_Lower": {
  "base": "Armor_020_Lower",
  "level": 2,
  "upgradeable": "Armor_097_Lower",
  "dyeable": true
 },
 "Armor_097_Lower": {
  "base": "Armor_020_Lower",
  "level": 3,
  "upgradeable": "Armor_098_Lower",
  "dyeable": true
 },
 "Armor_098_Lower": {
  "base": "Armor_020_Lower",
  "level": 4,
  "upgradeable": false,
  "dyeable": true
 },
 "Armor_024_Head": {
  "base": "Armor_024_Head",
  "level": 0,
  "upgradeable": "Armor_117_Head",
  "dyeable": false
 },
 "Armor_117_Head": {
  "base": "Armor_024_Head",
  "level": 1,
  "upgradeable": "Armor_118_Head",
  "dyeable": false
 },
 "Armor_118_Head": {
  "base": "Armor_024_Head",
  "level": 2,
  "upgradeable": "Armor_119_Head",
  "dyeable": false
 },
 "Armor_119_Head": {
  "base": "Armor_024_Head",
  "level": 3,
  "upgradeable": "Armor_120_Head",
  "dyeable": false
 },
 "Armor_120_Head": {
  "base": "Armor_024_Head",
  "level": 4,
  "upgradeable": false,
  "dyeable": false
 },
 "Armor_025_Head": {
  "base": "Armor_025_Head",
  "level": 0,
  "upgradeable": "Armor_121_Head",
  "dyeable": false
 },
 "Armor_121_Head": {
  "base": "Armor_025_Head",
  "level": 1,
  "upgradeable": "Armor_122_Head",
  "dyeable": false
 },
 "Armor_122_Head": {
  "base": "Armor_025_Head",
  "level": 2,
  "upgradeable": "Armor_123_Head",
  "dyeable": false
 },
 "Armor_123_Head": {
  "base": "Armor_025_Head",
  "level": 3,
  "upgradeable": "Armor_124_Head",
  "dyeable": false
 },
 "Armor_124_Head": {
  "base": "Armor_025_Head",
  "level": 4,
  "upgradeable": false,
  "dyeable": false
 },
 "Armor_026_Head": {
  "base": "Armor_026_Head",
  "level": 0,
  "upgradeable": "Armor_125_Head",
  "dyeable": false
 },
 "Armor_125_Head": {
  "base": "Armor_026_Head",
  "level": 1,
  "upgradeable": "Armor_126_Head",
  "dyeable": false
 },
 "Armor_126_Head": {
  "base": "Armor_026_Head",
  "level": 2,
  "upgradeable": "Armor_127_Head",
  "dyeable": false
 },
 "Armor_127_Head": {
  "base": "Armor_026_Head",
  "level": 3,
  "upgradeable": "Armor_128_Head",
  "dyeable": false
 },
 "Armor_128_Head": {
  "base": "Armor_026_Head",
  "level": 4,
  "upgradeable": false,
  "dyeable": false
 },
 "Armor_027_Head": {
  "base": "Armor_027_Head",
  "level": 0,
  "upgradeable": "Armor_129_Head",
  "dyeable": false
 },
 "Armor_129_Head": {
  "base": "Armor_027_Head",
  "level": 1,
  "upgradeable": "Armor_130_Head",
  "dyeable": false
 },
 "Armor_130_Head": {
  "base": "Armor_027_Head",
  "level": 2,
  "upgradeable": "Armor_131_Head",
  "dyeable": false
 },
 "Armor_131_Head": {
  "base": "Armor_027_Head",
  "level": 3,
  "upgradeable": "Armor_132_Head",
  "dyeable": false
 },
 "Armor_132_Head": {
  "base": "Armor_027_Head",
  "level": 4,
  "upgradeable": false,
  "dyeable": false
 },
 "Armor_028_Head": {
  "base": "Armor_028_Head",
  "level": 0,
  "upgradeable": "Armor_133_Head",
  "dyeable": false
 },
 "Armor_133_Head": {
  "base": "Armor_028_Head",
  "level": 1,
  "upgradeable": "Armor_134_Head",
  "dyeable": false
 },
 "Armor_134_Head": {
  "base": "Armor_028_Head",
  "level": 2,
  "upgradeable": "Armor_135_Head",
  "dyeable": false
 },
 "Armor_135_Head": {
  "base": "Armor_028_Head",
  "level": 3,
  "upgradeable": "Armor_136_Head",
  "dyeable": false
 },
 "Armor_136_Head": {
  "base": "Armor_028_Head",
  "level": 4,
  "upgradeable": false,
  "dyeable": false
 },
 "Armor_029_Head": {
  "base": "Armor_029_Head",
  "level": 0,
  "upgradeable": "Armor_137_Head",
  "dyeable": false
 },
 "Armor_137_Head": {
  "base": "Armor_029_Head",
  "level": 1,
  "upgradeable": "Armor_138_Head",
  "dyeable": false
 },
 "Armor_138_Head": {
  "base": "Armor_029_Head",
  "level": 2,
  "upgradeable": "Armor_139_Head",
  "dyeable": false
 },
 "Armor_139_Head": {
  "base": "Armor_029_Head",
  "level": 3,
  "upgradeable": "Armor_140_Head",
  "dyeable": false
 },
 "Armor_140_Head": {
  "base": "Armor_029_Head",
  "level": 4,
  "upgradeable": false,
  "dyeable": false
 },
 "Armor_046_Head": {
  "base": "Armor_046_Head",
  "level": 0,
  "upgradeable": "Armor_103_Head",
  "dyeable": true
 },
 "Armor_103_Head": {
  "base": "Armor_046_Head",
  "level": 1,
  "upgradeable": "Armor_104_Head",
  "dyeable": true
 },
 "Armor_104_Head": {
  "base": "Armor_046_Head",
  "level": 2,
  "upgradeable": "Armor_105_Head",
  "dyeable": true
 },
 "Armor_105_Head": {
  "base": "Armor_046_Head",
  "level": 3,
  "upgradeable": "Armor_106_Head",
  "dyeable": true
 },
 "Armor_106_Head": {
  "base": "Armor_046_Head",
  "level": 4,
  "upgradeable": false,
  "dyeable": true
 },
 "Armor_046_Upper": {
  "base": "Armor_046_Upper",
  "level": 0,
  "upgradeable": "Armor_103_Upper",
  "dyeable": true
 },
 "Armor_103_Upper": {
  "base": "Armor_046_Upper",
  "level": 1,
  "upgradeable": "Armor_104_Upper",
  "dyeable": true
 },
 "Armor_104_Upper": {
  "base": "Armor_046_Upper",
  "level": 2,
  "upgradeable": "Armor_105_Upper",
  "dyeable": true
 },
 "Armor_105_Upper": {
  "base": "Armor_046_Upper",
  "level": 3,
  "upgradeable": "Armor_106_Upper",
  "dyeable": true
 },
 "Armor_106_Upper": {
  "base": "Armor_046_Upper",
  "level": 4,
  "upgradeable": false,
  "dyeable": true
 },
 "Armor_046_Lower": {
  "base": "Armor_046_Lower",
  "level": 0,
  "upgradeable": "Armor_103_Lower",
  "dyeable": true
 },
 "Armor_103_Lower": {
  "base": "Armor_046_Lower",
  "level": 1,
  "upgradeable": "Armor_104_Lower",
  "dyeable": true
 },
 "Armor_104_Lower": {
  "base": "Armor_046_Lower",
  "level": 2,
  "upgradeable": "Armor_105_Lower",
  "dyeable": true
 },
 "Armor_105_Lower": {
  "base": "Armor_046_Lower",
  "level": 3,
  "upgradeable": "Armor_106_Lower",
  "dyeable": true
 },
 "Armor_106_Lower": {
  "base": "Armor_046_Lower",
  "level": 4,
  "upgradeable": false,
  "dyeable": true
 },
 "Armor_048_Head": {
  "base": "Armor_048_Head",
  "level": 0,
  "upgradeable": "Armor_111_Head",
  "dyeable": true
 },
 "Armor_111_Head": {
  "base": "Armor_048_Head",
  "level": 1,
  "upgradeable": "Armor_112_Head",
  "dyeable": true
 },
 "Armor_112_Head": {
  "base": "Armor_048_Head",
  "level": 2,
  "upgradeable": "Armor_113_Head",
  "dyeable": true
 },
 "Armor_113_Head": {
  "base": "Armor_048_Head",
  "level": 3,
  "upgradeable": "Armor_114_Head",
  "dyeable": true
 },
 "Armor_114_Head": {
  "base": "Armor_048_Head",
  "level": 4,
  "upgradeable": false,
  "dyeable": true
 },
 "Armor_048_Upper": {
  "base": "Armor_048_Upper",
  "level": 0,
  "upgradeable": "Armor_111_Upper",
  "dyeable": true
 },
 "Armor_111_Upper": {
  "base": "Armor_048_Upper",
  "level": 1,
  "upgradeable": "Armor_112_Upper",
  "dyeable": true
 },
 "Armor_112_Upper": {
  "base": "Armor_048_Upper",
  "level": 2,
  "upgradeable": "Armor_113_Upper",
  "dyeable": true
 },
 "Armor_113_Upper": {
  "base": "Armor_048_Upper",
  "level": 3,
  "upgradeable": "Armor_114_Upper",
  "dyeable": true
 },
 "Armor_114_Upper": {
  "base": "Armor_048_Upper",
  "level": 4,
  "upgradeable": false,
  "dyeable": true
 },
 "Armor_048_Lower": {
  "base": "Armor_048_Lower",
  "level": 0,
  "upgradeable": "Armor_111_Lower",
  "dyeable": true
 },
 "Armor_111_Lower": {
  "base": "Armor_048_Lower",
  "level": 1,
  "upgradeable": "Armor_112_Lower",
  "dyeable": true
 },
 "Armor_112_Lower": {
  "base": "Armor_048_Lower",
  "level": 2,
  "upgradeable": "Armor_113_Lower",
  "dyeable": true
 },
 "Armor_113_Lower": {
  "base": "Armor_048_Lower",
  "level": 3,
  "upgradeable": "Armor_114_Lower",
  "dyeable": true
 },
 "Armor_114_Lower": {
  "base": "Armor_048_Lower",
  "level": 4,
  "upgradeable": false,
  "dyeable": true
 },
 "Armor_049_Lower": {
  "base": "Armor_049_Lower",
  "level": 0,
  "upgradeable": "Armor_152_Lower",
  "dyeable": true
 },
 "Armor_152_Lower": {
  "base": "Armor_049_Lower",
  "level": 1,
  "upgradeable": "Armor_153_Lower",
  "dyeable": true
 },
 "Armor_153_Lower": {
  "base": "Armor_049_Lower",
  "level": 2,
  "upgradeable": "Armor_154_Lower",
  "dyeable": true
 },
 "Armor_154_Lower": {
  "base": "Armor_049_Lower",
  "level": 3,
  "upgradeable": "Armor_155_Lower",
  "dyeable": true
 },
 "Armor_155_Lower": {
  "base": "Armor_049_Lower",
  "level": 4,
  "upgradeable": false,
  "dyeable": true
 },
 "Armor_022_Head": {
  "base": "Armor_022_Head",
  "level": null,
  "upgradeable": false,
  "dyeable": false
 },
 "Armor_045_Head": {
  "base": "Armor_045_Head",
  "level": null,
  "upgradeable": false,
  "dyeable": false
 },
 "Armor_055_Head": {
  "base": "Armor_055_Head",
  "level": null,
  "upgradeable": false,
  "dyeable": false
 },
 "Armor_056_Head": {
  "base": "Armor_056_Head",
  "level": null,
  "upgradeable": false,
  "dyeable": false
 },
 "Armor_1125_Head": {
  "base": "Armor_1125_Head",
  "level": null,
  "upgradeable": false,
  "dyeable": false
 },
 "Armor_115_Head": {
  "base": "Armor_115_Head",
  "level": null,
  "upgradeable": false,
  "dyeable": false
 },
 "Armor_116_Upper": {
  "base": "Armor_116_Upper",
  "level": 0,
  "upgradeable": "Armor_148_Upper",
  "dyeable": false
 },
 "Armor_148_Upper": {
  "base": "Armor_116_Upper",
  "level": 1,
  "upgradeable": "Armor_149_Upper",
  "dyeable": false
 },
 "Armor_149_Upper": {
  "base": "Armor_116_Upper",
  "level": 2,
  "upgradeable": "Armor_150_Upper",
  "dyeable": false
 },
 "Armor_150_Upper": {
  "base": "Armor_116_Upper",
  "level": 3,
  "upgradeable": "Armor_151_Upper",
  "dyeable": false
 },
 "Armor_151_Upper": {
  "base": "Armor_116_Upper",
  "level": 4,
  "upgradeable": false,
  "dyeable": false
 },
 "Armor_141_Lower": {
  "base": "Armor_141_Lower",
  "level": 0,
  "upgradeable": "Armor_156_Lower",
  "dyeable": true
 },
 "Armor_156_Lower": {
  "base": "Armor_141_Lower",
  "level": 1,
  "upgradeable": "Armor_157_Lower",
  "dyeable": true
 },
 "Armor_157_Lower": {
  "base": "Armor_141_Lower",
  "level": 2,
  "upgradeable": "Armor_158_Lower",
  "dyeable": true
 },
 "Armor_158_Lower": {
  "base": "Armor_141_Lower",
  "level": 3,
  "upgradeable": "Armor_159_Lower",
  "dyeable": true
 },
 "Armor_159_Lower": {
  "base": "Armor_141_Lower",
  "level": 4,
  "upgradeable": false,
  "dyeable": true
 },
 "Armor_160_Head": {
  "base": "Armor_160_Head",
  "level": null,
  "upgradeable": false,
  "dyeable": false
 },
 "Armor_160_Upper": {
  "base": "Armor_160_Upper",
  "level": null,
  "upgradeable": false,
  "dyeable": false
 },
 "Armor_160_Lower": {
  "base": "Armor_160_Lower",
  "level": null,
  "upgradeable": false,
  "dyeable": false
 },
 "Armor_171_Head": {
  "base": "Armor_171_Head",
  "level": null,
  "upgradeable": false,
  "dyeable": false
 },
 "Armor_171_Upper": {
  "base": "Armor_171_Upper",
  "level": null,
  "upgradeable": false,
  "dyeable": false
 },
 "Armor_171_Lower": {
  "base": "Armor_171_Lower",
  "level": null,
  "upgradeable": false,
  "dyeable": false
 },
 "Armor_172_Head": {
  "base": "Armor_172_Head",
  "level": null,
  "upgradeable": false,
  "dyeable": false
 },
 "Armor_173_Head": {
  "base": "Armor_173_Head",
  "level": null,
  "upgradeable": false,
  "dyeable": false
 },
 "Armor_174_Head": {
  "base": "Armor_174_Head",
  "level": null,
  "upgradeable": false,
  "dyeable": false
 },
 "Armor_174_Upper": {
  "base": "Armor_174_Upper",
  "level": null,
  "upgradeable": false,
  "dyeable": false
 },
 "Armor_174_Lower": {
  "base": "Armor_174_Lower",
  "level": null,
  "upgradeable": false,
  "dyeable": false
 },
 "Armor_175_Upper": {
  "base": "Armor_175_Upper",
  "level": null,
  "upgradeable": false,
  "dyeable": false
 },
 "Armor_176_Head": {
  "base": "Armor_176_Head",
  "level": null,
  "upgradeable": false,
  "dyeable": false
 },
 "Armor_177_Head": {
  "base": "Armor_177_Head",
  "level": null,
  "upgradeable": false,
  "dyeable": false
 },
 "Armor_178_Head": {
  "base": "Armor_178_Head",
  "level": null,
  "upgradeable": false,
  "dyeable": false
 },
 "Armor_179_Head": {
  "base": "Armor_179_Head",
  "level": 0,
  "upgradeable": "Armor_1146_Head",
  "dyeable": false
 },
 "Armor_1146_Head": {
  "base": "Armor_179_Head",
  "level": 1,
  "upgradeable": "Armor_1147_Head",
  "dyeable": false
 },
 "Armor_1147_Head": {
  "base": "Armor_179_Head",
  "level": 2,
  "upgradeable": "Armor_1148_Head",
  "dyeable": false
 },
 "Armor_1148_Head": {
  "base": "Armor_179_Head",
  "level": 3,
  "upgradeable": "Armor_1149_Head",
  "dyeable": false
 },
 "Armor_1149_Head": {
  "base": "Armor_179_Head",
  "level": 4,
  "upgradeable": false,
  "dyeable": false
 },
 "Armor_179_Upper": {
  "base": "Armor_179_Upper",
  "level": 0,
  "upgradeable": "Armor_1146_Upper",
  "dyeable": false
 },
 "Armor_1146_Upper": {
  "base": "Armor_179_Upper",
  "level": 1,
  "upgradeable": "Armor_1147_Upper",
  "dyeable": false
 },
 "Armor_1147_Upper": {
  "base": "Armor_179_Upper",
  "level": 2,
  "upgradeable": "Armor_1148_Upper",
  "dyeable": false
 },
 "Armor_1148_Upper": {
  "base": "Armor_179_Upper",
  "level": 3,
  "upgradeable": "Armor_1149_Upper",
  "dyeable": false
 },
 "Armor_1149_Upper": {
  "base": "Armor_179_Upper",
  "level": 4,
  "upgradeable": false,
  "dyeable": false
 },
 "Armor_179_Lower": {
  "base": "Armor_179_Lower",
  "level": 0,
  "upgradeable": "Armor_1146_Lower",
  "dyeable": false
 },
 "Armor_1146_Lower": {
  "base": "Armor_179_Lower",
  "level": 1,
  "upgradeable": "Armor_1147_Lower",
  "dyeable": false
 },
 "Armor_1147_Lower": {
  "base": "Armor_179_Lower",
  "level": 2,
  "upgradeable": "Armor_1148_Lower",
  "dyeable": false
 },
 "Armor_1148_Lower": {
  "base": "Armor_179_Lower",
  "level": 3,
  "upgradeable": "Armor_1149_Lower",
  "dyeable": false
 },
 "Armor_1149_Lower": {
  "base": "Armor_179_Lower",
  "level": 4,
  "upgradeable": false,
  "dyeable": false
 },
 "Armor_180_Head": {
  "base": "Armor_180_Head",
  "level": null,
  "upgradeable": false,
  "dyeable": false
 },
 "Armor_180_Upper": {
  "base": "Armor_180_Upper",
  "level": null,
  "upgradeable": false,
  "dyeable": false
 },
 "Armor_180_Lower": {
  "base": "Armor_180_Lower",
  "level": null,
  "upgradeable": false,
  "dyeable": false
 },
 "Armor_181_Head": {
  "base": "Armor_181_Head",
  "level": 0,
  "upgradeable": "Armor_186_Head",
  "dyeable": true
 },
 "Armor_186_Head": {
  "base": "Armor_181_Head",
  "level": 1,
  "upgradeable": "Armor_187_Head",
  "dyeable": true
 },
 "Armor_187_Head": {
  "base": "Armor_181_Head",
  "level": 2,
  "upgradeable": "Armor_188_Head",
  "dyeable": true
 },
 "Armor_188_Head": {
  "base": "Armor_181_Head",
  "level": 3,
  "upgradeable": "Armor_189_Head",
  "dyeable": true
 },
 "Armor_189_Head": {
  "base": "Armor_181_Head",
  "level": 4,
  "upgradeable": false,
  "dyeable": true
 },
 "Armor_182_Head": {
  "base": "Armor_182_Head",
  "level": 0,
  "upgradeable": "Armor_190_Head",
  "dyeable": true
 },
 "Armor_190_Head": {
  "base": "Armor_182_Head",
  "level": 1,
  "upgradeable": "Armor_191_Head",
  "dyeable": true
 },
 "Armor_191_Head": {
  "base": "Armor_182_Head",
  "level": 2,
  "upgradeable": "Armor_192_Head",
  "dyeable": true
 },
 "Armor_192_Head": {
  "base": "Armor_182_Head",
  "level": 3,
  "upgradeable": "Armor_193_Head",
  "dyeable": true
 },
 "Armor_193_Head": {
  "base": "Armor_182_Head",
  "level": 4,
  "upgradeable": false,
  "dyeable": true
 },
 "Armor_183_Head": {
  "base": "Armor_183_Head",
  "level": 0,
  "upgradeable": "Armor_194_Head",
  "dyeable": true
 },
 "Armor_194_Head": {
  "base": "Armor_183_Head",
  "level": 1,
  "upgradeable": "Armor_195_Head",
  "dyeable": true
 },
 "Armor_195_Head": {
  "base": "Armor_183_Head",
  "level": 2,
  "upgradeable": "Armor_196_Head",
  "dyeable": true
 },
 "Armor_196_Head": {
  "base": "Armor_183_Head",
  "level": 3,
  "upgradeable": "Armor_197_Head",
  "dyeable": true
 },
 "Armor_197_Head": {
  "base": "Armor_183_Head",
  "level": 4,
  "upgradeable": false,
  "dyeable": true
 },
 "Armor_184_Head": {
  "base": "Armor_184_Head",
  "level": 0,
  "upgradeable": "Armor_198_Head",
  "dyeable": true
 },
 "Armor_198_Head": {
  "base": "Armor_184_Head",
  "level": 1,
  "upgradeable": "Armor_199_Head",
  "dyeable": true
 },
 "Armor_199_Head": {
  "base": "Armor_184_Head",
  "level": 2,
  "upgradeable": "Armor_168_Head",
  "dyeable": true
 },
 "Armor_168_Head": {
  "base": "Armor_184_Head",
  "level": 3,
  "upgradeable": "Armor_169_Head",
  "dyeable": true
 },
 "Armor_169_Head": {
  "base": "Armor_184_Head",
  "level": 4,
  "upgradeable": false,
  "dyeable": true
 },
 "Armor_200_Head": {
  "base": "Armor_200_Head",
  "level": 0,
  "upgradeable": "Armor_201_Head",
  "dyeable": false
 },
 "Armor_201_Head": {
  "base": "Armor_200_Head",
  "level": 1,
  "upgradeable": "Armor_202_Head",
  "dyeable": false
 },
 "Armor_202_Head": {
  "base": "Armor_200_Head",
  "level": 2,
  "upgradeable": "Armor_203_Head",
  "dyeable": false
 },
 "Armor_203_Head": {
  "base": "Armor_200_Head",
  "level": 3,
  "upgradeable": "Armor_204_Head",
  "dyeable": false
 },
 "Armor_204_Head": {
  "base": "Armor_200_Head",
  "level": 4,
  "upgradeable": false,
  "dyeable": false
 },
 "Armor_200_Upper": {
  "base": "Armor_200_Upper",
  "level": 0,
  "upgradeable": "Armor_201_Upper",
  "dyeable": false
 },
 "Armor_201_Upper": {
  "base": "Armor_200_Upper",
  "level": 1,
  "upgradeable": "Armor_202_Upper",
  "dyeable": false
 },
 "Armor_202_Upper": {
  "base": "Armor_200_Upper",
  "level": 2,
  "upgradeable": "Armor_203_Upper",
  "dyeable": false
 },
 "Armor_203_Upper": {
  "base": "Armor_200_Upper",
  "level": 3,
  "upgradeable": "Armor_204_Upper",
  "dyeable": false
 },
 "Armor_204_Upper": {
  "base": "Armor_200_Upper",
  "level": 4,
  "upgradeable": false,
  "dyeable": false
 },
 "Armor_200_Lower": {
  "base": "Armor_200_Lower",
  "level": 0,
  "upgradeable": "Armor_201_Lower",
  "dyeable": false
 },
 "Armor_201_Lower": {
  "base": "Armor_200_Lower",
  "level": 1,
  "upgradeable": "Armor_202_Lower",
  "dyeable": false
 },
 "Armor_202_Lower": {
  "base": "Armor_200_Lower",
  "level": 2,
  "upgradeable": "Armor_203_Lower",
  "dyeable": false
 },
 "Armor_203_Lower": {
  "base": "Armor_200_Lower",
  "level": 3,
  "upgradeable": "Armor_204_Lower",
  "dyeable": false
 },
 "Armor_204_Lower": {
  "base": "Armor_200_Lower",
  "level": 4,
  "upgradeable": false,
  "dyeable": false
 },
 "Armor_205_Head": {
  "base": "Armor_205_Head",
  "level": 0,
  "upgradeable": "Armor_206_Head",
  "dyeable": false
 },
 "Armor_206_Head": {
  "base": "Armor_205_Head",
  "level": 1,
  "upgradeable": "Armor_207_Head",
  "dyeable": false
 },
 "Armor_207_Head": {
  "base": "Armor_205_Head",
  "level": 2,
  "upgradeable": "Armor_208_Head",
  "dyeable": false
 },
 "Armor_208_Head": {
  "base": "Armor_205_Head",
  "level": 3,
  "upgradeable": "Armor_209_Head",
  "dyeable": false
 },
 "Armor_209_Head": {
  "base": "Armor_205_Head",
  "level": 4,
  "upgradeable": false,
  "dyeable": false
 },
 "Armor_205_Upper": {
  "base": "Armor_205_Upper",
  "level": 0,
  "upgradeable": "Armor_206_Upper",
  "dyeable": false
 },
 "Armor_206_Upper": {
  "base": "Armor_205_Upper",
  "level": 1,
  "upgradeable": "Armor_207_Upper",
  "dyeable": false
 },
 "Armor_207_Upper": {
  "base": "Armor_205_Upper",
  "level": 2,
  "upgradeable": "Armor_208_Upper",
  "dyeable": false
 },
 "Armor_208_Upper": {
  "base": "Armor_205_Upper",
  "level": 3,
  "upgradeable": "Armor_209_Upper",
  "dyeable": false
 },
 "Armor_209_Upper": {
  "base": "Armor_205_Upper",
  "level": 4,
  "upgradeable": false,
  "dyeable": false
 },
 "Armor_205_Lower": {
  "base": "Armor_205_Lower",
  "level": 0,
  "upgradeable": "Armor_206_Lower",
  "dyeable": false
 },
 "Armor_206_Lower": {
  "base": "Armor_205_Lower",
  "level": 1,
  "upgradeable": "Armor_207_Lower",
  "dyeable": false
 },
 "Armor_207_Lower": {
  "base": "Armor_205_Lower",
  "level": 2,
  "upgradeable": "Armor_208_Lower",
  "dyeable": false
 },
 "Armor_208_Lower": {
  "base": "Armor_205_Lower",
  "level": 3,
  "upgradeable": "Armor_209_Lower",
  "dyeable": false
 },
 "Armor_209_Lower": {
  "base": "Armor_205_Lower",
  "level": 4,
  "upgradeable": false,
  "dyeable": false
 },
 "Armor_210_Head": {
  "base": "Armor_210_Head",
  "level": 0,
  "upgradeable": "Armor_211_Head",
  "dyeable": false
 },
 "Armor_211_Head": {
  "base": "Armor_210_Head",
  "level": 1,
  "upgradeable": "Armor_212_Head",
  "dyeable": false
 },
 "Armor_212_Head": {
  "base": "Armor_210_Head",
  "level": 2,
  "upgradeable": "Armor_213_Head",
  "dyeable": false
 },
 "Armor_213_Head": {
  "base": "Armor_210_Head",
  "level": 3,
  "upgradeable": "Armor_214_Head",
  "dyeable": false
 },
 "Armor_214_Head": {
  "base": "Armor_210_Head",
  "level": 4,
  "upgradeable": false,
  "dyeable": false
 },
 "Armor_210_Upper": {
  "base": "Armor_210_Upper",
  "level": 0,
  "upgradeable": "Armor_211_Upper",
  "dyeable": false
 },
 "Armor_211_Upper": {
  "base": "Armor_210_Upper",
  "level": 1,
  "upgradeable": "Armor_212_Upper",
  "dyeable": false
 },
 "Armor_212_Upper": {
  "base": "Armor_210_Upper",
  "level": 2,
  "upgradeable": "Armor_213_Upper",
  "dyeable": false
 },
 "Armor_213_Upper": {
  "base": "Armor_210_Upper",
  "level": 3,
  "upgradeable": "Armor_214_Upper",
  "dyeable": false
 },
 "Armor_214_Upper": {
  "base": "Armor_210_Upper",
  "level": 4,
  "upgradeable": false,
  "dyeable": false
 },
 "Armor_210_Lower": {
  "base": "Armor_210_Lower",
  "level": 0,
  "upgradeable": "Armor_211_Lower",
  "dyeable": false
 },
 "Armor_211_Lower": {
  "base": "Armor_210_Lower",
  "level": 1,
  "upgradeable": "Armor_212_Lower",
  "dyeable": false
 },
 "Armor_212_Lower": {
  "base": "Armor_210_Lower",
  "level": 2,
  "upgradeable": "Armor_213_Lower",
  "dyeable": false
 },
 "Armor_213_Lower": {
  "base": "Armor_210_Lower",
  "level": 3,
  "upgradeable": "Armor_214_Lower",
  "dyeable": false
 },
 "Armor_214_Lower": {
  "base": "Armor_210_Lower",
  "level": 4,
  "upgradeable": false,
  "dyeable": false
 },
 "Armor_215_Head": {
  "base": "Armor_215_Head",
  "level": 0,
  "upgradeable": "Armor_216_Head",
  "dyeable": false
 },
 "Armor_216_Head": {
  "base": "Armor_215_Head",
  "level": 1,
  "upgradeable": "Armor_217_Head",
  "dyeable": false
 },
 "Armor_217_Head": {
  "base": "Armor_215_Head",
  "level": 2,
  "upgradeable": "Armor_218_Head",
  "dyeable": false
 },
 "Armor_218_Head": {
  "base": "Armor_215_Head",
  "level": 3,
  "upgradeable": "Armor_219_Head",
  "dyeable": false
 },
 "Armor_219_Head": {
  "base": "Armor_215_Head",
  "level": 4,
  "upgradeable": false,
  "dyeable": false
 },
 "Armor_215_Upper": {
  "base": "Armor_215_Upper",
  "level": 0,
  "upgradeable": "Armor_216_Upper",
  "dyeable": false
 },
 "Armor_216_Upper": {
  "base": "Armor_215_Upper",
  "level": 1,
  "upgradeable": "Armor_217_Upper",
  "dyeable": false
 },
 "Armor_217_Upper": {
  "base": "Armor_215_Upper",
  "level": 2,
  "upgradeable": "Armor_218_Upper",
  "dyeable": false
 },
 "Armor_218_Upper": {
  "base": "Armor_215_Upper",
  "level": 3,
  "upgradeable": "Armor_219_Upper",
  "dyeable": false
 },
 "Armor_219_Upper": {
  "base": "Armor_215_Upper",
  "level": 4,
  "upgradeable": false,
  "dyeable": false
 },
 "Armor_215_Lower": {
  "base": "Armor_215_Lower",
  "level": 0,
  "upgradeable": "Armor_216_Lower",
  "dyeable": false
 },
 "Armor_216_Lower": {
  "base": "Armor_215_Lower",
  "level": 1,
  "upgradeable": "Armor_217_Lower",
  "dyeable": false
 },
 "Armor_217_Lower": {
  "base": "Armor_215_Lower",
  "level": 2,
  "upgradeable": "Armor_218_Lower",
  "dyeable": false
 },
 "Armor_218_Lower": {
  "base": "Armor_215_Lower",
  "level": 3,
  "upgradeable": "Armor_219_Lower",
  "dyeable": false
 },
 "Armor_219_Lower": {
  "base": "Armor_215_Lower",
  "level": 4,
  "upgradeable": false,
  "dyeable": false
 },
 "Armor_220_Head": {
  "base": "Armor_220_Head",
  "level": 0,
  "upgradeable": "Armor_221_Head",
  "dyeable": false
 },
 "Armor_221_Head": {
  "base": "Armor_220_Head",
  "level": 1,
  "upgradeable": "Armor_222_Head",
  "dyeable": false
 },
 "Armor_222_Head": {
  "base": "Armor_220_Head",
  "level": 2,
  "upgradeable": "Armor_223_Head",
  "dyeable": false
 },
 "Armor_223_Head": {
  "base": "Armor_220_Head",
  "level": 3,
  "upgradeable": "Armor_224_Head",
  "dyeable": false
 },
 "Armor_224_Head": {
  "base": "Armor_220_Head",
  "level": 4,
  "upgradeable": false,
  "dyeable": false
 },
 "Armor_225_Head": {
  "base": "Armor_225_Head",
  "level": 0,
  "upgradeable": "Armor_226_Head",
  "dyeable": false
 },
 "Armor_226_Head": {
  "base": "Armor_225_Head",
  "level": 1,
  "upgradeable": "Armor_227_Head",
  "dyeable": false
 },
 "Armor_227_Head": {
  "base": "Armor_225_Head",
  "level": 2,
  "upgradeable": "Armor_228_Head",
  "dyeable": false
 },
 "Armor_228_Head": {
  "base": "Armor_225_Head",
  "level": 3,
  "upgradeable": "Armor_229_Head",
  "dyeable": false
 },
 "Armor_229_Head": {
  "base": "Armor_225_Head",
  "level": 4,
  "upgradeable": false,
  "dyeable": false
 },
 "Armor_225_Upper": {
  "base": "Armor_225_Upper",
  "level": 0,
  "upgradeable": "Armor_226_Upper",
  "dyeable": false
 },
 "Armor_226_Upper": {
  "base": "Armor_225_Upper",
  "level": 1,
  "upgradeable": "Armor_227_Upper",
  "dyeable": false
 },
 "Armor_227_Upper": {
  "base": "Armor_225_Upper",
  "level": 2,
  "upgradeable": "Armor_228_Upper",
  "dyeable": false
 },
 "Armor_228_Upper": {
  "base": "Armor_225_Upper",
  "level": 3,
  "upgradeable": "Armor_229_Upper",
  "dyeable": false
 },
 "Armor_229_Upper": {
  "base": "Armor_225_Upper",
  "level": 4,
  "upgradeable": false,
  "dyeable": false
 },
 "Armor_225_Lower": {
  "base": "Armor_225_Lower",
  "level": 0,
  "upgradeable": "Armor_226_Lower",
  "dyeable": false
 },
 "Armor_226_Lower": {
  "base": "Armor_225_Lower",
  "level": 1,
  "upgradeable": "Armor_227_Lower",
  "dyeable": false
 },
 "Armor_227_Lower": {
  "base": "Armor_225_Lower",
  "level": 2,
  "upgradeable": "Armor_228_Lower",
  "dyeable": false
 },
 "Armor_228_Lower": {
  "base": "Armor_225_Lower",
  "level": 3,
  "upgradeable": "Armor_229_Lower",
  "dyeable": false
 },
 "Armor_229_Lower": {
  "base": "Armor_225_Lower",
  "level": 4,
  "upgradeable": false,
  "dyeable": false
 },
 "Armor_230_Head": {
  "base": "Armor_230_Head",
  "level": 0,
  "upgradeable": "Armor_231_Head",
  "dyeable": false
 },
 "Armor_231_Head": {
  "base": "Armor_230_Head",
  "level": 1,
  "upgradeable": "Armor_232_Head",
  "dyeable": false
 },
 "Armor_232_Head": {
  "base": "Armor_230_Head",
  "level": 2,
  "upgradeable": "Armor_233_Head",
  "dyeable": false
 },
 "Armor_233_Head": {
  "base": "Armor_230_Head",
  "level": 3,
  "upgradeable": "Armor_234_Head",
  "dyeable": false
 },
 "Armor_234_Head": {
  "base": "Armor_230_Head",
  "level": 4,
  "upgradeable": false,
  "dyeable": false
 },
 "Armor_230_Upper": {
  "base": "Armor_230_Upper",
  "level": 0,
  "upgradeable": "Armor_231_Upper",
  "dyeable": false
 },
 "Armor_231_Upper": {
  "base": "Armor_230_Upper",
  "level": 1,
  "upgradeable": "Armor_232_Upper",
  "dyeable": false
 },
 "Armor_232_Upper": {
  "base": "Armor_230_Upper",
  "level": 2,
  "upgradeable": "Armor_233_Upper",
  "dyeable": false
 },
 "Armor_233_Upper": {
  "base": "Armor_230_Upper",
  "level": 3,
  "upgradeable": "Armor_234_Upper",
  "dyeable": false
 },
 "Armor_234_Upper": {
  "base": "Armor_230_Upper",
  "level": 4,
  "upgradeable": false,
  "dyeable": false
 },
 "Armor_230_Lower": {
  "base": "Armor_230_Lower",
  "level": 0,
  "upgradeable": "Armor_231_Lower",
  "dyeable": false
 },
 "Armor_231_Lower": {
  "base": "Armor_230_Lower",
  "level": 1,
  "upgradeable": "Armor_232_Lower",
  "dyeable": false
 },
 "Armor_232_Lower": {
  "base": "Armor_230_Lower",
  "level": 2,
  "upgradeable": "Armor_233_Lower",
  "dyeable": false
 },
 "Armor_233_Lower": {
  "base": "Armor_230_Lower",
  "level": 3,
  "upgradeable": "Armor_234_Lower",
  "dyeable": false
 },
 "Armor_234_Lower": {
  "base": "Armor_230_Lower",
  "level": 4,
  "upgradeable": false,
  "dyeable": false
 },
 "Armor_1006_Head": {
  "base": "Armor_1006_Head",
  "level": 0,
  "upgradeable": "Armor_1007_Head",
  "dyeable": true
 },
 "Armor_1007_Head": {
  "base": "Armor_1006_Head",
  "level": 1,
  "upgradeable": "Armor_1008_Head",
  "dyeable": true
 },
 "Armor_1008_Head": {
  "base": "Armor_1006_Head",
  "level": 2,
  "upgradeable": "Armor_1009_Head",
  "dyeable": true
 },
 "Armor_1009_Head": {
  "base": "Armor_1006_Head",
  "level": 3,
  "upgradeable": "Armor_1010_Head",
  "dyeable": true
 },
 "Armor_1010_Head": {
  "base": "Armor_1006_Head",
  "level": 4,
  "upgradeable": false,
  "dyeable": true
 },
 "Armor_1006_Upper": {
  "base": "Armor_1006_Upper",
  "level": 0,
  "upgradeable": "Armor_1007_Upper",
  "dyeable": true
 },
 "Armor_1007_Upper": {
  "base": "Armor_1006_Upper",
  "level": 1,
  "upgradeable": "Armor_1008_Upper",
  "dyeable": true
 },
 "Armor_1008_Upper": {
  "base": "Armor_1006_Upper",
  "level": 2,
  "upgradeable": "Armor_1009_Upper",
  "dyeable": true
 },
 "Armor_1009_Upper": {
  "base": "Armor_1006_Upper",
  "level": 3,
  "upgradeable": "Armor_1010_Upper",
  "dyeable": true
 },
 "Armor_1010_Upper": {
  "base": "Armor_1006_Upper",
  "level": 4,
  "upgradeable": false,
  "dyeable": true
 },
 "Armor_1006_Lower": {
  "base": "Armor_1006_Lower",
  "level": 0,
  "upgradeable": "Armor_1007_Lower",
  "dyeable": true
 },
 "Armor_1007_Lower": {
  "base": "Armor_1006_Lower",
  "level": 1,
  "upgradeable": "Armor_1008_Lower",
  "dyeable": true
 },
 "Armor_1008_Lower": {
  "base": "Armor_1006_Lower",
  "level": 2,
  "upgradeable": "Armor_1009_Lower",
  "dyeable": true
 },
 "Armor_1009_Lower": {
  "base": "Armor_1006_Lower",
  "level": 3,
  "upgradeable": "Armor_1010_Lower",
  "dyeable": true
 },
 "Armor_1010_Lower": {
  "base": "Armor_1006_Lower",
  "level": 4,
  "upgradeable": false,
  "dyeable": true
 },
 "Armor_1036_Head": {
  "base": "Armor_1036_Head",
  "level": 0,
  "upgradeable": "Armor_1037_Head",
  "dyeable": false
 },
 "Armor_1037_Head": {
  "base": "Armor_1036_Head",
  "level": 1,
  "upgradeable": "Armor_1038_Head",
  "dyeable": false
 },
 "Armor_1038_Head": {
  "base": "Armor_1036_Head",
  "level": 2,
  "upgradeable": "Armor_1039_Head",
  "dyeable": false
 },
 "Armor_1039_Head": {
  "base": "Armor_1036_Head",
  "level": 3,
  "upgradeable": "Armor_1040_Head",
  "dyeable": false
 },
 "Armor_1040_Head": {
  "base": "Armor_1036_Head",
  "level": 4,
  "upgradeable": false,
  "dyeable": false
 },
 "Armor_1043_Upper": {
  "base": "Armor_1043_Upper",
  "level": null,
  "upgradeable": false,
  "dyeable": true
 },
 "Armor_1043_Lower": {
  "base": "Armor_1043_Lower",
  "level": null,
  "upgradeable": false,
  "dyeable": true
 },
 "Armor_1044_Lower": {
  "base": "Armor_1044_Lower",
  "level": null,
  "upgradeable": false,
  "dyeable": true
 },
 "Armor_1046_Head": {
  "base": "Armor_1046_Head",
  "level": 0,
  "upgradeable": "Armor_1047_Head",
  "dyeable": true
 },
 "Armor_1047_Head": {
  "base": "Armor_1046_Head",
  "level": 1,
  "upgradeable": "Armor_1048_Head",
  "dyeable": true
 },
 "Armor_1048_Head": {
  "base": "Armor_1046_Head",
  "level": 2,
  "upgradeable": "Armor_1049_Head",
  "dyeable": true
 },
 "Armor_1049_Head": {
  "base": "Armor_1046_Head",
  "level": 3,
  "upgradeable": "Armor_1050_Head",
  "dyeable": true
 },
 "Armor_1050_Head": {
  "base": "Armor_1046_Head",
  "level": 4,
  "upgradeable": false,
  "dyeable": true
 },
 "Armor_1046_Upper": {
  "base": "Armor_1046_Upper",
  "level": 0,
  "upgradeable": "Armor_1047_Upper",
  "dyeable": true
 },
 "Armor_1047_Upper": {
  "base": "Armor_1046_Upper",
  "level": 1,
  "upgradeable": "Armor_1048_Upper",
  "dyeable": true
 },
 "Armor_1048_Upper": {
  "base": "Armor_1046_Upper",
  "level": 2,
  "upgradeable": "Armor_1049_Upper",
  "dyeable": true
 },
 "Armor_1049_Upper": {
  "base": "Armor_1046_Upper",
  "level": 3,
  "upgradeable": "Armor_1050_Upper",
  "dyeable": true
 },
 "Armor_1050_Upper": {
  "base": "Armor_1046_Upper",
  "level": 4,
  "upgradeable": false,
  "dyeable": true
 },
 "Armor_1046_Lower": {
  "base": "Armor_1046_Lower",
  "level": 0,
  "upgradeable": "Armor_1047_Lower",
  "dyeable": true
 },
 "Armor_1047_Lower": {
  "base": "Armor_1046_Lower",
  "level": 1,
  "upgradeable": "Armor_1048_Lower",
  "dyeable": true
 },
 "Armor_1048_Lower": {
  "base": "Armor_1046_Lower",
  "level": 2,
  "upgradeable": "Armor_1049_Lower",
  "dyeable": true
 },
 "Armor_1049_Lower": {
  "base": "Armor_1046_Lower",
  "level": 3,
  "upgradeable": "Armor_1050_Lower",
  "dyeable": true
 },
 "Armor_1050_Lower": {
  "base": "Armor_1046_Lower",
  "level": 4,
  "upgradeable": false,
  "dyeable": true
 },
 "Armor_1051_Head": {
  "base": "Armor_1051_Head",
  "level": 0,
  "upgradeable": "Armor_1052_Head",
  "dyeable": true
 },
 "Armor_1052_Head": {
  "base": "Armor_1051_Head",
  "level": 1,
  "upgradeable": "Armor_1053_Head",
  "dyeable": true
 },
 "Armor_1053_Head": {
  "base": "Armor_1051_Head",
  "level": 2,
  "upgradeable": "Armor_1054_Head",
  "dyeable": true
 },
 "Armor_1054_Head": {
  "base": "Armor_1051_Head",
  "level": 3,
  "upgradeable": "Armor_1055_Head",
  "dyeable": true
 },
 "Armor_1055_Head": {
  "base": "Armor_1051_Head",
  "level": 4,
  "upgradeable": false,
  "dyeable": true
 },
 "Armor_1051_Upper": {
  "base": "Armor_1051_Upper",
  "level": 0,
  "upgradeable": "Armor_1052_Upper",
  "dyeable": true
 },
 "Armor_1052_Upper": {
  "base": "Armor_1051_Upper",
  "level": 1,
  "upgradeable": "Armor_1053_Upper",
  "dyeable": true
 },
 "Armor_1053_Upper": {
  "base": "Armor_1051_Upper",
  "level": 2,
  "upgradeable": "Armor_1054_Upper",
  "dyeable": true
 },
 "Armor_1054_Upper": {
  "base": "Armor_1051_Upper",
  "level": 3,
  "upgradeable": "Armor_1055_Upper",
  "dyeable": true
 },
 "Armor_1055_Upper": {
  "base": "Armor_1051_Upper",
  "level": 4,
  "upgradeable": false,
  "dyeable": true
 },
 "Armor_1051_Lower": {
  "base": "Armor_1051_Lower",
  "level": 0,
  "upgradeable": "Armor_1052_Lower",
  "dyeable": true
 },
 "Armor_1052_Lower": {
  "base": "Armor_1051_Lower",
  "level": 1,
  "upgradeable": "Armor_1053_Lower",
  "dyeable": true
 },
 "Armor_1053_Lower": {
  "base": "Armor_1051_Lower",
  "level": 2,
  "upgradeable": "Armor_1054_Lower",
  "dyeable": true
 },
 "Armor_1054_Lower": {
  "base": "Armor_1051_Lower",
  "level": 3,
  "upgradeable": "Armor_1055_Lower",
  "dyeable": true
 },
 "Armor_1055_Lower": {
  "base": "Armor_1051_Lower",
  "level": 4,
  "upgradeable": false,
  "dyeable": true
 },
 "Armor_1061_Head": {
  "base": "Armor_1061_Head",
  "level": 0,
  "upgradeable": "Armor_1062_Head",
  "dyeable": true
 },
 "Armor_1062_Head": {
  "base": "Armor_1061_Head",
  "level": 1,
  "upgradeable": "Armor_1063_Head",
  "dyeable": true
 },
 "Armor_1063_Head": {
  "base": "Armor_1061_Head",
  "level": 2,
  "upgradeable": "Armor_1064_Head",
  "dyeable": true
 },
 "Armor_1064_Head": {
  "base": "Armor_1061_Head",
  "level": 3,
  "upgradeable": "Armor_1065_Head",
  "dyeable": true
 },
 "Armor_1065_Head": {
  "base": "Armor_1061_Head",
  "level": 4,
  "upgradeable": false,
  "dyeable": true
 },
 "Armor_1061_Upper": {
  "base": "Armor_1061_Upper",
  "level": 0,
  "upgradeable": "Armor_1062_Upper",
  "dyeable": true
 },
 "Armor_1062_Upper": {
  "base": "Armor_1061_Upper",
  "level": 1,
  "upgradeable": "Armor_1063_Upper",
  "dyeable": true
 },
 "Armor_1063_Upper": {
  "base": "Armor_1061_Upper",
  "level": 2,
  "upgradeable": "Armor_1064_Upper",
  "dyeable": true
 },
 "Armor_1064_Upper": {
  "base": "Armor_1061_Upper",
  "level": 3,
  "upgradeable": "Armor_1065_Upper",
  "dyeable": true
 },
 "Armor_1065_Upper": {
  "base": "Armor_1061_Upper",
  "level": 4,
  "upgradeable": false,
  "dyeable": true
 },
 "Armor_1061_Lower": {
  "base": "Armor_1061_Lower",
  "level": 0,
  "upgradeable": "Armor_1062_Lower",
  "dyeable": true
 },
 "Armor_1062_Lower": {
  "base": "Armor_1061_Lower",
  "level": 1,
  "upgradeable": "Armor_1063_Lower",
  "dyeable": true
 },
 "Armor_1063_Lower": {
  "base": "Armor_1061_Lower",
  "level": 2,
  "upgradeable": "Armor_1064_Lower",
  "dyeable": true
 },
 "Armor_1064_Lower": {
  "base": "Armor_1061_Lower",
  "level": 3,
  "upgradeable": "Armor_1065_Lower",
  "dyeable": true
 },
 "Armor_1065_Lower": {
  "base": "Armor_1061_Lower",
  "level": 4,
  "upgradeable": false,
  "dyeable": true
 },
 "Armor_1066_Head": {
  "base": "Armor_1066_Head",
  "level": 0,
  "upgradeable": "Armor_1067_Head",
  "dyeable": true
 },
 "Armor_1067_Head": {
  "base": "Armor_1066_Head",
  "level": 1,
  "upgradeable": "Armor_1068_Head",
  "dyeable": true
 },
 "Armor_1068_Head": {
  "base": "Armor_1066_Head",
  "level": 2,
  "upgradeable": "Armor_1069_Head",
  "dyeable": true
 },
 "Armor_1069_Head": {
  "base": "Armor_1066_Head",
  "level": 3,
  "upgradeable": "Armor_1070_Head",
  "dyeable": true
 },
 "Armor_1070_Head": {
  "base": "Armor_1066_Head",
  "level": 4,
  "upgradeable": false,
  "dyeable": true
 },
 "Armor_1066_Upper": {
  "base": "Armor_1066_Upper",
  "level": 0,
  "upgradeable": "Armor_1067_Upper",
  "dyeable": true
 },
 "Armor_1067_Upper": {
  "base": "Armor_1066_Upper",
  "level": 1,
  "upgradeable": "Armor_1068_Upper",
  "dyeable": true
 },
 "Armor_1068_Upper": {
  "base": "Armor_1066_Upper",
  "level": 2,
  "upgradeable": "Armor_1069_Upper",
  "dyeable": true
 },
 "Armor_1069_Upper": {
  "base": "Armor_1066_Upper",
  "level": 3,
  "upgradeable": "Armor_1070_Upper",
  "dyeable": true
 },
 "Armor_1070_Upper": {
  "base": "Armor_1066_Upper",
  "level": 4,
  "upgradeable": false,
  "dyeable": true
 },
 "Armor_1066_Lower": {
  "base": "Armor_1066_Lower",
  "level": 0,
  "upgradeable": "Armor_1067_Lower",
  "dyeable": true
 },
 "Armor_1067_Lower": {
  "base": "Armor_1066_Lower",
  "level": 1,
  "upgradeable": "Armor_1068_Lower",
  "dyeable": true
 },
 "Armor_1068_Lower": {
  "base": "Armor_1066_Lower",
  "level": 2,
  "upgradeable": "Armor_1069_Lower",
  "dyeable": true
 },
 "Armor_1069_Lower": {
  "base": "Armor_1066_Lower",
  "level": 3,
  "upgradeable": "Armor_1070_Lower",
  "dyeable": true
 },
 "Armor_1070_Lower": {
  "base": "Armor_1066_Lower",
  "level": 4,
  "upgradeable": false,
  "dyeable": true
 },
 "Armor_1071_Head": {
  "base": "Armor_1071_Head",
  "level": 0,
  "upgradeable": "Armor_1072_Head",
  "dyeable": true
 },
 "Armor_1072_Head": {
  "base": "Armor_1071_Head",
  "level": 1,
  "upgradeable": "Armor_1073_Head",
  "dyeable": true
 },
 "Armor_1073_Head": {
  "base": "Armor_1071_Head",
  "level": 2,
  "upgradeable": "Armor_1074_Head",
  "dyeable": true
 },
 "Armor_1074_Head": {
  "base": "Armor_1071_Head",
  "level": 3,
  "upgradeable": "Armor_1075_Head",
  "dyeable": true
 },
 "Armor_1075_Head": {
  "base": "Armor_1071_Head",
  "level": 4,
  "upgradeable": false,
  "dyeable": true
 },
 "Armor_1071_Upper": {
  "base": "Armor_1071_Upper",
  "level": 0,
  "upgradeable": "Armor_1072_Upper",
  "dyeable": true
 },
 "Armor_1072_Upper": {
  "base": "Armor_1071_Upper",
  "level": 1,
  "upgradeable": "Armor_1073_Upper",
  "dyeable": true
 },
 "Armor_1073_Upper": {
  "base": "Armor_1071_Upper",
  "level": 2,
  "upgradeable": "Armor_1074_Upper",
  "dyeable": true
 },
 "Armor_1074_Upper": {
  "base": "Armor_1071_Upper",
  "level": 3,
  "upgradeable": "Armor_1075_Upper",
  "dyeable": true
 },
 "Armor_1075_Upper": {
  "base": "Armor_1071_Upper",
  "level": 4,
  "upgradeable": false,
  "dyeable": true
 },
 "Armor_1071_Lower": {
  "base": "Armor_1071_Lower",
  "level": 0,
  "upgradeable": "Armor_1072_Lower",
  "dyeable": true
 },
 "Armor_1072_Lower": {
  "base": "Armor_1071_Lower",
  "level": 1,
  "upgradeable": "Armor_1073_Lower",
  "dyeable": true
 },
 "Armor_1073_Lower": {
  "base": "Armor_1071_Lower",
  "level": 2,
  "upgradeable": "Armor_1074_Lower",
  "dyeable": true
 },
 "Armor_1074_Lower": {
  "base": "Armor_1071_Lower",
  "level": 3,
  "upgradeable": "Armor_1075_Lower",
  "dyeable": true
 },
 "Armor_1075_Lower": {
  "base": "Armor_1071_Lower",
  "level": 4,
  "upgradeable": false,
  "dyeable": true
 },
 "Armor_1076_Head": {
  "base": "Armor_1076_Head",
  "level": null,
  "upgradeable": false,
  "dyeable": false
 },
 "Armor_1086_Head": {
  "base": "Armor_1086_Head",
  "level": null,
  "upgradeable": false,
  "dyeable": true
 },
 "Armor_1086_Upper": {
  "base": "Armor_1086_Upper",
  "level": null,
  "upgradeable": false,
  "dyeable": true
 },
 "Armor_1086_Lower": {
  "base": "Armor_1086_Lower",
  "level": null,
  "upgradeable": false,
  "dyeable": true
 },
 "Armor_1091_Head": {
  "base": "Armor_1091_Head",
  "level": 0,
  "upgradeable": "Armor_1092_Head",
  "dyeable": true
 },
 "Armor_1092_Head": {
  "base": "Armor_1091_Head",
  "level": 1,
  "upgradeable": "Armor_1093_Head",
  "dyeable": true
 },
 "Armor_1093_Head": {
  "base": "Armor_1091_Head",
  "level": 2,
  "upgradeable": "Armor_1094_Head",
  "dyeable": true
 },
 "Armor_1094_Head": {
  "base": "Armor_1091_Head",
  "level": 3,
  "upgradeable": "Armor_1095_Head",
  "dyeable": true
 },
 "Armor_1095_Head": {
  "base": "Armor_1091_Head",
  "level": 4,
  "upgradeable": false,
  "dyeable": true
 },
 "Armor_1091_Upper": {
  "base": "Armor_1091_Upper",
  "level": 0,
  "upgradeable": "Armor_1092_Upper",
  "dyeable": true
 },
 "Armor_1092_Upper": {
  "base": "Armor_1091_Upper",
  "level": 1,
  "upgradeable": "Armor_1093_Upper",
  "dyeable": true
 },
 "Armor_1093_Upper": {
  "base": "Armor_1091_Upper",
  "level": 2,
  "upgradeable": "Armor_1094_Upper",
  "dyeable": true
 },
 "Armor_1094_Upper": {
  "base": "Armor_1091_Upper",
  "level": 3,
  "upgradeable": "Armor_1095_Upper",
  "dyeable": true
 },
 "Armor_1095_Upper": {
  "base": "Armor_1091_Upper",
  "level": 4,
  "upgradeable": false,
  "dyeable": true
 },
 "Armor_1091_Lower": {
  "base": "Armor_1091_Lower",
  "level": 0,
  "upgradeable": "Armor_1092_Lower",
  "dyeable": true
 },
 "Armor_1092_Lower": {
  "base": "Armor_1091_Lower",
  "level": 1,
  "upgradeable": "Armor_1093_Lower",
  "dyeable": true
 },
 "Armor_1093_Lower": {
  "base": "Armor_1091_Lower",
  "level": 2,
  "upgradeable": "Armor_1094_Lower",
  "dyeable": true
 },
 "Armor_1094_Lower": {
  "base": "Armor_1091_Lower",
  "level": 3,
  "upgradeable": "Armor_1095_Lower",
  "dyeable": true
 },
 "Armor_1095_Lower": {
  "base": "Armor_1091_Lower",
  "level": 4,
  "upgradeable": false,
  "dyeable": true
 },
 "Armor_1096_Head": {
  "base": "Armor_1096_Head",
  "level": 0,
  "upgradeable": "Armor_1097_Head",
  "dyeable": false
 },
 "Armor_1097_Head": {
  "base": "Armor_1096_Head",
  "level": 1,
  "upgradeable": "Armor_1098_Head",
  "dyeable": false
 },
 "Armor_1098_Head": {
  "base": "Armor_1096_Head",
  "level": 2,
  "upgradeable": "Armor_1099_Head",
  "dyeable": false
 },
 "Armor_1099_Head": {
  "base": "Armor_1096_Head",
  "level": 3,
  "upgradeable": "Armor_1100_Head",
  "dyeable": false
 },
 "Armor_1100_Head": {
  "base": "Armor_1096_Head",
  "level": 4,
  "upgradeable": false,
  "dyeable": false
 },
 "Armor_1096_Upper": {
  "base": "Armor_1096_Upper",
  "level": 0,
  "upgradeable": "Armor_1097_Upper",
  "dyeable": false
 },
 "Armor_1097_Upper": {
  "base": "Armor_1096_Upper",
  "level": 1,
  "upgradeable": "Armor_1098_Upper",
  "dyeable": false
 },
 "Armor_1098_Upper": {
  "base": "Armor_1096_Upper",
  "level": 2,
  "upgradeable": "Armor_1099_Upper",
  "dyeable": false
 },
 "Armor_1099_Upper": {
  "base": "Armor_1096_Upper",
  "level": 3,
  "upgradeable": "Armor_1100_Upper",
  "dyeable": false
 },
 "Armor_1100_Upper": {
  "base": "Armor_1096_Upper",
  "level": 4,
  "upgradeable": false,
  "dyeable": false
 },
 "Armor_1096_Lower": {
  "base": "Armor_1096_Lower",
  "level": 0,
  "upgradeable": "Armor_1097_Lower",
  "dyeable": false
 },
 "Armor_1097_Lower": {
  "base": "Armor_1096_Lower",
  "level": 1,
  "upgradeable": "Armor_1098_Lower",
  "dyeable": false
 },
 "Armor_1098_Lower": {
  "base": "Armor_1096_Lower",
  "level": 2,
  "upgradeable": "Armor_1099_Lower",
  "dyeable": false
 },
 "Armor_1099_Lower": {
  "base": "Armor_1096_Lower",
  "level": 3,
  "upgradeable": "Armor_1100_Lower",
  "dyeable": false
 },
 "Armor_1100_Lower": {
  "base": "Armor_1096_Lower",
  "level": 4,
  "upgradeable": false,
  "dyeable": false
 },
 "Armor_1106_Upper": {
  "base": "Armor_1106_Upper",
  "level": 0,
  "upgradeable": "Armor_1107_Upper",
  "dyeable": false
 },
 "Armor_1107_Upper": {
  "base": "Armor_1106_Upper",
  "level": 1,
  "upgradeable": "Armor_1108_Upper",
  "dyeable": false
 },
 "Armor_1108_Upper": {
  "base": "Armor_1106_Upper",
  "level": 2,
  "upgradeable": "Armor_1109_Upper",
  "dyeable": false
 },
 "Armor_1109_Upper": {
  "base": "Armor_1106_Upper",
  "level": 3,
  "upgradeable": "Armor_1110_Upper",
  "dyeable": false
 },
 "Armor_1110_Upper": {
  "base": "Armor_1106_Upper",
  "level": 4,
  "upgradeable": false,
  "dyeable": false
 },
 "Armor_1141_Head": {
  "base": "Armor_1141_Head",
  "level": 0,
  "upgradeable": "Armor_1142_Head",
  "dyeable": true
 },
 "Armor_1142_Head": {
  "base": "Armor_1141_Head",
  "level": 1,
  "upgradeable": "Armor_1143_Head",
  "dyeable": true
 },
 "Armor_1143_Head": {
  "base": "Armor_1141_Head",
  "level": 2,
  "upgradeable": "Armor_1144_Head",
  "dyeable": true
 },
 "Armor_1144_Head": {
  "base": "Armor_1141_Head",
  "level": 3,
  "upgradeable": "Armor_1145_Head",
  "dyeable": true
 },
 "Armor_1145_Head": {
  "base": "Armor_1141_Head",
  "level": 4,
  "upgradeable": false,
  "dyeable": true
 },
 "Armor_1141_Upper": {
  "base": "Armor_1141_Upper",
  "level": 0,
  "upgradeable": "Armor_1142_Upper",
  "dyeable": true
 },
 "Armor_1142_Upper": {
  "base": "Armor_1141_Upper",
  "level": 1,
  "upgradeable": "Armor_1143_Upper",
  "dyeable": true
 },
 "Armor_1143_Upper": {
  "base": "Armor_1141_Upper",
  "level": 2,
  "upgradeable": "Armor_1144_Upper",
  "dyeable": true
 },
 "Armor_1144_Upper": {
  "base": "Armor_1141_Upper",
  "level": 3,
  "upgradeable": "Armor_1145_Upper",
  "dyeable": true
 },
 "Armor_1145_Upper": {
  "base": "Armor_1141_Upper",
  "level": 4,
  "upgradeable": false,
  "dyeable": true
 },
 "Armor_1141_Lower": {
  "base": "Armor_1141_Lower",
  "level": 0,
  "upgradeable": "Armor_1142_Lower",
  "dyeable": true
 },
 "Armor_1142_Lower": {
  "base": "Armor_1141_Lower",
  "level": 1,
  "upgradeable": "Armor_1143_Lower",
  "dyeable": true
 },
 "Armor_1143_Lower": {
  "base": "Armor_1141_Lower",
  "level": 2,
  "upgradeable": "Armor_1144_Lower",
  "dyeable": true
 },
 "Armor_1144_Lower": {
  "base": "Armor_1141_Lower",
  "level": 3,
  "upgradeable": "Armor_1145_Lower",
  "dyeable": true
 },
 "Armor_1145_Lower": {
  "base": "Armor_1141_Lower",
  "level": 4,
  "upgradeable": false,
  "dyeable": true
 },
 "Armor_1151_Head": {
  "base": "Armor_1151_Head",
  "level": null,
  "upgradeable": false,
  "dyeable": false
 },
 "Armor_1300_Head": {
  "base": "Armor_1300_Head",
  "level": 0,
  "upgradeable": "Armor_1301_Head",
  "dyeable": true
 },
 "Armor_1301_Head": {
  "base": "Armor_1300_Head",
  "level": 1,
  "upgradeable": "Armor_1302_Head",
  "dyeable": true
 },
 "Armor_1302_Head": {
  "base": "Armor_1300_Head",
  "level": 2,
  "upgradeable": "Armor_1303_Head",
  "dyeable": true
 },
 "Armor_1303_Head": {
  "base": "Armor_1300_Head",
  "level": 3,
  "upgradeable": "Armor_1304_Head",
  "dyeable": true
 },
 "Armor_1304_Head": {
  "base": "Armor_1300_Head",
  "level": 4,
  "upgradeable": false,
  "dyeable": true
 },
 "Armor_1300_Upper": {
  "base": "Armor_1300_Upper",
  "level": 0,
  "upgradeable": "Armor_1301_Upper",
  "dyeable": true
 },
 "Armor_1301_Upper": {
  "base": "Armor_1300_Upper",
  "level": 1,
  "upgradeable": "Armor_1302_Upper",
  "dyeable": true
 },
 "Armor_1302_Upper": {
  "base": "Armor_1300_Upper",
  "level": 2,
  "upgradeable": "Armor_1303_Upper",
  "dyeable": true
 },
 "Armor_1303_Upper": {
  "base": "Armor_1300_Upper",
  "level": 3,
  "upgradeable": "Armor_1304_Upper",
  "dyeable": true
 },
 "Armor_1304_Upper": {
  "base": "Armor_1300_Upper",
  "level": 4,
  "upgradeable": false,
  "dyeable": true
 },
 "Armor_1300_Lower": {
  "base": "Armor_1300_Lower",
  "level": 0,
  "upgradeable": "Armor_1301_Lower",
  "dyeable": true
 },
 "Armor_1301_Lower": {
  "base": "Armor_1300_Lower",
  "level": 1,
  "upgradeable": "Armor_1302_Lower",
  "dyeable": true
 },
 "Armor_1302_Lower": {
  "base": "Armor_1300_Lower",
  "level": 2,
  "upgradeable": "Armor_1303_Lower",
  "dyeable": true
 },
 "Armor_1303_Lower": {
  "base": "Armor_1300_Lower",
  "level": 3,
  "upgradeable": "Armor_1304_Lower",
  "dyeable": true
 },
 "Armor_1304_Lower": {
  "base": "Armor_1300_Lower",
  "level": 4,
  "upgradeable": false,
  "dyeable": true
 },
 "Armor_1150_Upper": {
  "base": "Armor_1150_Upper",
  "level": null,
  "upgradeable": false,
  "dyeable": false
 },
 "Armor_1036_Lower": {
  "base": "Armor_1036_Lower",
  "level": 0,
  "upgradeable": "Armor_1037_Lower",
  "dyeable": false
 },
 "Armor_1036_Upper": {
  "base": "Armor_1036_Upper",
  "level": 0,
  "upgradeable": "Armor_1037_Upper",
  "dyeable": false
 },
 "Armor_1501_Upper": {
  "base": "Armor_1501_Upper",
  "level": null,
  "upgradeable": false,
  "dyeable": false
 },
 "Armor_999_Head": {
  "base": "Armor_999_Head",
  "level": null,
  "upgradeable": false,
  "dyeable": false
 }
};

export const ARMOR_AVAILABILITY: readonly string[] = [
 "Armor_001_Head",
 "Armor_002_Head",
 "Armor_003_Head",
 "Armor_004_Head",
 "Armor_015_Head",
 "Armor_1152_Head",
 "Armor_1153_Head",
 "Armor_1154_Head",
 "Armor_1155_Head",
 "Armor_1156_Head",
 "Armor_001_Upper",
 "Armor_002_Upper",
 "Armor_003_Upper",
 "Armor_004_Upper",
 "Armor_015_Upper",
 "Armor_001_Lower",
 "Armor_002_Lower",
 "Armor_003_Lower",
 "Armor_004_Lower",
 "Armor_015_Lower",
 "Armor_005_Head",
 "Armor_035_Head",
 "Armor_039_Head",
 "Armor_060_Head",
 "Armor_061_Head",
 "Armor_005_Upper",
 "Armor_035_Upper",
 "Armor_039_Upper",
 "Armor_060_Upper",
 "Armor_061_Upper",
 "Armor_005_Lower",
 "Armor_035_Lower",
 "Armor_039_Lower",
 "Armor_060_Lower",
 "Armor_061_Lower",
 "Armor_006_Head",
 "Armor_007_Head",
 "Armor_062_Head",
 "Armor_063_Head",
 "Armor_064_Head",
 "Armor_006_Upper",
 "Armor_007_Upper",
 "Armor_062_Upper",
 "Armor_063_Upper",
 "Armor_064_Upper",
 "Armor_006_Lower",
 "Armor_007_Lower",
 "Armor_062_Lower",
 "Armor_063_Lower",
 "Armor_064_Lower",
 "Armor_008_Head",
 "Armor_040_Head",
 "Armor_065_Head",
 "Armor_066_Head",
 "Armor_067_Head",
 "Armor_008_Upper",
 "Armor_040_Upper",
 "Armor_065_Upper",
 "Armor_066_Upper",
 "Armor_067_Upper",
 "Armor_008_Lower",
 "Armor_040_Lower",
 "Armor_065_Lower",
 "Armor_066_Lower",
 "Armor_067_Lower",
 "Armor_009_Head",
 "Armor_036_Head",
 "Armor_071_Head",
 "Armor_072_Head",
 "Armor_073_Head",
 "Armor_009_Upper",
 "Armor_036_Upper",
 "Armor_071_Upper",
 "Armor_072_Upper",
 "Armor_073_Upper",
 "Armor_009_Lower",
 "Armor_036_Lower",
 "Armor_071_Lower",
 "Armor_072_Lower",
 "Armor_073_Lower",
 "Armor_011_Head",
 "Armor_037_Head",
 "Armor_074_Head",
 "Armor_075_Head",
 "Armor_076_Head",
 "Armor_011_Upper",
 "Armor_037_Upper",
 "Armor_074_Upper",
 "Armor_075_Upper",
 "Armor_076_Upper",
 "Armor_011_Lower",
 "Armor_037_Lower",
 "Armor_074_Lower",
 "Armor_075_Lower",
 "Armor_076_Lower",
 "Armor_012_Head",
 "Armor_042_Head",
 "Armor_077_Head",
 "Armor_078_Head",
 "Armor_079_Head",
 "Armor_012_Upper",
 "Armor_042_Upper",
 "Armor_077_Upper",
 "Armor_078_Upper",
 "Armor_079_Upper",
 "Armor_012_Lower",
 "Armor_042_Lower",
 "Armor_077_Lower",
 "Armor_078_Lower",
 "Armor_079_Lower",
 "Armor_014_Head",
 "Armor_083_Head",
 "Armor_084_Head",
 "Armor_085_Head",
 "Armor_086_Head",
 "Armor_014_Upper",
 "Armor_083_Upper",
 "Armor_084_Upper",
 "Armor_085_Upper",
 "Armor_086_Upper",
 "Armor_014_Lower",
 "Armor_083_Lower",
 "Armor_084_Lower",
 "Armor_085_Lower",
 "Armor_086_Lower",
 "Armor_017_Head",
 "Armor_087_Head",
 "Armor_088_Head",
 "Armor_089_Head",
 "Armor_090_Head",
 "Armor_017_Upper",
 "Armor_087_Upper",
 "Armor_088_Upper",
 "Armor_089_Upper",
 "Armor_090_Upper",
 "Armor_017_Lower",
 "Armor_087_Lower",
 "Armor_088_Lower",
 "Armor_089_Lower",
 "Armor_090_Lower",
 "Armor_020_Head",
 "Armor_095_Head",
 "Armor_096_Head",
 "Armor_097_Head",
 "Armor_098_Head",
 "Armor_020_Upper",
 "Armor_095_Upper",
 "Armor_096_Upper",
 "Armor_097_Upper",
 "Armor_098_Upper",
 "Armor_020_Lower",
 "Armor_095_Lower",
 "Armor_096_Lower",
 "Armor_097_Lower",
 "Armor_098_Lower",
 "Armor_024_Head",
 "Armor_117_Head",
 "Armor_118_Head",
 "Armor_119_Head",
 "Armor_120_Head",
 "Armor_025_Head",
 "Armor_121_Head",
 "Armor_122_Head",
 "Armor_123_Head",
 "Armor_124_Head",
 "Armor_026_Head",
 "Armor_125_Head",
 "Armor_126_Head",
 "Armor_127_Head",
 "Armor_128_Head",
 "Armor_027_Head",
 "Armor_129_Head",
 "Armor_130_Head",
 "Armor_131_Head",
 "Armor_132_Head",
 "Armor_028_Head",
 "Armor_133_Head",
 "Armor_134_Head",
 "Armor_135_Head",
 "Armor_136_Head",
 "Armor_029_Head",
 "Armor_137_Head",
 "Armor_138_Head",
 "Armor_139_Head",
 "Armor_140_Head",
 "Armor_046_Head",
 "Armor_103_Head",
 "Armor_104_Head",
 "Armor_105_Head",
 "Armor_106_Head",
 "Armor_046_Upper",
 "Armor_103_Upper",
 "Armor_104_Upper",
 "Armor_105_Upper",
 "Armor_106_Upper",
 "Armor_046_Lower",
 "Armor_103_Lower",
 "Armor_104_Lower",
 "Armor_105_Lower",
 "Armor_106_Lower",
 "Armor_048_Head",
 "Armor_111_Head",
 "Armor_112_Head",
 "Armor_113_Head",
 "Armor_114_Head",
 "Armor_048_Upper",
 "Armor_111_Upper",
 "Armor_112_Upper",
 "Armor_113_Upper",
 "Armor_114_Upper",
 "Armor_048_Lower",
 "Armor_111_Lower",
 "Armor_112_Lower",
 "Armor_113_Lower",
 "Armor_114_Lower",
 "Armor_049_Lower",
 "Armor_152_Lower",
 "Armor_153_Lower",
 "Armor_154_Lower",
 "Armor_155_Lower",
 "Armor_022_Head",
 "Armor_045_Head",
 "Armor_055_Head",
 "Armor_056_Head",
 "Armor_1125_Head",
 "Armor_115_Head",
 "Armor_116_Upper",
 "Armor_148_Upper",
 "Armor_149_Upper",
 "Armor_150_Upper",
 "Armor_151_Upper",
 "Armor_141_Lower",
 "Armor_156_Lower",
 "Armor_157_Lower",
 "Armor_158_Lower",
 "Armor_159_Lower",
 "Armor_160_Head",
 "Armor_160_Upper",
 "Armor_160_Lower",
 "Armor_171_Head",
 "Armor_171_Upper",
 "Armor_171_Lower",
 "Armor_172_Head",
 "Armor_173_Head",
 "Armor_174_Head",
 "Armor_174_Upper",
 "Armor_174_Lower",
 "Armor_175_Upper",
 "Armor_176_Head",
 "Armor_177_Head",
 "Armor_178_Head",
 "Armor_179_Head",
 "Armor_1146_Head",
 "Armor_1147_Head",
 "Armor_1148_Head",
 "Armor_1149_Head",
 "Armor_179_Upper",
 "Armor_1146_Upper",
 "Armor_1147_Upper",
 "Armor_1148_Upper",
 "Armor_1149_Upper",
 "Armor_179_Lower",
 "Armor_1146_Lower",
 "Armor_1147_Lower",
 "Armor_1148_Lower",
 "Armor_1149_Lower",
 "Armor_180_Head",
 "Armor_180_Upper",
 "Armor_180_Lower",
 "Armor_181_Head",
 "Armor_186_Head",
 "Armor_187_Head",
 "Armor_188_Head",
 "Armor_189_Head",
 "Armor_182_Head",
 "Armor_190_Head",
 "Armor_191_Head",
 "Armor_192_Head",
 "Armor_193_Head",
 "Armor_183_Head",
 "Armor_194_Head",
 "Armor_195_Head",
 "Armor_196_Head",
 "Armor_197_Head",
 "Armor_184_Head",
 "Armor_198_Head",
 "Armor_199_Head",
 "Armor_168_Head",
 "Armor_169_Head",
 "Armor_200_Head",
 "Armor_201_Head",
 "Armor_202_Head",
 "Armor_203_Head",
 "Armor_204_Head",
 "Armor_200_Upper",
 "Armor_201_Upper",
 "Armor_202_Upper",
 "Armor_203_Upper",
 "Armor_204_Upper",
 "Armor_200_Lower",
 "Armor_201_Lower",
 "Armor_202_Lower",
 "Armor_203_Lower",
 "Armor_204_Lower",
 "Armor_205_Head",
 "Armor_206_Head",
 "Armor_207_Head",
 "Armor_208_Head",
 "Armor_209_Head",
 "Armor_205_Upper",
 "Armor_206_Upper",
 "Armor_207_Upper",
 "Armor_208_Upper",
 "Armor_209_Upper",
 "Armor_205_Lower",
 "Armor_206_Lower",
 "Armor_207_Lower",
 "Armor_208_Lower",
 "Armor_209_Lower",
 "Armor_210_Head",
 "Armor_211_Head",
 "Armor_212_Head",
 "Armor_213_Head",
 "Armor_214_Head",
 "Armor_210_Upper",
 "Armor_211_Upper",
 "Armor_212_Upper",
 "Armor_213_Upper",
 "Armor_214_Upper",
 "Armor_210_Lower",
 "Armor_211_Lower",
 "Armor_212_Lower",
 "Armor_213_Lower",
 "Armor_214_Lower",
 "Armor_215_Head",
 "Armor_216_Head",
 "Armor_217_Head",
 "Armor_218_Head",
 "Armor_219_Head",
 "Armor_215_Upper",
 "Armor_216_Upper",
 "Armor_217_Upper",
 "Armor_218_Upper",
 "Armor_219_Upper",
 "Armor_215_Lower",
 "Armor_216_Lower",
 "Armor_217_Lower",
 "Armor_218_Lower",
 "Armor_219_Lower",
 "Armor_220_Head",
 "Armor_221_Head",
 "Armor_222_Head",
 "Armor_223_Head",
 "Armor_224_Head",
 "Armor_225_Head",
 "Armor_226_Head",
 "Armor_227_Head",
 "Armor_228_Head",
 "Armor_229_Head",
 "Armor_225_Upper",
 "Armor_226_Upper",
 "Armor_227_Upper",
 "Armor_228_Upper",
 "Armor_229_Upper",
 "Armor_225_Lower",
 "Armor_226_Lower",
 "Armor_227_Lower",
 "Armor_228_Lower",
 "Armor_229_Lower",
 "Armor_230_Head",
 "Armor_231_Head",
 "Armor_232_Head",
 "Armor_233_Head",
 "Armor_234_Head",
 "Armor_230_Upper",
 "Armor_231_Upper",
 "Armor_232_Upper",
 "Armor_233_Upper",
 "Armor_234_Upper",
 "Armor_230_Lower",
 "Armor_231_Lower",
 "Armor_232_Lower",
 "Armor_233_Lower",
 "Armor_234_Lower",
 "Armor_1006_Head",
 "Armor_1007_Head",
 "Armor_1008_Head",
 "Armor_1009_Head",
 "Armor_1010_Head",
 "Armor_1006_Upper",
 "Armor_1007_Upper",
 "Armor_1008_Upper",
 "Armor_1009_Upper",
 "Armor_1010_Upper",
 "Armor_1006_Lower",
 "Armor_1007_Lower",
 "Armor_1008_Lower",
 "Armor_1009_Lower",
 "Armor_1010_Lower",
 "Armor_1036_Head",
 "Armor_1037_Head",
 "Armor_1038_Head",
 "Armor_1039_Head",
 "Armor_1040_Head",
 "Armor_1043_Upper",
 "Armor_1043_Lower",
 "Armor_1044_Lower",
 "Armor_1046_Head",
 "Armor_1047_Head",
 "Armor_1048_Head",
 "Armor_1049_Head",
 "Armor_1050_Head",
 "Armor_1046_Upper",
 "Armor_1047_Upper",
 "Armor_1048_Upper",
 "Armor_1049_Upper",
 "Armor_1050_Upper",
 "Armor_1046_Lower",
 "Armor_1047_Lower",
 "Armor_1048_Lower",
 "Armor_1049_Lower",
 "Armor_1050_Lower",
 "Armor_1051_Head",
 "Armor_1052_Head",
 "Armor_1053_Head",
 "Armor_1054_Head",
 "Armor_1055_Head",
 "Armor_1051_Upper",
 "Armor_1052_Upper",
 "Armor_1053_Upper",
 "Armor_1054_Upper",
 "Armor_1055_Upper",
 "Armor_1051_Lower",
 "Armor_1052_Lower",
 "Armor_1053_Lower",
 "Armor_1054_Lower",
 "Armor_1055_Lower",
 "Armor_1061_Head",
 "Armor_1062_Head",
 "Armor_1063_Head",
 "Armor_1064_Head",
 "Armor_1065_Head",
 "Armor_1061_Upper",
 "Armor_1062_Upper",
 "Armor_1063_Upper",
 "Armor_1064_Upper",
 "Armor_1065_Upper",
 "Armor_1061_Lower",
 "Armor_1062_Lower",
 "Armor_1063_Lower",
 "Armor_1064_Lower",
 "Armor_1065_Lower",
 "Armor_1066_Head",
 "Armor_1067_Head",
 "Armor_1068_Head",
 "Armor_1069_Head",
 "Armor_1070_Head",
 "Armor_1066_Upper",
 "Armor_1067_Upper",
 "Armor_1068_Upper",
 "Armor_1069_Upper",
 "Armor_1070_Upper",
 "Armor_1066_Lower",
 "Armor_1067_Lower",
 "Armor_1068_Lower",
 "Armor_1069_Lower",
 "Armor_1070_Lower",
 "Armor_1071_Head",
 "Armor_1072_Head",
 "Armor_1073_Head",
 "Armor_1074_Head",
 "Armor_1075_Head",
 "Armor_1071_Upper",
 "Armor_1072_Upper",
 "Armor_1073_Upper",
 "Armor_1074_Upper",
 "Armor_1075_Upper",
 "Armor_1071_Lower",
 "Armor_1072_Lower",
 "Armor_1073_Lower",
 "Armor_1074_Lower",
 "Armor_1075_Lower",
 "Armor_1076_Head",
 "Armor_1086_Head",
 "Armor_1086_Upper",
 "Armor_1086_Lower",
 "Armor_1091_Head",
 "Armor_1092_Head",
 "Armor_1093_Head",
 "Armor_1094_Head",
 "Armor_1095_Head",
 "Armor_1091_Upper",
 "Armor_1092_Upper",
 "Armor_1093_Upper",
 "Armor_1094_Upper",
 "Armor_1095_Upper",
 "Armor_1091_Lower",
 "Armor_1092_Lower",
 "Armor_1093_Lower",
 "Armor_1094_Lower",
 "Armor_1095_Lower",
 "Armor_1096_Head",
 "Armor_1097_Head",
 "Armor_1098_Head",
 "Armor_1099_Head",
 "Armor_1100_Head",
 "Armor_1096_Upper",
 "Armor_1097_Upper",
 "Armor_1098_Upper",
 "Armor_1099_Upper",
 "Armor_1100_Upper",
 "Armor_1096_Lower",
 "Armor_1097_Lower",
 "Armor_1098_Lower",
 "Armor_1099_Lower",
 "Armor_1100_Lower",
 "Armor_1106_Upper",
 "Armor_1107_Upper",
 "Armor_1108_Upper",
 "Armor_1109_Upper",
 "Armor_1110_Upper",
 "Armor_1141_Head",
 "Armor_1142_Head",
 "Armor_1143_Head",
 "Armor_1144_Head",
 "Armor_1145_Head",
 "Armor_1141_Upper",
 "Armor_1142_Upper",
 "Armor_1143_Upper",
 "Armor_1144_Upper",
 "Armor_1145_Upper",
 "Armor_1141_Lower",
 "Armor_1142_Lower",
 "Armor_1143_Lower",
 "Armor_1144_Lower",
 "Armor_1145_Lower",
 "Armor_1151_Head",
 "Armor_1300_Head",
 "Armor_1301_Head",
 "Armor_1302_Head",
 "Armor_1303_Head",
 "Armor_1304_Head",
 "Armor_1300_Upper",
 "Armor_1301_Upper",
 "Armor_1302_Upper",
 "Armor_1303_Upper",
 "Armor_1304_Upper",
 "Armor_1300_Lower",
 "Armor_1301_Lower",
 "Armor_1302_Lower",
 "Armor_1303_Lower",
 "Armor_1304_Lower",
 "Armor_1150_Upper",
 "Armor_1036_Lower",
 "Armor_1036_Upper",
 "Armor_1501_Upper",
 "Armor_999_Head"
];

/** 防具染色：value 是颜色名的哈希，name 是英文显示名 */
export const DYE_COLORS: ReadonlyArray<{ readonly name: string; readonly value: number }> = [
 {
  "name": "Default color",
  "value": 3069107721
 },
 {
  "name": "Blue",
  "value": 3801160378
 },
 {
  "name": "Red",
  "value": 1847234945
 },
 {
  "name": "Yellow",
  "value": 3225380472
 },
 {
  "name": "White",
  "value": 1140983308
 },
 {
  "name": "Black",
  "value": 1824275636
 },
 {
  "name": "Purple",
  "value": 2131419734
 },
 {
  "name": "Green",
  "value": 2090560987
 },
 {
  "name": "Light blue",
  "value": 23488817
 },
 {
  "name": "Navy",
  "value": 182440865
 },
 {
  "name": "Orange",
  "value": 1637794643
 },
 {
  "name": "Pink",
  "value": 3941755401
 },
 {
  "name": "Crimson",
  "value": 4173198632
 },
 {
  "name": "Light yellow",
  "value": 3743860442
 },
 {
  "name": "Brown",
  "value": 3009723180
 },
 {
  "name": "Gray",
  "value": 1981966015
 }
];

/** 马匹相关选项：value 是名称哈希，name 是英文显示名 */
export interface HorseOption {
  readonly name: string;
  readonly value: number;
}
export const HORSE_MANES: readonly HorseOption[] = [
 {
  "name": "None",
  "value": 3069107721
 },
 {
  "name": "Normal Mane",
  "value": 3107823163
 },
 {
  "name": "Mane 01",
  "value": 981784065
 },
 {
  "name": "Mane 02",
  "value": 201316650
 },
 {
  "name": "Mane 03",
  "value": 3893514385
 },
 {
  "name": "Mane 04",
  "value": 4256236466
 },
 {
  "name": "Mane 05",
  "value": 1969715930
 },
 {
  "name": "Mane 06",
  "value": 2629796338
 },
 {
  "name": "Mane 07",
  "value": 2168517369
 },
 {
  "name": "Mane 08",
  "value": 3611893788
 },
 {
  "name": "Mane 09",
  "value": 2888468845
 },
 {
  "name": "Mane 10",
  "value": 2279160095
 },
 {
  "name": "Mane 11",
  "value": 3601209144
 },
 {
  "name": "Mane 12",
  "value": 316511702
 },
 {
  "name": "Giant black mane",
  "value": 2631201403
 },
 {
  "name": "Giant white mane",
  "value": 1429625616
 },
 {
  "name": "*Donkey mane",
  "value": 3134506153
 }
];
export const HORSE_SADDLES: readonly HorseOption[] = [
 {
  "name": "None",
  "value": 3069107721
 },
 {
  "name": "GameRomHorseSaddle_00",
  "value": 2238950964
 },
 {
  "name": "GameRomHorseSaddle_01",
  "value": 80134523
 },
 {
  "name": "GameRomHorseSaddle_02",
  "value": 1204865102
 },
 {
  "name": "GameRomHorseSaddle_03",
  "value": 2930464346
 },
 {
  "name": "GameRomHorseSaddle_04",
  "value": 3474356229
 },
 {
  "name": "GameRomHorseSaddle_05",
  "value": 1848489305
 },
 {
  "name": "GameRomHorseSaddle_06",
  "value": 2146084288
 },
 {
  "name": "GameRomHorseSaddle_07",
  "value": 3106336139
 },
 {
  "name": "GameRomHorseSaddle_00L",
  "value": 4047721362
 },
 {
  "name": "GameRomHorseSaddle_00S",
  "value": 2354827890
 }
];
export const HORSE_REINS: readonly HorseOption[] = [
 {
  "name": "None",
  "value": 3069107721
 },
 {
  "name": "GameRomHorseReins_00",
  "value": 409215819
 },
 {
  "name": "GameRomHorseReins_01",
  "value": 156205178
 },
 {
  "name": "GameRomHorseReins_02",
  "value": 3846880853
 },
 {
  "name": "GameRomHorseReins_03",
  "value": 33571869
 },
 {
  "name": "GameRomHorseReins_04",
  "value": 2237730279
 },
 {
  "name": "GameRomHorseReins_05",
  "value": 3183912331
 },
 {
  "name": "GameRomHorseReins_06",
  "value": 2042808111
 },
 {
  "name": "GameRomHorseReins_00L",
  "value": 1304371297
 },
 {
  "name": "GameRomHorseReins_00S",
  "value": 3908987575
 }
];
export const HORSE_AVAILABILITY: readonly string[] = [
 "GameRomHorse",
 "GameRomHorse00",
 "GameRomHorse01",
 "GameRomHorse02",
 "GameRomHorse03",
 "GameRomHorse04",
 "GameRomHorse05",
 "GameRomHorse06",
 "GameRomHorse07",
 "GameRomHorse08",
 "GameRomHorse09",
 "GameRomHorse10",
 "GameRomHorse11",
 "GameRomHorse12",
 "GameRomHorse13",
 "GameRomHorse14",
 "GameRomHorse15",
 "GameRomHorse16",
 "GameRomHorse17",
 "GameRomHorse18",
 "GameRomHorse19",
 "GameRomHorse20",
 "GameRomHorse21",
 "GameRomHorse22",
 "GameRomHorse23",
 "GameRomHorse25",
 "GameRomHorse26",
 "GameRomHorseEpona",
 "GameRomHorseZelda",
 "GameRomHorse00L",
 "GameRomHorse01L",
 "GameRomHorseGold",
 "GameRomHorseSpPattern",
 "GameRomHorseBone",
 "GameRomHorseBone_AllDay",
 "GameRomHorseForStreetVender",
 "GameRomHorseNushi"
];
