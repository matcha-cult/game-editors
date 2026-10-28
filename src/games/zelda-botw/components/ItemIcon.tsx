import { ICON_COLS, getItemIcon, iconSheetUrl } from '../core/icons';

interface ItemIconProps {
  itemId: string;
  /** 防具染色索引；不影响其它物品 */
  dye?: number;
  size?: number;
}

/** 物品图标：用 background-position 从图集里裁出 64px 的格子 */
export function ItemIcon({ itemId, dye, size = 36 }: ItemIconProps) {
  const position = itemId ? getItemIcon(itemId, dye) : null;
  if (!position) {
    return <span className="item-icon" style={{ width: size, height: size }} />;
  }
  return (
    <span
      className="item-icon"
      style={{
        width: size,
        height: size,
        backgroundImage: `url(${iconSheetUrl(position.sheet)})`,
        backgroundSize: `${ICON_COLS * size}px auto`,
        backgroundPosition: `-${position.column * size}px -${position.row * size}px`,
      }}
    />
  );
}
