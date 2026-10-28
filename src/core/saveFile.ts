/**
 * 二进制存档读写。
 *
 * 存档按 8 字节为一条记录：前 4 字节是哈希（小端/大端由主机决定），后 4 字节是值。
 * 本类只负责按指定字节序读写基本类型，不含任何 BOTW 业务知识。
 */
export class SaveFile {
  readonly bytes: Uint8Array;
  readonly fileName: string;
  readonly fileType: string;
  /** 主机字节序：Wii U 为大端，Switch 为小端 */
  littleEndian = false;
  private readonly view: DataView;

  constructor(buffer: ArrayBuffer, fileName = 'game_data.sav', fileType = 'application/octet-stream') {
    this.bytes = new Uint8Array(buffer);
    this.view = new DataView(buffer);
    this.fileName = fileName;
    this.fileType = fileType;
  }

  static async fromFile(file: File): Promise<SaveFile> {
    const buffer = await file.arrayBuffer();
    return new SaveFile(buffer, file.name, file.type || 'application/octet-stream');
  }

  get fileSize(): number {
    return this.bytes.length;
  }

  // ---- 读 ----

  readU8(pos: number): number {
    return this.bytes[pos];
  }

  readU16(pos: number): number {
    return this.littleEndian
      ? (this.bytes[pos] | (this.bytes[pos + 1] << 8)) >>> 0
      : ((this.bytes[pos] << 8) | this.bytes[pos + 1]) >>> 0;
  }

  readU24(pos: number): number {
    return this.littleEndian
      ? (this.bytes[pos] | (this.bytes[pos + 1] << 8) | (this.bytes[pos + 2] << 16)) >>> 0
      : ((this.bytes[pos] << 16) | (this.bytes[pos + 1] << 8) | this.bytes[pos + 2]) >>> 0;
  }

  readU32(pos: number): number {
    return this.littleEndian
      ? (this.bytes[pos] | (this.bytes[pos + 1] << 8) | (this.bytes[pos + 2] << 16) | (this.bytes[pos + 3] << 24)) >>> 0
      : ((this.bytes[pos] << 24) | (this.bytes[pos + 1] << 16) | (this.bytes[pos + 2] << 8) | this.bytes[pos + 3]) >>> 0;
  }

  readS8(pos: number): number {
    return this.view.getInt8(pos);
  }

  readS16(pos: number): number {
    return this.view.getInt16(pos, this.littleEndian);
  }

  readS32(pos: number): number {
    return this.view.getInt32(pos, this.littleEndian);
  }

  readF32(pos: number): number {
    return this.view.getFloat32(pos, this.littleEndian);
  }

  readF64(pos: number): number {
    return this.view.getFloat64(pos, this.littleEndian);
  }

  readBytes(pos: number, length: number): number[] {
    return Array.from(this.bytes.subarray(pos, pos + length));
  }

  /** 读取以 0 结尾的 ASCII 字符串，最多 maxLength 字节 */
  readString(pos: number, maxLength: number): string {
    let out = '';
    for (let i = 0; i < maxLength && pos + i < this.fileSize; i++) {
      const code = this.bytes[pos + i];
      if (code === 0) break;
      out += String.fromCharCode(code);
    }
    return out;
  }

  // ---- 写 ----

  writeU8(pos: number, value: number): void {
    this.bytes[pos] = value & 0xff;
  }

  writeU16(pos: number, value: number): void {
    this.view.setUint16(pos, value, this.littleEndian);
  }

  writeU32(pos: number, value: number): void {
    this.view.setUint32(pos, value >>> 0, this.littleEndian);
  }

  writeS32(pos: number, value: number): void {
    this.view.setInt32(pos, value, this.littleEndian);
  }

  writeF32(pos: number, value: number): void {
    this.view.setFloat32(pos, value, this.littleEndian);
  }

  writeBytes(pos: number, values: ArrayLike<number>): void {
    this.bytes.set(values, pos);
  }

  writeString(pos: number, value: string, maxLength?: number): void {
    const length = maxLength ?? value.length;
    let i = 0;
    for (; i < value.length && i < length; i++) this.bytes[pos + i] = value.charCodeAt(i) & 0xff;
    for (; i < length; i++) this.bytes[pos + i] = 0;
  }

  toBlob(): Blob {
    return new Blob([this.bytes as unknown as BlobPart], { type: this.fileType });
  }
}
