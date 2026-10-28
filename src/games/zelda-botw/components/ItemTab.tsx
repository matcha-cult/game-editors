import { useState } from 'react';
import { App as AntdApp, Button, InputNumber, Select, Table, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {
  buildModifierOptions,
  ITEM_CATEGORY_LABELS,
  getDyeLabel,
  type BotwSnapshot,
  type ItemCategory,
  type ItemRow,
} from '../core/botwSave';
import { DYE_COLORS } from '../data/botw-data';
import type { SaveGameApi } from '../state/useSaveGame';
import { ItemIcon } from './ItemIcon';
import { ItemPickerModal } from './ItemPickerModal';

interface ItemTabProps {
  game: SaveGameApi;
  snapshot: BotwSnapshot;
  category: ItemCategory;
}

const DYE_OPTIONS = DYE_COLORS.map((entry, index) =>
  typeof entry === 'string' ? { value: index, label: entry } : { value: entry.value, label: entry.name },
);

const MODIFIER_COLUMNS: ReadonlySet<ItemCategory> = new Set(['weapons', 'bows', 'shields']);

type PickerState = { mode: 'add' } | { mode: 'edit'; index: number } | null;

export function ItemTab({ game, snapshot, category }: ItemTabProps) {
  const { update } = game;
  const { message } = AntdApp.useApp();
  const [picker, setPicker] = useState<PickerState>(null);

  const items = snapshot.items.filter((item) => item.category === category);

  const handlePick = (itemId: string) => {
    if (!picker) return;
    if (picker.mode === 'add') {
      const added = update((save) => save.addItem(itemId));
      if (!added) message.warning('物品栏已满（最多 420 个物品）');
      else message.success(`已添加「${added.label}」`);
    } else {
      const targetIndex = picker.index;
      const nextCategory = update((save) => save.setItemId(targetIndex, itemId));
      if (nextCategory && nextCategory !== category) {
        message.info(`该物品属于「${ITEM_CATEGORY_LABELS[nextCategory]}」，已移动到对应页签`);
      }
    }
    setPicker(null);
  };

  const columns = [
    {
      title: '物品',
      dataIndex: 'label',
      render: (_: unknown, item: ItemRow) => (
        <div className="item-name-cell">
          <ItemIcon itemId={item.itemId} dye={category === 'clothes' ? item.quantity : undefined} size={34} />
          <div>
            <a onClick={() => setPicker({ mode: 'edit', index: item.index })}>{item.label}</a>
            <div className="item-index">
              #{item.index} · {item.itemId}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: category === 'clothes' ? '染色' : '数量 / 耐久',
      dataIndex: 'quantity',
      width: 210,
      render: (_: unknown, item: ItemRow) =>
        category === 'clothes' ? (
          <Select
            value={item.quantity}
            options={DYE_OPTIONS}
            style={{ width: 160 }}
            onChange={(value) => update((save) => save.setItemQuantity(item.index, value))}
          />
        ) : (
          <InputNumber
            min={0}
            max={item.maxQuantity === 0xffffffff ? 999999999 : item.maxQuantity}
            value={item.quantity}
            style={{ width: 160 }}
            onChange={(value) =>
              update((save) => save.setItemQuantity(item.index, typeof value === 'number' ? value : 0))
            }
          />
        ),
    },
  ];

  if (MODIFIER_COLUMNS.has(category)) {
    columns.push({
      title: '词缀 / 强化值',
      dataIndex: 'modifier',
      width: 340,
      render: (_: unknown, item: ItemRow) => {
        if (item.modifierSlot === null || item.modifier === null || item.modifierValue === null) {
          return <span className="muted">-</span>;
        }
        return (
          <div style={{ display: 'flex', gap: 8 }}>
            <Select
              value={item.modifier}
              options={buildModifierOptions(item.modifier)}
              style={{ width: 200 }}
              onChange={(value) =>
                update((save) => {
                  if (item.modifierSlot === null) return;
                  save.setItemModifier(category, item.modifierSlot, value, item.modifierValue ?? 0);
                })
              }
            />
            <Tooltip title="强化值（攻击力 / 耐久 / 射程等，具体含义取决于词缀）">
              <InputNumber
                min={0}
                max={0xffffffff}
                value={item.modifierValue}
                style={{ width: 110 }}
                onChange={(value) =>
                  update((save) => {
                    if (item.modifierSlot === null) return;
                    save.setItemModifier(
                      category,
                      item.modifierSlot,
                      item.modifier ?? 0,
                      typeof value === 'number' ? value : 0,
                    );
                  })
                }
              />
            </Tooltip>
          </div>
        );
      },
    });
  }

  return (
    <div>
      <div className="toolbar" style={{ justifyContent: 'space-between' }}>
        <span className="muted">
          共 {items.length} 件 · 点击物品名可更换物品
          {category === 'clothes' && ' · 防具的数值列是染色'}
        </span>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setPicker({ mode: 'add' })}>
          添加物品
        </Button>
      </div>
      <Table
        rowKey="index"
        size="small"
        columns={columns}
        dataSource={items}
        pagination={false}
        locale={{ emptyText: '这一页还没有物品' }}
        scroll={{ x: 'max-content', ...(items.length > 40 ? { y: 560 } : {}) }}
      />
      <ItemPickerModal
        open={picker !== null}
        category={category}
        title={picker?.mode === 'edit' ? '更换物品' : '添加物品'}
        onCancel={() => setPicker(null)}
        onPick={handlePick}
      />
      <p className="muted" style={{ marginTop: 12 }}>
        提示：武器/弓/盾的词缀按该类物品在存档中的顺序一一对应，添加物品后如果顺序变化，请重新检查词缀。
        防具染色共 16 色，选「{getDyeLabel(0xffffffff)}」表示不改变原色。
      </p>
    </div>
  );
}
