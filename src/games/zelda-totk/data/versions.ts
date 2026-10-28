/* 由既有 TOTK 编辑器源码机械提取，勿手工编辑。 */
export interface GameVersion {
  readonly version: string;
  readonly fileSize: number;
  readonly header: number;
  readonly metaDataStart: number;
}

/** 支持的存档版本：文件大小 + 偏移 0 的版本头 */
export const GAME_VERSIONS: readonly GameVersion[] = [
 {
  "version": "v1.0",
  "fileSize": 2307552,
  "header": 4637640,
  "metaDataStart": 245840
 },
 {
  "version": "v1.1.x/v1.2.x",
  "fileSize": 2307656,
  "header": 4710644,
  "metaDataStart": 245896
 },
 {
  "version": "v1.4.x",
  "fileSize": 2307856,
  "header": 4843846,
  "metaDataStart": 246072
 }
];
