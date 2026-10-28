import { App as AntdApp, Button, InputNumber, Select, Space, Switch, Tag } from 'antd';
import {
  HEART_OPTIONS,
  MAP_OPTIONS,
  MAP_TYPE_OPTIONS,
  STAMINA_OPTIONS,
  dungeonCoordinatesFor,
  guessMainFieldGrid,
  type BotwSnapshot,
} from '../core/botwSave';
import type { BotwSave } from '../core/botwSave';
import type { SaveGameApi } from '../state/useSaveGame';

interface HomeTabProps {
  game: SaveGameApi;
  snapshot: BotwSnapshot;
}

interface NumberRowProps {
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  width?: number;
  onChange: (value: number) => void;
}

function NumberRow({ label, value, min = 0, max, step = 1, width = 180, onChange }: NumberRowProps) {
  return (
    <div className="stat-row">
      <span className="stat-label">{label}</span>
      <div className="stat-value-row">
        <InputNumber
          min={min}
          max={max}
          step={step}
          value={value}
          style={{ width }}
          onChange={(next) => onChange(typeof next === 'number' ? next : min)}
        />
      </div>
    </div>
  );
}

function GridSelect({
  label,
  value,
  options,
  width = 220,
  onChange,
}: {
  label: string;
  value: number;
  options: ReadonlyArray<{ value: number; label: string }>;
  width?: number;
  onChange: (value: number) => void;
}) {
  const merged: { value: number; label: string }[] = options.some((option) => option.value === value)
    ? [...options]
    : [...options, { value, label: `未知值 ${value}` }];
  return (
    <div className="stat-row">
      <span className="stat-label">{label}</span>
      <div className="stat-value-row">
        <Select value={value} options={merged} style={{ width }} onChange={onChange} />
      </div>
    </div>
  );
}

