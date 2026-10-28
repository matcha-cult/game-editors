import { theme, type ThemeConfig } from 'antd';

/**
 * 深色主题：沿用原站点深灰底 + 青色高亮的视觉基调，其余交给 antd 的暗色算法。
 */
export const darkTheme: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: '#49c5ff',
    colorBgBase: '#1c1c1c',
    colorBgContainer: '#2a2a2a',
    colorBgElevated: '#333333',
    colorBorder: '#454545',
    borderRadius: 6,
    fontSize: 14,
    wireframe: false,
  },
  components: {
    Layout: {
      headerBg: '#252525',
      headerHeight: 56,
      bodyBg: '#1c1c1c',
      footerBg: '#252525',
    },
    Tabs: {
      titleFontSize: 14,
    },
    Table: {
      headerBg: '#333333',
      rowHoverBg: '#343434',
      cellPaddingBlockSM: 6,
    },
    Card: {
      headerBg: 'transparent',
    },
  },
};
