import { Link, Outlet } from 'umi';
import styles from './index.less';
import Menu from './components/Menu/Menu';
import { Button } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import useMenuStore from '@/store/menuStore';

export default () => {
  const breadcrumb = useMenuStore((state) => state.breadcrumb)
  const setCollapsed = useMenuStore((state) => state.setCollapsed)
  const collapsed = useMenuStore((state) => state.collapsed)

  return (
    <div className={styles.layout}>
      <Menu />
      <div className='main' style={collapsed ? {
        width: "95%"
      } : {
        width: "85%"
      }}>
        <div className='main-nav'>
          <Button onClick={() => setCollapsed(!collapsed)} type="dashed" icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} />
          <p>
            {breadcrumb}
          </p>
        </div>
        <div className='main-con'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
