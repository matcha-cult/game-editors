/* 由既有编辑器常量表机械转换而来，勿手工编辑数值。 */
/** 支持的存档版本标签 */
export const VERSION: readonly string[] = ["v1.0","v1.1","v1.2","v1.3","v1.3.1","Kiosk","v1.3.3","v1.3.4","v1.4","v1.5","v1.5*","v1.6","v1.6*","v1.6**","v1.6***","v1.8/v1.9"];
/** 对应存档文件大小（字节） */
export const FILESIZE: readonly number[] = [896976,897160,897112,907824,907824,916576,1020648,1020648,1027208,1027208,1027248,1027216,1027216,1027216,1027216,1027248];
/** 对应版本头（偏移 0 的 u32） */
export const HEADER: readonly number[] = [0x000024e2, 0x000024ee, 0x00002588, 0x000029c0, 0x00002a46, 0x00002f8e, 0x00003ef8, 0x00003ef9, 0x0000471a, 0x0000471b, 0x0000471b, 0x0000471e, 0x000f423d, 0x000f423e, 0x000f423f, 0x00004730];

export const MAX_ITEMS = 420;
export const MAX_MAP_PINS = 100;
export const STRING_SIZE = 0x20;
export const STRING64_SIZE = 0x80;

/** 地图图钉图标编号 */
export const ICON_TYPES = {"SWORD":27,"BOW":28,"SHIELD":29,"POT":30,"STAR":31,"CHEST":32,"SKULL":33,"LEAF":34,"TOWER":35} as const;

export type HashName = 'MAP' | 'FLAGS_BOW' | 'FLAGSV_BOW' | 'RUPEES' | 'MAX_HEARTS' | 'HORSE_SADDLES' | 'MAX_STAMINA' | 'DEFEATED_MOLDUGA_COUNTER' | 'DEFEATED_HINOX_COUNTER' | 'FLAGS_WEAPON' | 'ITEMS' | 'HORSE_REINS' | 'DEFEATED_TALUS_COUNTER' | 'FLAGSV_SHIELD' | 'ITEMS_QUANTITY' | 'PLAYTIME' | 'HORSE_NAMES' | 'KOROK_SEED_COUNTER' | 'MapApp_MapIconNo' | 'RELIC_GERUDO' | 'HORSE_POSITION' | 'HORSE_MANES' | 'PLAYER_POSITION' | 'FLAGSV_WEAPON' | 'HORSE_TYPES' | 'FLAGS_SHIELD' | 'MOTORCYCLE' | 'MONS' | 'MAPTYPE' | 'HORSE_BONDS' | 'MapApp_MapIconPos' | 'RELIC_GORON' | 'RELIC_RITO';

/** 哈希表：[hash, 名称] 成对展开 */
export const HASHES: readonly (readonly [number, HashName])[] = [
  [0x0bee9e46, 'MAP'],
  [0x0cbf052a, 'FLAGS_BOW'],
  [0x1e3fd294, 'FLAGSV_BOW'],
  [0x23149bf8, 'RUPEES'],
  [0x2906f327, 'MAX_HEARTS'],
  [0x333aa6e5, 'HORSE_SADDLES'],
  [0x3adff047, 'MAX_STAMINA'],
  [0x441b7231, 'DEFEATED_MOLDUGA_COUNTER'],
  [0x54679940, 'DEFEATED_HINOX_COUNTER'],
  [0x57ee221d, 'FLAGS_WEAPON'],
  [0x5f283289, 'ITEMS'],
  [0x6150c6be, 'HORSE_REINS'],
  [0x698266be, 'DEFEATED_TALUS_COUNTER'],
  [0x69f17e8a, 'FLAGSV_SHIELD'],
  [0x6a09fc59, 'ITEMS_QUANTITY'],
  [0x73c29681, 'PLAYTIME'],
  [0x7b74e117, 'HORSE_NAMES'],
  [0x8a94e07a, 'KOROK_SEED_COUNTER'],
  [0x9383490e, 'MapApp_MapIconNo'],
  [0x97f925c3, 'RELIC_GERUDO'],
  [0x982ba201, 'HORSE_POSITION'],
  [0x9c6cfd3f, 'HORSE_MANES'],
  [0xa40ba103, 'PLAYER_POSITION'],
  [0xa6d926bc, 'FLAGSV_WEAPON'],
  [0xc247b696, 'HORSE_TYPES'],
  [0xc5238d2b, 'FLAGS_SHIELD'],
  [0xc9328299, 'MOTORCYCLE'],
  [0xce7afed3, 'MONS'],
  [0xd913b769, 'MAPTYPE'],
  [0xe1a0ca54, 'HORSE_BONDS'],
  [0xea9def3f, 'MapApp_MapIconPos'],
  [0xf1cf4807, 'RELIC_GORON'],
  [0xfda0cde4, 'RELIC_RITO'],
];
