import { Card, Tag, Typography } from 'antd';
import { ArrowRightOutlined, SafetyCertificateOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { GAMES } from '../games/registry';

/** 首页：修改器集合入口 */
export function HomePage() {
  return (
    <div>
      <section className="hero">
        <Typography.Title level={2} style={{ marginBottom: 8 }}>
          在线存档修改器
        </Typography.Title>
        <Typography.Paragraph type="secondary" style={{ marginBottom: 4 }}>
          用浏览器直接修改主机游戏存档，纯前端实现，打开即用，存档文件不会离开本机。
        </Typography.Paragraph>
        <div className="hero-badges">
          <span>
            <SafetyCertificateOutlined /> 本地处理，不上传存档
          </span>
          <span>
            <ThunderboltOutlined /> 无需安装，改完直接下载
          </span>
        </div>
      </section>

      <section>
        <div className="section-head">
          <Typography.Title level={4} style={{ margin: 0 }}>
            全部修改器
          </Typography.Title>
          <Typography.Text type="secondary">{GAMES.length} 款游戏</Typography.Text>
        </div>
        <div className="game-grid">
          {GAMES.map((game) => (
            <Link key={game.id} to={game.path} className="game-card">
              <div
                className="game-card-cover"
                style={game.thumbnail ? undefined : { background: game.coverGradient }}
              >
                {game.thumbnail ? (
                  <img src={game.thumbnail} alt={game.title} />
                ) : (
                  <span className="game-card-cover-icon">{game.coverIcon}</span>
                )}
              </div>
              <div className="game-card-body">
                <div className="game-card-title">
                  <span>{game.title}</span>
                  <ArrowRightOutlined />
                </div>
                <div className="game-card-subtitle">{game.subtitle}</div>
                <div className="game-card-platforms">
                  {game.platforms.map((platform) => (
                    <Tag key={platform} color="blue">
                      {platform}
                    </Tag>
                  ))}
                  <Tag color="green">可用</Tag>
                </div>
                <Typography.Paragraph type="secondary" className="game-card-desc">
                  {game.description}
                </Typography.Paragraph>
                <div className="game-card-tags">
                  {game.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 32 }}>
        <Card size="small" className="home-note">
          <Typography.Text type="secondary">
            使用方式：进入对应游戏的修改器页面 → 拖入单个存档文件（例如旷野之息的 game_data.sav）→ 修改 →
            点「保存文件」下载 → 覆盖回主机存档目录。修改前请先备份。
          </Typography.Text>
        </Card>
      </section>
    </div>
  );
}