export function HomeTab({ game, snapshot }: HomeTabProps) {
  const { update } = game;
  const { message } = AntdApp.useApp();

  const gridOptions = MAP_OPTIONS.filter((entry) => /^.-[0-9]$/.test(entry)).map((entry) => ({
    value: entry,
    label: entry,
  }));
  const dungeonOptions = MAP_OPTIONS.filter((entry) => /^Dungeon|^Remains/.test(entry)).map((entry) => ({
    value: entry,
    label: entry,
  }));
  const mapOptions = snapshot.mapType === 'MainFieldDungeon' ? dungeonOptions : gridOptions;
  const mergedMapOptions = mapOptions.some((option) => option.value === snapshot.map)
    ? mapOptions
    : [...mapOptions, { value: snapshot.map, label: `${snapshot.map}（当前）` }];

  const applyDungeonCoordinates = (map: string) => {
    const coordinates = dungeonCoordinatesFor(map);
    if (!coordinates) return;
    update((save) => {
      save.setPosition('x', coordinates.x);
      save.setPosition('y', coordinates.y);
      save.setPosition('z', coordinates.z);
    });
  };

  const notify = (text: string) => {
    message.success(text);
  };

  /** 执行返回计数的批量操作并提示结果 */
  const run = (action: (save: BotwSave) => number, format: (count: number) => string) => {
    const count = update(action);
    message.success(format(typeof count === 'number' ? count : 0));
  };

  return (
    <div>
      <h3 className="section-title red">状态</h3>
      <div className="stat-row">
        <span className="stat-label">卢比</span>
        <div className="stat-value-row">
          <InputNumber
            min={0}
            max={999999}
            value={snapshot.rupees}
            style={{ width: 180 }}
            onChange={(next) => update((save) => save.setRupees(typeof next === 'number' ? next : 0))}
          />
        </div>
      </div>
      <div className="stat-row">
        <span className="stat-label">怪币</span>
        <div className="stat-value-row">
          <InputNumber
            min={0}
            max={999999}
            value={snapshot.mons}
            style={{ width: 180 }}
            onChange={(next) => update((save) => save.setMons(typeof next === 'number' ? next : 0))}
          />
        </div>
      </div>
      {snapshot.hasMotorcycle && (
        <div className="stat-row">
          <span className="stat-label">已获得摩托车</span>
          <div className="stat-value-row">
            <Switch
              checked={snapshot.motorcycle}
              onChange={(checked) => update((save) => save.setMotorcycle(checked))}
            />
          </div>
        </div>
      )}
      <div className="stat-row">
        <span className="stat-label">游戏时间</span>
        <div className="stat-value-row">
          <Tag color="blue" style={{ fontSize: 14, padding: '2px 10px' }}>
            {snapshot.playtime}
          </Tag>
        </div>
      </div>
      <GridSelect
        label="最大心心"
        value={snapshot.maxHearts}
        options={HEART_OPTIONS}
        onChange={(value) => update((save) => save.setMaxHearts(value))}
      />
      <GridSelect
        label="最大精力"
        value={snapshot.maxStamina}
        options={STAMINA_OPTIONS}
        width={220}
        onChange={(value) => update((save) => save.setMaxStamina(value))}
      />
      <NumberRow
        label="英杰乌尔波扎的愤怒剩余使用次数"
        value={snapshot.relicGerudo}
        max={99}
        onChange={(value) => update((save) => save.setRelic('gerudo', value))}
      />
      <NumberRow
        label="英杰达尔克尔的守护剩余使用次数"
        value={snapshot.relicGoron}
        max={99}
        onChange={(value) => update((save) => save.setRelic('goron', value))}
      />
      <NumberRow
        label="英杰力巴尔的勇猛剩余使用次数"
        value={snapshot.relicRito}
        max={99}
        onChange={(value) => update((save) => save.setRelic('rito', value))}
      />
      <div className="stat-row">
        <span className="stat-label">难度分数（敌人等级推进度）</span>
        <div className="stat-value-row">
          <Tag color="gold" style={{ fontSize: 14, padding: '2px 10px' }}>
            {snapshot.score.toFixed(0)}
          </Tag>
        </div>
      </div>

      <h3 className="section-title green" style={{ marginTop: 28 }}>
        坐标
      </h3>
      <div className="stat-row">
        <span className="stat-label">当前位置 (X / Y / Z)</span>
        <div className="stat-value-row">
          {(['x', 'y', 'z'] as const).map((axis) => (
            <InputNumber
              key={axis}
              step={0.001}
              precision={3}
              value={Number(snapshot.position[axis].toFixed(3))}
              style={{ width: 130 }}
              onChange={(next) =>
                update((save) => {
                  const value = typeof next === 'number' ? next : 0;
                  save.setPosition(axis, value);
                  if (save.readSnapshot().mapType === 'MainField') {
                    const position = save.readSnapshot().position;
                    save.setMap(guessMainFieldGrid(position.x, position.z));
                  }
                })
              }
            />
          ))}
        </div>
      </div>
      <div className="stat-row">
        <span className="stat-label">地图区域</span>
        <div className="stat-value-row">
          <Select
            value={snapshot.mapType}
            options={MAP_TYPE_OPTIONS.map((entry) => ({ value: entry, label: entry }))}
            style={{ width: 180 }}
            onChange={(value) =>
              update((save) => {
                save.setMapType(value);
                if (value === 'MainField') save.setMap('A-1');
                else {
                  save.setMap('RemainsElectric');
                  const coordinates = dungeonCoordinatesFor('RemainsElectric');
                  if (coordinates) {
                    save.setPosition('x', coordinates.x);
                    save.setPosition('y', coordinates.y);
                    save.setPosition('z', coordinates.z);
                  }
                }
              })
            }
          />
          <Select
            value={snapshot.map}
            options={mergedMapOptions}
            showSearch
            style={{ width: 200 }}
            onChange={(value) =>
              update((save) => {
                save.setMap(value);
                if (value.startsWith('Remains')) save.setMapType('MainFieldDungeon');
                else if (value.startsWith('Dungeon')) save.setMapType('MainFieldDungeon');
                else save.setMapType('MainField');
              })
            }
          />
          <Button
            onClick={() => {
              const grid = guessMainFieldGrid(snapshot.position.x, snapshot.position.z);
              update((save) => save.setMap(grid));
              notify(`已按坐标推算为 ${grid}`);
            }}
          >
            按坐标推算
          </Button>
          <Button
            onClick={() => {
              applyDungeonCoordinates(snapshot.map);
              notify('已按迷宫设置默认坐标');
            }}
          >
            修复迷宫坐标
          </Button>
        </div>
      </div>
      <div className="stat-row">
        <span className="stat-label">马匹位置 (X / Y / Z)</span>
        <div className="stat-value-row">
          {(['x', 'y', 'z'] as const).map((axis) => (
            <InputNumber
              key={axis}
              step={0.001}
              precision={3}
              value={Number(snapshot.horsePosition[axis].toFixed(3))}
              style={{ width: 130 }}
              onChange={(next) =>
                update((save) => save.setHorsePosition(axis, typeof next === 'number' ? next : 0))
              }
            />
          ))}
        </div>
      </div>

      <h3 className="section-title blue" style={{ marginTop: 28 }}>
        完成度
      </h3>
      <div className="stat-row">
        <span className="stat-label">克洛洛果实数</span>
        <div className="stat-value-row">
          <InputNumber
            min={0}
            max={900}
            value={snapshot.koroks}
            style={{ width: 140 }}
            onChange={(next) => update((save) => save.setKoroks(typeof next === 'number' ? next : 0))}
          />
          <Button onClick={() => run((save) => save.unlockKoroks(), (n) => `获得了 ${n} 个克洛洛果实`)}>
            解锁全部克洛洛
          </Button>
          <Button onClick={() => run((save) => save.addKoroksToMap(), (n) => `添加了 ${n} 个克洛洛图钉`)}>
            克洛洛图钉
          </Button>
        </div>
      </div>
      <div className="stat-row">
        <span className="stat-label">已击败的西诺克斯</span>
        <div className="stat-value-row">
          <InputNumber
            min={0}
            value={snapshot.defeatedHinox}
            style={{ width: 140 }}
            onChange={(next) =>
              update((save) => save.setDefeated('hinox', typeof next === 'number' ? next : 0))
            }
          />
          <Button onClick={() => run((save) => save.defeatAllHinox(), (n) => `击杀了 ${n} 只西诺克斯`)}>
            全部击杀
          </Button>
          <Button onClick={() => run((save) => save.addHinoxToMap(), (n) => `添加了 ${n} 个西诺克斯图钉`)}>
            图钉
          </Button>
        </div>
      </div>
      <div className="stat-row">
        <span className="stat-label">已击败的岩石巨人</span>
        <div className="stat-value-row">
          <InputNumber
            min={0}
            value={snapshot.defeatedTalus}
            style={{ width: 140 }}
            onChange={(next) =>
              update((save) => save.setDefeated('talus', typeof next === 'number' ? next : 0))
            }
          />
          <Button onClick={() => run((save) => save.defeatAllTalus(), (n) => `击杀了 ${n} 只岩石巨人`)}>全部击杀</Button>
          <Button onClick={() => run((save) => save.addTalusToMap(), (n) => `添加了 ${n} 个岩石巨人图钉`)}>图钉</Button>
        </div>
      </div>
      <div className="stat-row">
        <span className="stat-label">已击败的莫尔德拉吉克</span>
        <div className="stat-value-row">
          <InputNumber
            min={0}
            value={snapshot.defeatedMolduga}
            style={{ width: 140 }}
            onChange={(next) =>
              update((save) => save.setDefeated('molduga', typeof next === 'number' ? next : 0))
            }
          />
          <Button onClick={() => run((save) => save.defeatAllMolduga(), (n) => `击杀了 ${n} 只莫尔德拉吉克`)}>
            全部击杀
          </Button>
          <Button onClick={() => run((save) => save.addMoldugaToMap(), (n) => `添加了 ${n} 个莫尔德拉吉克图钉`)}>
            图钉
          </Button>
        </div>
      </div>
      <div className="stat-row">
        <span className="stat-label">访问过的地点 / 地图图钉</span>
        <div className="stat-value-row">
          <Tag>{snapshot.mapPinCount} 个图钉</Tag>
          <Button onClick={() => run((save) => save.visitAllLocations(), (n) => `标记了 ${n} 个未知地点`)}>
            访问所有地点
          </Button>
          <Button onClick={() => run((save) => save.addLocationsToMap(), (n) => `添加了 ${n} 个地点图钉`)}>
            地点图钉
          </Button>
          <Button danger onClick={() => run((save) => save.clearMapPins(), (n) => `删除了 ${n} 个地图图钉`)}>
            清空图钉
          </Button>
        </div>
      </div>
      <div className="stat-row">
        <span className="stat-label">图鉴</span>
        <div className="stat-value-row">
          <Button
            onClick={() => run((save) => save.setCompendiumToStock(), (n) => `已将 ${n} 张照片重置为库存状态`)}
          >
            照片重置为库存
          </Button>
          <Space />
          <span className="muted">重置后可安全删除 pict_book 文件夹下的图片</span>
        </div>
      </div>
    </div>
  );
}
