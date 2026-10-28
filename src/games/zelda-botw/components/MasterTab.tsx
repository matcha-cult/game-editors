import { useEffect, useMemo, useState } from 'react';
import { Alert, Input, InputNumber, Select, Spin, Switch, Table, Tooltip, Typography } from 'antd';
import {
  HASHES_PER_PAGE,
  MASTER_FILTERS,
  collectHashRecords,
  expandMasterFields,
  parseHashTable,
  readMasterValue,
  writeMasterValue,
  type HashEntry,
  type MasterField,
} from '../core/masterHashes';
import type { SaveGameApi } from '../state/useSaveGame';

interface MasterTabProps {
  game: SaveGameApi;
}

/** 高级编辑：把存档里所有已知哈希记录列出来，按类型提供输入控件 */
export function MasterTab({ game }: MasterTabProps) {
  const [hashTable, setHashTable] = useState<Map<number, HashEntry> | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [presetIndex, setPresetIndex] = useState(0);
  const [customFilter, setCustomFilter] = useState('');
  const [page, setPage] = useState(1);
  const [, forceRender] = useState(0);

  useEffect(() => {
    let cancelled = false;
    fetch('assets/zelda-botw.hashes.csv')
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.text();
      })
      .then((text) => {
        if (!cancelled) setHashTable(parseHashTable(text));
      })
      .catch((cause: unknown) => {
        if (!cancelled) setLoadError(cause instanceof Error ? cause.message : '哈希表加载失败');
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const save = game.save;

  const records = useMemo(() => {
    if (!save || !hashTable) return [];
    return collectHashRecords(save.saveFile, hashTable);
  }, [save, hashTable]);

  const fields = useMemo(() => {
    if (!save || records.length === 0) return [];
    return expandMasterFields(save.saveFile, records);
  }, [save, records]);

  const filtered = useMemo(() => {
    const preset = MASTER_FILTERS[presetIndex]?.pattern ?? '';
    const pattern = preset || customFilter.trim();
    if (!pattern) return fields;
    try {
      const regex = new RegExp(pattern, presetIndex === 0 ? 'i' : '');
      return fields.filter((field) => regex.test(field.id));
    } catch {
      return fields;
    }
  }, [fields, presetIndex, customFilter]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / HASHES_PER_PAGE));
  const currentPage = Math.min(page, pageCount);
  const pageFields = filtered.slice((currentPage - 1) * HASHES_PER_PAGE, currentPage * HASHES_PER_PAGE);

  if (loadError) {
    return <Alert type="error" showIcon message="哈希表加载失败" description={loadError} />;
  }
  if (!hashTable) {
    return (
      <div style={{ padding: 48, textAlign: 'center' }}>
        <Spin tip="高级编辑加载中…" />
      </div>
    );
  }
  if (!save) {
    return <Alert type="warning" showIcon message="请先载入存档" />;
  }

  const commit = (field: MasterField, value: number | boolean | string) => {
    writeMasterValue(save.saveFile, field, value);
    forceRender((current) => current + 1);
  };

  const columns = [
    {
      title: '名称',
      dataIndex: 'id',
      render: (_: unknown, field: MasterField) => (
        <Tooltip title={field.key}>
          <Typography.Text style={{ fontFamily: 'monospace', fontSize: 12 }}>{field.key}</Typography.Text>
        </Tooltip>
      ),
    },
    {
      title: '类型',
      dataIndex: 'kind',
      width: 110,
      render: (_: unknown, field: MasterField) => (
        <Typography.Text type="secondary" style={{ fontSize: 12 }}>
          {field.kind}
        </Typography.Text>
      ),
    },
    {
      title: '值',
      dataIndex: 'value',
      width: 300,
      render: (_: unknown, field: MasterField) => {
        const value = readMasterValue(save.saveFile, field);
        if (field.kind === 'bool') {
          return (
            <Switch
              size="small"
              checked={Boolean(value)}
              onChange={(checked) => commit(field, checked)}
            />
          );
        }
        if (field.kind === 's32' || field.kind === 'f32') {
          return (
            <InputNumber
              style={{ width: 240 }}
              step={field.kind === 'f32' ? 0.001 : 1}
              value={value as number}
              onChange={(next) => commit(field, typeof next === 'number' ? next : 0)}
            />
          );
        }
        if (field.kind === 'string' || field.kind === 'string64' || field.kind === 'string256') {
          return (
            <Input
              style={{ width: 240 }}
              value={String(value)}
              onChange={(event) => commit(field, event.target.value)}
            />
          );
        }
        return <span className="muted">0x{(Number(value) >>> 0).toString(16)}</span>;
      },
    },
  ];

  return (
    <div>
      <Alert
        type="warning"
        showIcon
        style={{ marginBottom: 12 }}
        message="这里是原始哈希表编辑器，直接改写存档数据；不认识的键不要随意修改。"
      />
      <div className="toolbar">
        <Select
          value={presetIndex}
          style={{ width: 200 }}
          options={MASTER_FILTERS.map((filter, index) => ({ value: index, label: filter.label }))}
          onChange={(value) => {
            setPresetIndex(value);
            setPage(1);
          }}
        />
        <Input
          allowClear
          placeholder="自定义正则筛选哈希名，例如 ^Location_"
          style={{ width: 320 }}
          value={customFilter}
          disabled={presetIndex !== 0}
          onChange={(event) => {
            setCustomFilter(event.target.value);
            setPage(1);
          }}
        />
        <Typography.Text type="secondary">
          共 {filtered.length} 条 · 第 {currentPage}/{pageCount} 页
        </Typography.Text>
      </div>
      <Table
        rowKey={(field: MasterField) => `${field.key}-${field.valueOffset}`}
        size="small"
        columns={columns}
        dataSource={pageFields}
        pagination={{
          current: currentPage,
          pageSize: HASHES_PER_PAGE,
          total: filtered.length,
          showSizeChanger: false,
          onChange: setPage,
        }}
        locale={{ emptyText: '没有匹配的记录' }}
        scroll={{ x: 'max-content' }}
      />
    </div>
  );
}
