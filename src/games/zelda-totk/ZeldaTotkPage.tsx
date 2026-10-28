import { useEffect, useState } from 'react';
import { App as AntdApp, Alert, Button, Drawer, Tag, Tabs, Typography } from 'antd';
import { CloseOutlined, DownloadOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { FileDropZone } from '../../components/FileDropZone';
import { HorseTab } from './components/HorseTab';
import { MasterTab } from './components/MasterTab';
import { PouchTab } from './components/PouchTab';
import { StatusTab } from './components/StatusTab';
import { POUCH_CATEGORIES, type PouchCategoryId } from './data/pouch';
import { t } from './core/labels';
import { useTotkSave } from './state/useTotkSave';

/** 《塞尔达传说：王国之泪》存档修改器页面 */
export default function ZeldaTotkPage() {
  const api = useTotkSave();
  const { modal } = AntdApp.useApp();
  const [activeKey, setActiveKey] = useState('home');
  const [warningShown, setWarningShown] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  const { snapshot } = api;

  useEffect(() => {
    if (!snapshot || warningShown) return;
    setWarningShown(true);
    modal.confirm({
      title: '使用前请阅读',
      content:
        '王国之泪的存档结构复杂，改动物品栏后建议先进游戏确认一次再继续修改。请务必备份原始 progress.sav；修改后用 JKSV / Checkpoint 之类的工具覆盖回主机。使用本工具造成的存档损坏由使用者自行承担。',
      okText: '我明白',
      cancelText: '关闭',
      closable: false,
    });
  }, [snapshot, warningShown, modal]);

  const pouchTabs = POUCH_CATEGORIES.filter((def) => def.id !== 'horses').map((def) => ({
    key: def.id,
    label: `${t(def.label)} (${
      snapshot ? (snapshot.pouches[def.id as PouchCategoryId]?.length ?? 0) : 0
    })`,
    children: snapshot ? <PouchTab api={api} snapshot={snapshot} category={def.id} /> : null,
  }));

  const tabItems = snapshot
    ? [
        { key: 'home', label: '状态', children: <StatusTab api={api} snapshot={snapshot} /> },
        ...pouchTabs,
        {
          key: 'horses',
          label: `马匹 (${snapshot.horses.length})`,
          children: <HorseTab api={api} snapshot={snapshot} />,
        },
        { key: 'master', label: '高级编辑', children: <MasterTab api={api} /> },
      ]
    : [];

  return (
    <div>
      <div className="game-page-head">
        <div>
          <Typography.Title level={4} style={{ margin: 0 }}>
            塞尔达传说：王国之泪 · 存档修改器
          </Typography.Title>
          <Typography.Text type="secondary">
            读取主机导出的 progress.sav，修改后下载覆盖。支持 v1.0 / v1.1.x / v1.2.x / v1.4.x。
          </Typography.Text>
        </div>
        <div className="game-page-actions">
          {snapshot && (
            <>
              <Tag color="blue" style={{ marginInlineEnd: 0 }}>
                {snapshot.version}
                {snapshot.gameMod ? ' · 改版' : ''}
              </Tag>
              <Tag color="green" style={{ marginInlineEnd: 0 }}>
                {api.fileName}
              </Tag>
              <Button type="primary" icon={<DownloadOutlined />} onClick={api.download}>
                保存文件
              </Button>
              <Button
                icon={<CloseOutlined />}
                onClick={() => {
                  modal.confirm({
                    title: '关闭文件',
                    content: '未保存的修改将会丢失（点击「保存文件」才会下载新存档）。',
                    okText: '关闭',
                    cancelText: '继续编辑',
                    onOk: api.close,
                  });
                }}
              >
                关闭文件
              </Button>
            </>
          )}
          <Button type="text" icon={<InfoCircleOutlined />} onClick={() => setAboutOpen(true)}>
            移植说明
          </Button>
        </div>
      </div>

      {api.error && (
        <Alert
          type="error"
          showIcon
          style={{ marginBottom: 16 }}
          message="无效的存档文件"
          description={`${api.error}。王国之泪需要主机上的 progress.sav（约 2.3 MB），不是 caption.sav 或整个存档目录；同时请确认存档未被压缩封装。`}
        />
      )}

      {!snapshot ? (
        <FileDropZone
          loading={api.opening}
          onFile={api.open}
          title="拖入 progress.sav，或点击选择文件"
          hints="支持《王国之泪》Wii U/Switch 存档（v1.0 / v1.1.x / v1.2.x / v1.4.x，约 2.3 MB）"
          accept=".sav,.bin,application/octet-stream"
          sampleUrl="assets/totk/sample-progress.sav"
          sampleName="progress.sav"
        />
      ) : (
        <Tabs
          activeKey={activeKey}
          onChange={setActiveKey}
          items={tabItems}
          destroyOnHidden
          tabBarStyle={{ marginBottom: 20 }}
        />
      )}

      <div className="game-page-status">
        <span>
          存档版本：{snapshot ? snapshot.version : '未载入'} · 游戏时间：{snapshot?.playtime ?? '-'} · 卢比：
          {snapshot?.rupees ?? 0}
        </span>
        <span>修改前请备份 progress.sav</span>
      </div>

      <Drawer title="关于这次移植" open={aboutOpen} onClose={() => setAboutOpen(false)} width={520}>
        <Typography.Paragraph>
          本页是把既有王国之泪存档编辑器（原生 JS + jQuery）按同一套数据与行为重写为 React + Ant Design 的版本，
          二进制结构、哈希算法（murmur3）、字段定义与物品译名都从既有实现机械转换而来。
        </Typography.Paragraph>
        <Typography.Title level={5}>已移植</Typography.Title>
        <ul>
          <li>存档识别（v1.0 / v1.1.x-1.2.x / v1.4.x，含改版存档）</li>
          <li>玩家状态：卢比、心心上限、精力上限、电池容量、马匹点数、游戏时间、坐标</li>
          <li>背包：武器 / 弓 / 箭矢 / 盾牌 / 防具 / 材料 / 料理 / 左纳乌装置 / 重要物品</li>
          <li>装备：耐久、词缀与强化值、余料与附加耐久；防具染色与升级</li>
          <li>料理：回复量、效果、倍率、持续时间、价格</li>
          <li>马匹：名字、鬃毛、马鞍、缰绳、亲密度、四项能力</li>
          <li>高级编辑：完整哈希表原始变量读写</li>
        </ul>
        <Typography.Title level={5}>本次未包含（后续可补）</Typography.Title>
        <ul>
          <li>完成度一键解锁（神庙 / 鸟望台 / 克洛洛 / 洞穴 / BOSS 等大量标记位）</li>
          <li>地图图钉批量添加与坐标库</li>
          <li>经验值/等级计算器、自动建造（蓝图）编辑器</li>
          <li>存档 JSON 导入导出、滑翔伞图案替换</li>
        </ul>
        <Typography.Paragraph type="secondary" style={{ fontSize: 12 }}>
          这些功能依赖大量额外数据表，结构上已经可以按同样方式接入；如果你需要，可以继续逐个补上。
        </Typography.Paragraph>
      </Drawer>
    </div>
  );
}
