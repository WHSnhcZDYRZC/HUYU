import { Link, Outlet, history, useRouteData, useRouteProps, useRoutes } from 'umi';
import styles from './index.less';
import Menu from './components/Menu/Menu';
import { Button } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import useMenuStore from '@/store/menuStore';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import HistoryStorage from '@/utils/HistoryStorage';

// 白名单
const WhiteList = ['/sso/']

export default () => {
  const breadcrumb = useMenuStore((state) => state.breadcrumb)
  const setCollapsed = useMenuStore((state) => state.setCollapsed)
  const collapsed = useMenuStore((state) => state.collapsed)
  const _router = useRouteProps();

  const layout = useMemo((): any => {
    // HistoryStorage.setItem("token", 123)
    HistoryStorage.setItem("token", '')

    const isWhiteList = WhiteList.includes(_router.originalPath);
    const token = HistoryStorage.getItem("token")

    if (isWhiteList && !token) return <Outlet />;

    // 未登录
    if (!token) {
      return history.push("/sso/")
    } else if (token && isWhiteList) {
      return history.push("/")
    }

    return _router.layoutHidden ? <Outlet /> :
      <div className={styles.layout}>
        <Menu />
        <div id='rootMain' className={`main ${!collapsed ? 'width85' : 'width99'}`}>
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
  }, [_router])

  return (
    layout
  );
}
