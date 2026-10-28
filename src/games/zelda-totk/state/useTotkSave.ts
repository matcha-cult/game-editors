import { useCallback, useRef, useState } from 'react';
import { TotkSave, type TotkSnapshot } from '../core/totkSave';

export interface TotkApi {
  save: TotkSave | null;
  snapshot: TotkSnapshot | null;
  fileName: string | null;
  error: string | null;
  opening: boolean;
  open: (file: File) => Promise<void>;
  close: () => void;
  /** 修改存档并刷新界面；返回 action 的返回值 */
  update: <T>(action: (save: TotkSave) => T) => T | undefined;
  download: () => void;
}

export function useTotkSave(): TotkApi {
  const [save, setSave] = useState<TotkSave | null>(null);
  const [snapshot, setSnapshot] = useState<TotkSnapshot | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [opening, setOpening] = useState(false);
  const saveRef = useRef<TotkSave | null>(null);

  const attach = useCallback((next: TotkSave | null, name: string | null) => {
    saveRef.current = next;
    setSave(next);
    setSnapshot(next ? next.readSnapshot() : null);
    setFileName(name);
  }, []);

  const open = useCallback(
    async (file: File) => {
      setOpening(true);
      setError(null);
      try {
        const loaded = await TotkSave.load(file);
        attach(loaded, file.name);
      } catch (cause) {
        attach(null, null);
        setError(cause instanceof Error ? cause.message : '无法读取该存档');
      } finally {
        setOpening(false);
      }
    },
    [attach],
  );

  const close = useCallback(() => {
    attach(null, null);
    setError(null);
  }, [attach]);

  const update = useCallback(<T,>(action: (target: TotkSave) => T): T | undefined => {
    const current = saveRef.current;
    if (!current) return undefined;
    const result = action(current);
    setSnapshot(current.readSnapshot());
    return result;
  }, []);

  const download = useCallback(() => {
    const current = saveRef.current;
    if (!current) return;
    const url = URL.createObjectURL(current.toBlob());
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = fileName ?? 'progress.sav';
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 10_000);
  }, [fileName]);

  return { save, snapshot, fileName, error, opening, open, close, update, download };
}
