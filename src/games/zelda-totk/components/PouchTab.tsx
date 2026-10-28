import { useMemo, useState } from 'react';
import { App as AntdApp, Button, Input, InputNumber, Modal, Select, Space, Table, Tag, Tooltip } from 'antd';
import { ArrowUpOutlined, DeleteOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { TotkSave, isKeyCountable, type TotkItemRow, type TotkSnapshot } from '../core/totkSave';
import {
  armorUpgradeTarget,
  dyeOptions,
  effectHash,
  effectLabel,
  effectOptions,
  itemLabel,
  modifierLabel,
  modifierOptions,
  t,
} from '../core/labels';
import { POUCH_CATEGORIES, type PouchCategoryId } from '../data/pouch';
import { hashReverse, toHex32 } from '../core/murmur3';
import type { TotkApi } from '../state/useTotkSave';
import { TotkItemIcon } from './TotkItemIcon';

interface PouchTabProps {
  api: TotkApi;
  snapshot: TotkSnapshot;
  category: PouchCategoryId;
}

type PickerTarget = { mode: 'add' } | { mode: 'edit'; index: number } | null;

function ItemPickerModal({
  open,
  category,
  title,
  onCancel,
  onPick,
}: {
  open: boolean;
  category: PouchCategoryId;
  title: string;
  onCancel: () => void;
  onPick: (itemId: string) => void;
}) {
  const [keyword, setKeyword] = useState('');
  const items = useMemo(() => TotkSave.availableItems(category), [category]);
  const filtered = useMemo(() => {
    const lower = keyword.trim().toLowerCase();
    if (!lower) return items;
    return items.filter((item) => item.label.toLowerCase().includes(lower) || item.id.toLowerCase().includes(lower));
  }, [items, keyword]);

  return (
    <Modal open={open} title={title} onCancel={onCancel} footer={null} width={640} destroyOnHidden>
      <Input
        allowClear
        prefix={<SearchOutlined />}
        placeholder="搜索中文名或内部 ID"
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
        style={{ marginBottom: 12 }}
      />
      <div style={{ maxHeight: 420, overflowY: 'auto' }}>
        {filtered.slice(0, 300).map((item) => (
          <div
            key={item.id}
            onClick={() => onPick(item.id)}
            style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 4px', cursor: 'pointer' }}
          >
            <TotkItemIcon
              category={category}
              item={{ index: 0, id: item.id, label: item.label, values: {} }}
              size={28}
            />
            <span>{item.label}</span>
            <span className="item-index">{item.id}</span>
          </div>
        ))}
        {filtered.length === 0 && <p className="muted">没有匹配的物品</p>}
        {filtered.length > 300 && <p className="muted">仅显示前 300 条，请继续输入缩小范围</p>}
      </div>
    </Modal>
  );
}

export function PouchTab({ api, snapshot, category }: PouchTabProps) {
  const { update } = api;
  const { message } = AntdApp.useApp();
  const [picker, setPicker] = useState<PickerTarget>(null);

  const rows = snapshot.pouches[category] ?? [];
  const def = POUCH_CATEGORIES.find((candidate) => candidate.id === category);

  const setField = (index: number, property: string, value: number | string) => {
    update((save) => save.setItemField(category, index, property, value));
  };

  const numberCell = (row: TotkItemRow, property: string, options: { min?: number; max?: number; width?: number } = {}) => (
    <InputNumber
      min={options.min}
      max={options.max}
      value={typeof row.values[property] === 'number' ? (row.values[property] as number) : 0}
      style={{ width: options.width ?? 130 }}
      onChange={(value) => setField(row.index, property, typeof value === 'number' ? value : 0)}
    />
  );

  const columns: Array<Record<string, unknown>> = [
    {
      title: '物品',
      dataIndex: 'label',
      render: (_: unknown, row: TotkItemRow) => (
        <div className="item-name-cell">
          <TotkItemIcon category={category} item={row} size={34} />
          <div>
            <a onClick={() => setPicker({ mode: 'edit', index: row.index })}>{row.label}</a>
            <div className="item-index">
              #{row.index} · {row.id}
            </div>
          </div>
        </div>
      ),
    },
  ];

  if (category === 'weapons' || category === 'shields' || category === 'bows') {
    columns.push(
      {
        title: t('Durability'),
        dataIndex: 'durability',
        width: 150,
        render: (_: unknown, row: TotkItemRow) => numberCell(row, 'durability', { min: -1, max: 100000 }),
      },
      {
        title: t('Modifier'),
        dataIndex: 'modifier',
        width: 210,
        render: (_: unknown, row: TotkItemRow) => {
          const current = row.values.modifier;
          const options = modifierOptions(category);
          const merged =
            typeof current === 'string' && options.some((option) => option.value === current)
              ? options
              : [
                  ...options,
                  {
                    value: typeof current === 'string' ? current : String(current),
                    label: typeof current === 'string' ? modifierLabel(current) : toHex32(Number(current)),
                  },
                ];
          return (
            <Select
              value={typeof current === 'string' ? current : toHex32(Number(current))}
              options={merged}
              style={{ width: 190 }}
              onChange={(value) => setField(row.index, 'modifier', value)}
            />
          );
        },
      },
      {
        title: t('Modifier value'),
        dataIndex: 'modifierValue',
        width: 150,
        render: (_: unknown, row: TotkItemRow) => numberCell(row, 'modifierValue', { min: 0, max: 2100000000 }),
      },
    );
  }

  if (category === 'weapons' || category === 'shields') {
    columns.push(
      {
        title: '余料',
        dataIndex: 'fuseId',
        width: 190,
        render: (_: unknown, row: TotkItemRow) => (
          <Input
            value={String(row.values.fuseId ?? '')}
            placeholder="空"
            onChange={(event) => setField(row.index, 'fuseId', event.target.value)}
          />
        ),
      },
      {
        title: '附加耐久',
        dataIndex: 'extraDurability',
        width: 140,
        render: (_: unknown, row: TotkItemRow) => numberCell(row, 'extraDurability', { min: 0, max: 100000 }),
      },
    );
  }

  if (category === 'armors') {
    columns.push({
      title: t('Dye color'),
      dataIndex: 'dyeColor',
      width: 200,
      render: (_: unknown, row: TotkItemRow) => {
        const current = row.values.dyeColor;
        const currentName = typeof current === 'string' ? current : (hashReverse(Number(current)) ?? 'None');
        return (
          <Select
            value={currentName}
            options={dyeOptions()}
            style={{ width: 160 }}
            onChange={(value) => setField(row.index, 'dyeColor', value)}
          />
        );
      },
    });
  }

  if (category === 'food') {
    columns.push(
      {
        title: t('Quantity'),
        dataIndex: 'quantity',
        width: 130,
        render: (_: unknown, row: TotkItemRow) => numberCell(row, 'quantity', { min: -1, max: 999 }),
      },
      {
        title: t('Heart quarters heal'),
        dataIndex: 'heartsHeal',
        width: 150,
        render: (_: unknown, row: TotkItemRow) => numberCell(row, 'heartsHeal', { min: -1, max: 160 }),
      },
      {
        title: t('Food effect'),
        dataIndex: 'effect',
        width: 200,
        render: (_: unknown, row: TotkItemRow) => {
          const current = effectHash((row.values.effect ?? 0) as string | number);
          return (
            <Tooltip title={effectLabel((row.values.effect ?? 0) as string | number)}>
              <Select
                value={current}
                options={effectOptions()}
                showSearch
                optionFilterProp="label"
                style={{ width: 180 }}
                onChange={(value) => setField(row.index, 'effect', value)}
              />
            </Tooltip>
          );
        },
      },
      {
        title: t('Multiplier'),
        dataIndex: 'effectMultiplier',
        width: 120,
        render: (_: unknown, row: TotkItemRow) => numberCell(row, 'effectMultiplier', { min: -1, max: 250 }),
      },
      {
        title: t('Duration (in seconds)'),
        dataIndex: 'effectTime',
        width: 150,
        render: (_: unknown, row: TotkItemRow) => numberCell(row, 'effectTime', { min: -1, max: 59999 }),
      },
      {
        title: t('Price'),
        dataIndex: 'price',
        width: 130,
        render: (_: unknown, row: TotkItemRow) => numberCell(row, 'price', { min: 1, max: 999999 }),
      },
    );
  } else if (category !== 'armors') {
    columns.push({
      title: t('Quantity'),
      dataIndex: 'quantity',
      width: 140,
      render: (_: unknown, row: TotkItemRow) => {
        const max = isKeyCountable(row.id) ? 999999 : TotkSave.availableItems(category).some((item) => item.id === row.id) ? 999 : 999;
        return numberCell(row, 'quantity', { min: category === 'key' ? -1 : 0, max });
      },
    });
  }

  if (category === 'armors') {
    columns.push({
      title: '操作',
      width: 150,
      render: (_: unknown, row: TotkItemRow) => {
        const target = armorUpgradeTarget(row.id);
        return (
          <Space>
            {target && (
              <Button
                size="small"
                icon={<ArrowUpOutlined />}
                onClick={() => {
                  update((save) => save.setItemId('armors', row.index, target));
                  message.success(`已升级为「${itemLabel(target)}」`);
                }}
              >
                升级
              </Button>
            )}
            <Button
              size="small"
              danger
              icon={<DeleteOutlined />}
              onClick={() => {
                update((save) => save.removeItem('armors', row.index));
              }}
            />
          </Space>
        );
      },
    });
  } else {
    columns.push({
      title: '操作',
      width: 90,
      render: (_: unknown, row: TotkItemRow) => (
        <Button
          size="small"
          danger
          icon={<DeleteOutlined />}
          onClick={() => {
            update((save) => save.removeItem(category, row.index));
          }}
        />
      ),
    });
  }

  const handlePick = (itemId: string) => {
    if (!picker) return;
    if (picker.mode === 'add') {
      const ok = update((save) => save.addItem(category, itemId));
      message[ok ? 'success' : 'warning'](ok ? `已添加「${itemLabel(itemId)}」` : '背包已满，先删掉一些物品');
    } else {
      update((save) => save.setItemId(category, picker.index, itemId));
    }
    setPicker(null);
  };

  return (
    <div>
      <div className="toolbar" style={{ justifyContent: 'space-between' }}>
        <span className="muted">
          共 {rows.length} 件 · 点击物品名可更换
          {def ? ` · ${t(def.label)}` : ''}
        </span>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setPicker({ mode: 'add' })}>
          添加物品
        </Button>
      </div>
      <Table
        rowKey="index"
        size="small"
        columns={columns as never}
        dataSource={rows}
        pagination={false}
        scroll={{ x: 'max-content', ...(rows.length > 30 ? { y: 560 } : {}) }}
        locale={{ emptyText: '这个分类还没有物品' }}
      />
      <ItemPickerModal
        open={picker !== null}
        category={category}
        title={picker?.mode === 'edit' ? '更换物品' : '添加物品'}
        onCancel={() => setPicker(null)}
        onPick={handlePick}
      />
      <p className="muted" style={{ marginTop: 12, fontSize: 12 }}>
        <Tag>{t(def?.label ?? '')}</Tag>
        物品 ID 直接写进存档的结构数组；删除会把后面的物品前移，因此删除后请检查词缀与耐久是否还对应正确的物品。
      </p>
    </div>
  );
}
