import { App as AntdApp, Button, Input, InputNumber, Select, Table } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { HORSE_MANES, HORSE_REINS, HORSE_SADDLES } from '../data/itemMeta';
import { itemLabel, t } from '../core/labels';
import { hashReverse } from '../core/murmur3';
import type { TotkHorseRow, TotkSnapshot } from '../core/totkSave';
import type { TotkApi } from '../state/useTotkSave';
import { TotkItemIcon } from './TotkItemIcon';

interface HorseTabProps {
  api: TotkApi;
  snapshot: TotkSnapshot;
}

const asName = (value: unknown, fallback = 'None'): string =>
  typeof value === 'string' ? value : typeof value === 'number' ? String(value) : fallback;

const horseOptions = (list: ReadonlyArray<{ name: string; value: number }>) =>
  list.map((entry) => {
    const enumId = hashReverse(entry.value);
    const label = (enumId ? itemLabel(enumId) : '') || t(entry.name);
    return { value: enumId ?? String(entry.value), label };
  });

export function HorseTab({ api, snapshot }: HorseTabProps) {
  const { update } = api;
  const { message } = AntdApp.useApp();

  const setField = (index: number, property: string, value: number | string) => {
    update((save) => save.setItemField('horses', index, property, value));
  };

  const numberCell = (row: TotkHorseRow, property: string, min = 0, max = 100000) => (
    <InputNumber
      min={min}
      max={max}
      value={typeof row.values[property] === 'number' ? (row.values[property] as number) : 0}
      style={{ width: 120 }}
      onChange={(value) => setField(row.index, property, typeof value === 'number' ? value : 0)}
    />
  );

  const columns = [
    {
      title: '马',
      dataIndex: 'id',
      width: 210,
      render: (_: unknown, row: TotkHorseRow) => (
        <div className="item-name-cell">
          <TotkItemIcon category="horses" item={row} size={34} />
          <div>
            <div>{itemLabel(row.id)}</div>
            <div className="item-index">
              #{row.index} · {row.id}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: t('Name'),
      dataIndex: 'name',
      width: 190,
      render: (_: unknown, row: TotkHorseRow) => (
        <Input
          value={row.name}
          onChange={(event) => setField(row.index, 'name', event.target.value)}
          placeholder="未命名"
        />
      ),
    },
    {
      title: t('Mane'),
      dataIndex: 'mane',
      width: 190,
      render: (_: unknown, row: TotkHorseRow) => (
        <Select
          value={asName(row.values.mane)}
          options={horseOptions(HORSE_MANES)}
          style={{ width: 170 }}
          onChange={(value) => setField(row.index, 'mane', value)}
        />
      ),
    },
    {
      title: t('Saddle'),
      dataIndex: 'saddles',
      width: 210,
      render: (_: unknown, row: TotkHorseRow) => (
        <Select
          value={asName(row.values.saddles)}
          options={horseOptions(HORSE_SADDLES)}
          style={{ width: 190 }}
          onChange={(value) => setField(row.index, 'saddles', value)}
        />
      ),
    },
    {
      title: t('Reins'),
      dataIndex: 'reins',
      width: 210,
      render: (_: unknown, row: TotkHorseRow) => (
        <Select
          value={asName(row.values.reins)}
          options={horseOptions(HORSE_REINS)}
          style={{ width: 190 }}
          onChange={(value) => setField(row.index, 'reins', value)}
        />
      ),
    },
    {
      title: t('Bond'),
      dataIndex: 'bond',
      width: 140,
      render: (_: unknown, row: TotkHorseRow) => (
        <InputNumber
          min={0}
          max={100}
          step={0.1}
          precision={2}
          value={typeof row.values.bond === 'number' ? (row.values.bond as number) : 0}
          style={{ width: 120 }}
          onChange={(value) => setField(row.index, 'bond', typeof value === 'number' ? value : 0)}
        />
      ),
    },
    {
      title: `${t('Strength')} / ${t('Speed')} / ${t('Stamina')} / ${t('Pull')}`,
      width: 380,
      render: (_: unknown, row: TotkHorseRow) => (
        <div style={{ display: 'flex', gap: 6 }}>
          {numberCell(row, 'statsStrength', 0, 5)}
          {numberCell(row, 'statsSpeed', 0, 5)}
          {numberCell(row, 'statsStamina', 0, 5)}
          {numberCell(row, 'statsPull', 0, 5)}
        </div>
      ),
    },
    {
      title: '操作',
      width: 80,
      render: (_: unknown, row: TotkHorseRow) => (
        <Button
          size="small"
          danger
          icon={<DeleteOutlined />}
          onClick={() => {
            update((save) => save.removeItem('horses', row.index));
            message.info('已删除该匹马（存档里后续的马会前移）');
          }}
        />
      ),
    },
  ];

  return (
    <div>
      <p className="muted">共 {snapshot.horses.length} 匹马。名字、鬃毛、马鞍、缰绳与四项能力都可以直接改。</p>
      <Table
        rowKey="index"
        size="small"
        columns={columns as never}
        dataSource={snapshot.horses}
        pagination={false}
        scroll={{ x: 'max-content' }}
        locale={{ emptyText: '存档里还没有马' }}
      />
    </div>
  );
}
