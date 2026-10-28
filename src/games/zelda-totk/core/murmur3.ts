/**
 * murmur3 x86 32bit —— TOTK 存档里所有“名字”都以该哈希形式存储。
 * 与上游使用的 murmurhash3js v3.0.1 的 x86.hash32 逐位一致。
 */
const C1 = 0xcc9e2d51;
const C2 = 0x1b873593;

const rotl = (value: number, bits: number): number => ((value << bits) | (value >>> (32 - bits))) >>> 0;
const mul = (a: number, b: number): number => Math.imul(a, b) >>> 0;

export function murmur3(text: string, seed = 0): number {
  const length = text.length;
  let h1 = seed >>> 0;
  let k1 = 0;

  const blocks = length >> 2;
  for (let i = 0; i < blocks; i++) {
    const j = i * 4;
    k1 =
      (text.charCodeAt(j) & 0xff) |
      ((text.charCodeAt(j + 1) & 0xff) << 8) |
      ((text.charCodeAt(j + 2) & 0xff) << 16) |
      ((text.charCodeAt(j + 3) & 0xff) << 24);
    k1 = mul(k1, C1);
    k1 = rotl(k1, 15);
    k1 = mul(k1, C2);
    h1 ^= k1;
    h1 = rotl(h1, 13);
    h1 = (mul(h1, 5) + 0xe6546b64) >>> 0;
  }

  k1 = 0;
  const remainder = length & 3;
  const base = blocks * 4;
  if (remainder === 3) k1 ^= (text.charCodeAt(base + 2) & 0xff) << 16;
  if (remainder >= 2) k1 ^= (text.charCodeAt(base + 1) & 0xff) << 8;
  if (remainder >= 1) {
    k1 ^= text.charCodeAt(base) & 0xff;
    k1 = mul(k1, C1);
    k1 = rotl(k1, 15);
    k1 = mul(k1, C2);
    h1 ^= k1;
  }

  h1 ^= length;
  h1 ^= h1 >>> 16;
  h1 = mul(h1, 0x85ebca6b);
  h1 ^= h1 >>> 13;
  h1 = mul(h1, 0xc2b2ae35);
  h1 ^= h1 >>> 16;
  return h1 >>> 0;
}

const hashCache = new Map<string, number>();
const reverseCache = new Map<number, string>();

/** 名称 → 哈希（带缓存） */
export function hashText(text: string): number {
  let value = hashCache.get(text);
  if (value === undefined) {
    value = murmur3(text);
    hashCache.set(text, value);
    reverseCache.set(value, text);
  }
  return value;
}

/** 哈希 → 已知名称，未知返回 null */
export function hashReverse(value: number): string | null {
  return reverseCache.get(value >>> 0) ?? null;
}

export function toHex32(value: number): string {
  return '0x' + (value >>> 0).toString(16).padStart(8, '0');
}
