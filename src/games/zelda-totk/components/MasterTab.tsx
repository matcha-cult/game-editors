import { useEffect, useMemo, useState } from 'react';
import { Alert, Input, InputNumber, Spin, Table, Tag, Tooltip, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { parseTotkHashNames, type MasterEntry } from '../core/totkSave';
import { toHex32 } from '../core/murmur3';
import type { TotkApi } from '../state/useTotkSave';

interface MasterTabProps {
  api: TotkApi;
}

const PAGE_SIZE = 100;

/** 高级编辑：把哈希表里的每一条原始变量列出来，可直接改写 u32 / f32 */
export function MasterTab({ api }: MasterTabProps) {
  const [hashNames, setHashNames] = useState<Map<number, { name: string; type: string }> | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [revision, setRevision] = useState(0);

  useEffect(() => {
    let cancelled = false;
    fetch('assets/totk/hashes.csv')
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.text();
      })
      .then((text) => {
        if (!cancelled) setHashNames(parseTotkHashNames(text));
      })
      .catch((cause: unknown) => {
        if (!cancelled) setLoadError(cause instanceof Error ? cause.message : '哈希表加载失败');
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const save = api.save;

  const entries = useMemo(() => {
    if (!save) return [];
    return save.listMasterEntries(hashNames ?? undefined);
  }, [save, hashNames, revision]);

  const filtered = useMemo(() => {
    const lower = keyword.trim().toLowerCase();
    if (!lower) return entries;
    return entries.filter(
      (entry) => (entry.name ?? '').toLowerCase().includes(lower) || entry.hashHex.includes(lower),
    );
  }, [entries, keyword]);

  if (loadError) return <Alert type="error" showIcon message="哈希表加载失败" description={loadError} />;
  if (!hashNames) {
    return (
      <div style={{ padding: 48, textAlign: 'center' }}>
        <Spin tip="哈希表加载中…" />
      </div>
    );
  }
  if (!save) return <Alert type="warning" showIcon message="请先载入存档" />;

  const columns = [
    {
      title: '变量',
      dataIndex: 'name',
      render: (_: unknown, entry: MasterEntry) => (
        <Tooltip title={`${entry.hashHex} · 偏移 ${toHex32(entry.valueOffset)}`}>
          <Typography.Text style={{ fontFamily: 'monospace', fontSize: 12 }}>
            {entry.name ?? entry.hashHex}
          </Typography.Text>
        </Tooltip>
      ),
    },
    {
      title: '类型',
      dataIndex: 'type',
      width: 90,
      render: (_: unknown, entry: MasterEntry) =>
        entry.type ? <Tag>{entry.type}</Tag> : <Typography.Text type="secondary">-</Typography.Text>,
    },
    {
      title: '数值（u32）',
      dataIndex: 'u32',
      width: 190,
      render: (_: unknown, entry: MasterEntry) => (
        <InputNumber
          style={{ width: 160 }}
          value={entry.u32}
          min={0}
          max={0xffffffff}
          onChange={(value) => {
            save.setMasterValue(entry, typeof value === 'number' ? value : 0);
            setRevision((current) => current + 1);
          }}
        />
      ),
    },
    {
      title: '按浮点显示（f32）',
      dataIndex: 'f32',
      width: 220,
      render: (_: unknown, entry: MasterEntry) => (
        <InputNumber
          style={{ width: 190 }}
          step={0.001}
          value={Number(entry.f32.toFixed(4))}
          onChange={(value) => {
            save.setMasterFloat(entry, typeof value === 'number' ? value : 0);
            setRevision((current) => current + 1);
          }}
        />
      ),
    },
    {
      title: '十六进制',
      width: 120,
      render: (_: unknown, entry: MasterEntry) => (
        <Typography.Text type="secondary" style={{ fontFamily: 'monospace', fontSize: 12 }}>
          {toHex32(entry.u32)}
        </Typography.Text>
      ),
    },
  ];

  return (
    <div>
      <Alert
        type="warning"
        showIcon
        style={{ marginBottom: 12 }}
        message="这里是存档哈希表的原始视图：每一行都是文件里的一条 (哈希, 值)。不认识的变量不要随意改。"
      />
      <div className="toolbar">
        <Input
          allowClear
          prefix={<SearchOutlined />}
          placeholder="按变量名或哈希过滤，例如 IsGet / fbe01da1"
          style={{ width: 380 }}
          value={keyword}
          onChange={(event) => {
            setKeyword(event.target.value);
            setPage(1);
          }}
        />
        <Typography.Text type="secondary">
          共 {filtered.length} 条 / 哈希表识别 {hashNames.size} 个名称
        </Typography.Text>
      </div>
      <Table
        rowKey={(entry: MasterEntry) => `${entry.hashHex}-${entry.valueOffset}`}
        size="small"
        columns={columns as never}
        dataSource={filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)}
        pagination={{
          current: page,
          pageSize: PAGE_SIZE,
          total: filtered.length,
          showSizeChanger: false,
          onChange: setPage,
        }}
        scroll={{ x: 'max-content' }}
      />
    </div>
  );
}
