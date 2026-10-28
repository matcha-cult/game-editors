import { Input, InputNumber, Select, Table } from 'antd';
import {
  HORSE_REINS_OPTIONS,
  HORSE_SADDLE_OPTIONS,
  HORSE_TYPE_OPTIONS,
  HORSE_WILD_TYPE_OPTIONS,
  type BotwSnapshot,
  type HorseRow,
} from '../core/botwSave';
import type { SaveGameApi } from '../state/useSaveGame';

interface HorseTabProps {
  game: SaveGameApi;
  snapshot: BotwSnapshot;
}

const TYPE_OPTIONS = HORSE_TYPE_OPTIONS;

export function HorseTab({ game, snapshot }: HorseTabProps) {
  const { update } = game;

  const columns = [
    {
      title: '#',
      dataIndex: 'index',
      width: 50,
      render: (index: number) => <span className="item-index">{index + 1}</span>,
    },
    {
      title: '类型',
      dataIndex: 'type',
      width: 240,
      render: (_: unknown, horse: HorseRow) => {
        const options = horse.index === 5 ? [...TYPE_OPTIONS, ...HORSE_WILD_TYPE_OPTIONS] : TYPE_OPTIONS;
        const merged = horse.type && !options.some((option) => option.value === horse.type)
          ? [...options, { value: horse.type, label: horse.type }]
          : options;
        return (
          <Select
            value={horse.type || undefined}
            placeholder="未登记"
            showSearch
            optionFilterProp="label"
            options={merged}
            style={{ width: 210 }}
            onChange={(value) => update((save) => save.setHorseType(horse.index, value))}
          />
        );
      },
    },
    {
      title: '名字',
      dataIndex: 'name',
      width: 200,
      render: (_: unknown, horse: HorseRow) =>
        horse.index >= 5 ? (
          <span className="muted">-</span>
        ) : (
          <Input
            value={horse.name}
            maxLength={64}
            placeholder="未命名"
            onChange={(event) => update((save) => save.setHorseName(horse.index, event.target.value))}
          />
        ),
    },
    {
      title: '马鞍',
      dataIndex: 'saddle',
      width: 220,
      render: (_: unknown, horse: HorseRow) =>
        horse.index >= 5 ? (
          <span className="muted">-</span>
        ) : (
          <Select
            value={horse.saddle || undefined}
            placeholder="默认"
            options={HORSE_SADDLE_OPTIONS}
            style={{ width: 190 }}
            onChange={(value) => update((save) => save.setHorseSaddle(horse.index, value))}
          />
        ),
    },
    {
      title: '缰绳',
      dataIndex: 'reins',
      width: 220,
      render: (_: unknown, horse: HorseRow) =>
        horse.index >= 5 ? (
          <span className="muted">-</span>
        ) : (
          <Select
            value={horse.reins || undefined}
            placeholder="默认"
            options={HORSE_REINS_OPTIONS}
            style={{ width: 190 }}
            onChange={(value) => update((save) => save.setHorseReins(horse.index, value))}
          />
        ),
    },
  ];

  return (
    <div>
      <h3 className="section-title blue">马匹</h3>
      <p className="muted">
        前 5 匹是已登记的马，第 6 行是野马/特殊马（类型可选手动捕捉的「巨马」与「骷髅马」）。类型为空表示该槽位没有马。
      </p>
      <Table
        rowKey="index"
        size="small"
        columns={columns}
        dataSource={snapshot.horses}
        pagination={false}
        scroll={{ x: 'max-content' }}
      />
      <h3 className="section-title green" style={{ marginTop: 28 }}>
        马匹位置
      </h3>
      <div className="stat-row">
        <span className="stat-label">X / Y / Z</span>
        <div className="stat-value-row">
          {(['x', 'y', 'z'] as const).map((axis) => (
            <InputNumber
              key={axis}
              step={0.001}
              precision={3}
              value={Number(snapshot.horsePosition[axis].toFixed(3))}
              style={{ width: 150 }}
              onChange={(next) =>
                update((save) => save.setHorsePosition(axis, typeof next === 'number' ? next : 0))
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
