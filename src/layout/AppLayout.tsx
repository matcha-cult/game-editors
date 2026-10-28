import { Button } from 'antd';
import { GithubOutlined, HomeOutlined, SaveOutlined } from '@ant-design/icons';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

const REPO_URL = 'https://github.com/matcha-cult/game-editors';

/** 站点外壳：顶部导航 + 路由内容 + 页脚 */
export function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  return (
    <div className="app-shell">
      <header className="app-header">
        <Link to="/" className="brand">
          <span className="brand-mark" aria-hidden="true">
            <SaveOutlined />
          </span>
          <span className="brand-text">
            <strong>在线存档修改器</strong>
            <small>Online Save Editors</small>
          </span>
        </Link>
        <div style={{ flex: 1 }} />
        {!isHome && (
          <Button type="text" icon={<HomeOutlined />} onClick={() => navigate('/')}>
            全部修改器
          </Button>
        )}
        <Button type="text" icon={<GithubOutlined />} href={REPO_URL} target="_blank" rel="noreferrer">
          项目仓库
        </Button>
      </header>

      <main className="app-main">
        <Outlet />
      </main>

      <footer className="app-footer">
        <span>纯前端实现 · 存档只在本地浏览器解析，不会上传</span>
        <span>修改前请务必备份原始存档</span>
      </footer>
    </div>
  );
}
