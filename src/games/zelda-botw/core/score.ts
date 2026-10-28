/**
 * 难度分数（敌人等级推进度）计算。
 *
 * 游戏内部按击杀记录累计分数，分数越高敌人与武器等级越高。
 * 每个敌人击杀计数在存档里是一条 "Defeated_..._Num" 哈希记录，用 CRC32 与名字对应。
 */
const ENEMY_POINTS: Record<string, number> = {
  Defeated_Enemy_Wizzrobe_Electric_Num: 5.0,
  Defeated_Enemy_Wizzrobe_Fire_Num: 5.0,
  Defeated_Enemy_Wizzrobe_Ice_Num: 5.0,
  Defeated_Enemy_Guardian_A_Fixed_Moss_Num: 12.0,
  Defeated_Enemy_Golem_Junior_Num: 15.0,
  Defeated_Enemy_Giant_Junior_Num: 15.0,
  Defeated_Enemy_Assassin_Middle_Num: 15.0,
  Defeated_Enemy_Bokoblin_Senior_Num: 15.0,
  Defeated_Enemy_Wizzrobe_Ice_Senior_Num: 15.0,
  Defeated_Enemy_Wizzrobe_Fire_Senior_Num: 15.0,
  Defeated_Enemy_Wizzrobe_Electric_Senior_Num: 15.0,
  Defeated_RemainsFire_Drone_A_01_Num: 15.0,
  Defeated_Enemy_Moriblin_Senior_Num: 18.0,
  Defeated_Enemy_Guardian_Mini_Middle_Num: 20.0,
  Defeated_Enemy_Lizalfos_Electric_Num: 20.0,
  Defeated_Enemy_Lizalfos_Ice_Num: 20.0,
  Defeated_Enemy_Lizalfos_Senior_Num: 20.0,
  Defeated_Enemy_Lizalfos_Fire_Num: 20.0,
  Defeated_Enemy_Bokoblin_Gold_Num: 25.0,
  Defeated_Enemy_Giant_Bone_Num: 25.0,
  Defeated_Enemy_Bokoblin_Dark_Num: 25.0,
  Defeated_Enemy_Golem_Middle_Num: 25.0,
  Defeated_Enemy_Giant_Middle_Num: 25.0,
  Defeated_Enemy_Golem_Senior_Num: 30.0,
  Defeated_Enemy_Golem_Fire_Num: 35.0,
  Defeated_Enemy_Moriblin_Gold_Num: 35.0,
  Defeated_Enemy_Guardian_Mini_Senior_Num: 35.0,
  Defeated_Enemy_Guardian_B_Num: 35.0,
  Defeated_Enemy_Golem_Ice_Num: 35.0,
  Defeated_Enemy_Moriblin_Dark_Num: 35.0,
  Defeated_Enemy_Golem_Fire_R_Num: 35.0,
  Defeated_Enemy_Giant_Senior_Num: 35.0,
  Defeated_Enemy_Lizalfos_Dark_Num: 40.0,
  Defeated_Enemy_Lizalfos_Gold_Num: 40.0,
  Defeated_Enemy_SandwormR_Num: 50.0,
  Defeated_Enemy_Guardian_A_Num: 50.0,
  Defeated_Enemy_Guardian_C_Num: 50.0,
  Defeated_Enemy_Sandworm_Num: 50.0,
  Defeated_Enemy_Lynel_Junior_Num: 50.0,
  Defeated_Enemy_Lynel_Middle_Num: 60.0,
  Defeated_Enemy_Lynel_Senior_Num: 80.0,
  Defeated_Enemy_Assassin_Senior_Num: 100.0,
  Defeated_Enemy_Lynel_Gold_Num: 120.0,
  Defeated_Enemy_Lynel_Dark_Num: 120.0,
  Defeated_Enemy_SiteBoss_Lsword_Num: 300.0,
  Defeated_Enemy_SiteBoss_Spear_Num: 300.0,
  Defeated_Enemy_SiteBoss_Sword_Num: 300.0,
  Defeated_Enemy_SiteBoss_Bow_Num: 300.0,
  Defeated_Priest_Boss_Normal_Num: 500.0,
  Defeated_Enemy_GanonBeast_Num: 800.0,
};

/** CRC32 查表（多项式 0xEDB88320） */
const CRC32_TABLE: readonly number[] = (() => {
  const table = new Array<number>(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c;
  }
  return table;
})();

export function crc32(str: string): number {
  let crc = -1;
  for (let i = 0; i < str.length; i++) crc = (crc >>> 8) ^ CRC32_TABLE[(crc ^ str.charCodeAt(i)) & 0xff];
  return (crc ^ -1) >>> 0;
}

let pointsByHash: Map<number, number> | null = null;

function getPointsByHash(): Map<number, number> {
  if (!pointsByHash) {
    pointsByHash = new Map();
    for (const [name, points] of Object.entries(ENEMY_POINTS)) pointsByHash.set(crc32(name), points);
  }
  return pointsByHash;
}

/** 扫描存档，按击杀记录累加难度分数 */
export function calculateScaleScore(saveFile: { fileSize: number; readU32(pos: number): number }): number {
  const table = getPointsByHash();
  let score = 0;
  let previousHash = 0;
  for (let i = 0x0c; i < saveFile.fileSize - 4; i += 8) {
    const hashValue = saveFile.readU32(i);
    if (hashValue === previousHash) continue;
    previousHash = hashValue;
    const points = table.get(hashValue);
    if (points) score += points * saveFile.readU32(i + 4);
  }
  return score;
}
