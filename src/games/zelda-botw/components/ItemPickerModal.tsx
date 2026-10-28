import { useEffect, useMemo, useState } from 'react';
import { Input, List, Modal, Select, Tag, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { ITEM_CATEGORY_LABELS, ITEM_OPTIONS, TAB_ORDER, type ItemCategory } from '../core/botwSave';
import { ItemIcon } from './ItemIcon';

interface ItemPickerModalProps {
  open: boolean;
  category: ItemCategory;
  title: string;
  onCancel: () => void;
  onPick: (itemId: string) => void;
}

/** 物品选择器：按分类分组、支持搜索，参考原编辑器的物品下拉框 */
export function ItemPickerModal({ open, category, title, onCancel, onPick }: ItemPickerModalProps) {
  const [activeCategory, setActiveCategory] = useState<ItemCategory>(category);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    if (open) {
      setActiveCategory(category);
      setKeyword('');
    }
  }, [open, category]);

  const options = useMemo(() => {
    const lower = keyword.trim().toLowerCase();
    return ITEM_OPTIONS.filter((option) => {
      if (option.category !== activeCategory) return false;
      if (!lower) return true;
      return option.label.toLowerCase().includes(lower) || option.id.toLowerCase().includes(lower);
    });
  }, [activeCategory, keyword]);

  return (
    <Modal open={open} title={title} onCancel={onCancel} footer={null} width={620} destroyOnHidden>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <Select
          value={activeCategory}
          style={{ width: 150 }}
          options={TAB_ORDER.map((entry) => ({ value: entry, label: ITEM_CATEGORY_LABELS[entry] }))}
          onChange={(value) => setActiveCategory(value)}
        />
        <Input
          allowClear
          prefix={<SearchOutlined />}
          placeholder="搜索中文名或内部 ID"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
        />
      </div>
      <div style={{ maxHeight: 420, overflowY: 'auto' }}>
        <List
          size="small"
          dataSource={options}
          locale={{ emptyText: '没有匹配的物品' }}
          renderItem={(option) => (
            <List.Item
              style={{ cursor: 'pointer' }}
              onClick={() => onPick(option.id)}
              extra={<Typography.Text type="secondary">{option.id}</Typography.Text>}
            >
              <div className="item-name-cell">
                <ItemIcon itemId={option.id} size={32} />
                <span>{option.label}</span>
                <Tag>{ITEM_CATEGORY_LABELS[option.category]}</Tag>
              </div>
            </List.Item>
          )}
        />
      </div>
    </Modal>
  );
}
