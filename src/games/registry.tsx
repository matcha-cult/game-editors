import type { ComponentType, ReactNode } from 'react';
import { CompassOutlined, CrownOutlined } from '@ant-design/icons';
import ZeldaBotwPage from './zelda-botw/ZeldaBotwPage';
import ZeldaTotkPage from './zelda-totk/ZeldaTotkPage';

export interface GameEntry {
  /** 路由 id，同时作为 URL 片段（#/<path>） */
  id: string;
  path: string;
  title: string;
  subtitle: string;
  platforms: readonly string[];
  description: string;
  /** 首页卡片封面图（可选；不填则用图标 + 渐变绘制） */
  thumbnail?: string;
  /** 无封面图时卡片上显示的图标 */
  coverIcon: ReactNode;
  /** 卡片封面渐变 */
  coverGradient: string;
  tags: readonly string[];
  Component: ComponentType;
}

/**
 * 修改器集合。新增游戏时：在 src/games/<id>/ 下实现页面，
 * 再往这个数组里加一项即可，首页卡片与路由会自动生成。
 */
export const GAMES: readonly GameEntry[] = [
  {
    id: 'zelda-botw',
    path: '/zelda-botw',
    title: '塞尔达传说：旷野之息',
    subtitle: 'The Legend of Zelda: Breath of the Wild',
    platforms: ['Wii U', 'Switch'],
    description:
      '编辑卢比、心心、精力、物品与词缀、马匹、坐标与地图图钉，支持批量解锁克洛洛/精英怪、重置图鉴，以及原始哈希表高级编辑。',
    coverIcon: <CompassOutlined />,
    coverGradient: 'linear-gradient(135deg, #24424f 0%, #17252e 55%, #102028 100%)',
    tags: ['物品', '词缀', '坐标', '完成度', '高级编辑'],
    Component: ZeldaBotwPage,
  },
  {
    id: 'zelda-totk',
    path: '/zelda-totk',
    title: '塞尔达传说：王国之泪',
    subtitle: 'The Legend of Zelda: Tears of the Kingdom',
    platforms: ['Switch'],
    description:
      '编辑卢比、心心上限、电池容量、背包九类物品（含耐久/词缀/余料/染色/料理效果）、马匹与坐标，并提供完整哈希表高级编辑。',
    coverIcon: <CrownOutlined />,
    coverGradient: 'linear-gradient(135deg, #3d2f1f 0%, #2a2118 55%, #191510 100%)',
    tags: ['物品', '余料', '防具染色', '马匹', '高级编辑'],
    Component: ZeldaTotkPage,
  },
];
