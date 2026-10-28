import { useEffect, useState } from 'react';
import { App as AntdApp, Alert, Button, Tag, Tabs, Typography } from 'antd';
import { CloseOutlined, DownloadOutlined } from '@ant-design/icons';
import { DropZone } from './components/DropZone';
import { HomeTab } from './components/HomeTab';
import { HorseTab } from './components/HorseTab';
import { ItemTab } from './components/ItemTab';
import { MasterTab } from './components/MasterTab';
import { ITEM_CATEGORY_LABELS, TAB_ORDER } from './core/botwSave';
import { useSaveGame } from './state/useSaveGame';

/** 《塞尔达传说：旷野之息》存档修改器页面 */
export default function ZeldaBotwPage() {
  const game = useSaveGame();
  const { modal, message } = AntdApp.useApp();
  const [activeKey, setActiveKey] = useState('home');
  const [warningShown, setWarningShown] = useState(false);

  const { snapshot } = game;

  useEffect(() => {
    if (!snapshot || warningShown) return;
    setWarningShown(true);
    modal.confirm({
      title: '使用前请阅读',
      content:
        '本工具会直接改写存档文件，请务必先备份原始 game_data.sav。修改后需要把文件放回主机并从游戏内保存一次，否则可能被主机端缓存覆盖。使用本工具造成的存档损坏或进度丢失由使用者自行承担。',
      okText: '我明白',
      cancelText: '关闭',
      closable: false,
    });
  }, [snapshot, warningShown, modal]);

  const versionLabel = snapshot
    ? `${snapshot.version} (${snapshot.consoleType})${snapshot.modified ? ' · 改版存档' : ''}`
    : '';

  const itemTabs = TAB_ORDER.map((category) => ({
    key: category,
    label: `${ITEM_CATEGORY_LABELS[category]} (${snapshot?.items.filter((item) => item.category === category).length ?? 0})`,
    children: snapshot ? <ItemTab game={game} snapshot={snapshot} category={category} /> : null,
  }));

  const tabItems = snapshot
    ? [
        { key: 'home', label: '状态', children: <HomeTab game={game} snapshot={snapshot} /> },
        ...itemTabs,
        { key: 'horses', label: '马匹', children: <HorseTab game={game} snapshot={snapshot} /> },
        { key: 'master', label: '高级编辑', children: <MasterTab game={game} /> },
      ]
    : [];

  return (
    <div>
      <div className="game-page-head">
        <div>
          <Typography.Title level={4} style={{ margin: 0 }}>
            塞尔达传说：旷野之息 · 存档修改器
          </Typography.Title>
          <Typography.Text type="secondary">
            读取主机导出的 game_data.sav，修改后下载覆盖。支持 Wii U / Switch 的 v1.0 – v1.8/v1.9 存档。
          </Typography.Text>
        </div>
        <div className="game-page-actions">
          {snapshot && (
            <>
              <Tag color="blue" style={{ marginInlineEnd: 0 }}>
                {versionLabel}
              </Tag>
              <Tag color="green" style={{ marginInlineEnd: 0 }}>
                {game.fileName}
              </Tag>
              <Button type="primary" icon={<DownloadOutlined />} onClick={game.download}>
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
                    onOk: game.close,
                  });
                }}
              >
                关闭文件
              </Button>
            </>
          )}
        </div>
      </div>

      {game.error && (
        <Alert
          type="error"
          showIcon
          style={{ marginBottom: 16 }}
          message="无效的存档文件"
          description={`${game.error}。请确认选择的是单个 game_data.sav（不是整个 save_0 目录），并检查文件是否来自受支持的版本。`}
        />
      )}

      {!snapshot ? (
        <DropZone loading={game.opening} onFile={game.open} />
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
          存档版本：{snapshot ? versionLabel : '未载入'} · 图钉：{snapshot?.mapPinCount ?? 0} · 难度分数：
          {snapshot ? snapshot.score.toFixed(0) : 0}
        </span>
        <a
          onClick={() => {
            if (snapshot) message.info('修改后请点击「保存文件」下载，再覆盖回主机的存档目录。');
          }}
        >
          修改前请备份存档
        </a>
      </div>
    </div>
  );
}
