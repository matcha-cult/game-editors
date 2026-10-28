import { useEffect, useState } from 'react';
import { TotkSave, type TotkItemRow } from '../core/totkSave';
import type { PouchCategoryId } from '../data/pouch';

interface TotkItemIconProps {
  category: PouchCategoryId;
  item: TotkItemRow;
  size?: number;
}

/** 物品图标：每个物品一个 PNG，加载失败回退到 unknown.png */
export function TotkItemIcon({ category, item, size = 36 }: TotkItemIconProps) {
  const src = TotkSave.itemIconPath(category, item);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  return (
    <img
      className="item-icon"
      style={{ width: size, height: size, objectFit: 'contain' }}
      src={failed ? 'assets/totk/item_icons/unknown.png' : src}
      alt=""
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
