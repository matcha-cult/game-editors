import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

/** 未知路由：提示并回到首页 */
export function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title="没有这个修改器"
      subTitle="地址可能输错了，或者该游戏还没有收录。"
      extra={
        <Button type="primary" onClick={() => navigate('/')}>
          返回首页
        </Button>
      }
    />
  );
}
