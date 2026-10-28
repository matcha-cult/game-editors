import { InputNumber, Select, Tag, Typography } from 'antd';
import {
  TOTK_ENERGY_OPTIONS,
  TOTK_HEART_OPTIONS,
  TOTK_STAMINA_OPTIONS,
  type TotkSnapshot,
} from '../core/totkSave';
import { t } from '../core/labels';
import type { TotkApi } from '../state/useTotkSave';

interface StatusTabProps {
  api: TotkApi;
  snapshot: TotkSnapshot;
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="stat-row">
      <span className="stat-label">{label}</span>
      <div className="stat-value-row">{children}</div>
    </div>
  );
}

function withFallback<T extends { value: number }>(options: readonly T[], value: number): T[] {
  const list = [...options];
  if (!list.some((option) => option.value === value)) {
    list.push({ value, label: `未知值 ${value}` } as unknown as T);
  }
  return list;
}

export function StatusTab({ api, snapshot }: StatusTabProps) {
  const { update } = api;

  return (
    <div>
      <h3 className="section-title red">状态</h3>
      <Row label={t('Game version')}>
        <Tag color="blue">{snapshot.version}</Tag>
        {snapshot.gameMod && <Tag color="orange">改版存档</Tag>}
      </Row>
      <Row label={t('Playtime')}>
        <Tag color="geekblue" style={{ fontSize: 14, padding: '2px 10px' }}>
          {snapshot.playtime}
        </Tag>
      </Row>
      <Row label={t('Rupees')}>
        <InputNumber
          min={0}
          max={999999}
          value={snapshot.rupees}
          style={{ width: 180 }}
          onChange={(value) => update((save) => save.setRupees(typeof value === 'number' ? value : 0))}
        />
      </Row>
      <Row label={t('Max. hearts')}>
        <Select
          value={snapshot.maxLife}
          options={withFallback(TOTK_HEART_OPTIONS, snapshot.maxLife)}
          style={{ width: 200 }}
          onChange={(value) => update((save) => save.setMaxLife(value))}
        />
      </Row>
      <Row label={t('Max. stamina')}>
        <Select
          value={snapshot.maxStamina}
          options={withFallback(TOTK_STAMINA_OPTIONS, snapshot.maxStamina)}
          style={{ width: 200 }}
          onChange={(value) => update((save) => save.setMaxStamina(value))}
        />
      </Row>
      <Row label={t('Battery size')}>
        <Select
          value={Math.round(snapshot.maxEnergy)}
          options={withFallback(TOTK_ENERGY_OPTIONS, Math.round(snapshot.maxEnergy))}
          style={{ width: 200 }}
          onChange={(value) => update((save) => save.setMaxEnergy(value))}
        />
      </Row>
      <Row label={t('Pony points')}>
        <InputNumber
          min={0}
          max={9999}
          value={snapshot.ponyPoints}
          style={{ width: 180 }}
          onChange={(value) => update((save) => save.setPonyPoints(typeof value === 'number' ? value : 0))}
        />
      </Row>

      <h3 className="section-title green" style={{ marginTop: 28 }}>
        {t('Pouch size')}
      </h3>
      <Row label={t('Sword pouch size')}>
        <InputNumber
          min={0}
          max={20}
          value={snapshot.pouchSizes.swords}
          style={{ width: 140 }}
          onChange={(value) =>
            update((save) => save.setPouchSize('swords', typeof value === 'number' ? value : 0))
          }
        />
      </Row>
      <Row label={t('Bow pouch size')}>
        <InputNumber
          min={0}
          max={14}
          value={snapshot.pouchSizes.bows}
          style={{ width: 140 }}
          onChange={(value) => update((save) => save.setPouchSize('bows', typeof value === 'number' ? value : 0))}
        />
      </Row>
      <Row label={t('Shield pouch size')}>
        <InputNumber
          min={0}
          max={19}
          value={snapshot.pouchSizes.shields}
          style={{ width: 140 }}
          onChange={(value) =>
            update((save) => save.setPouchSize('shields', typeof value === 'number' ? value : 0))
          }
        />
      </Row>

      <h3 className="section-title blue" style={{ marginTop: 28 }}>
        {t("Link's position")}
      </h3>
      <Row label={`${t('Coordinates')} (X / Y / Z)`}>
        {(['x', 'y', 'z'] as const).map((axis) => (
          <InputNumber
            key={axis}
            step={0.1}
            precision={3}
            value={Number(snapshot.position[axis].toFixed(3))}
            style={{ width: 140 }}
            onChange={(value) =>
              update((save) => save.setPosition(axis, typeof value === 'number' ? value : 0))
            }
          />
        ))}
      </Row>
      <Typography.Paragraph type="secondary" style={{ marginTop: 16, fontSize: 12 }}>
        TOTK 的存档坐标做过轴变换：编辑器里显示的是游戏内坐标，写入时会自动换算回文件内的原始朝向。
      </Typography.Paragraph>
    </div>
  );
}
