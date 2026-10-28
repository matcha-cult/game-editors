import { Route, Routes } from 'react-router-dom';
import { GAMES } from './games/registry';
import { AppLayout } from './layout/AppLayout';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';

/**
 * 路由表（Hash 路由，见 main.tsx）：
 *   #/                → 修改器集合首页
 *   #/zelda-botw      → 旷野之息存档修改器
 *   #/...             → 404
 */
export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        {GAMES.map(({ id, path, Component }) => (
          <Route key={id} path={path.replace(/^\//, '')} element={<Component />} />
        ))}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
