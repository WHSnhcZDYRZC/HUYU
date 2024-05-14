import { Link, Outlet, history, useRouteData, useRouteProps, useRoutes } from 'umi';
import styles from './index.less';
import Menu from './components/Menu/Menu';
import { Button, ConfigProvider } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import useMenuStore from '@/store/menuStore';
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import HistoryStorage from '@/utils/HistoryStorage';
import { getUserInfo } from "@/api/user";
import FullLoading from './components/FullLoading/FullLoading';
import useFullLoading from '@/store/fullLoadingStore';

// 白名单
const WhiteList = ['/sso/', '/sso/login']

const goLogin = () => {
  const layoutItem = HistoryStorage.getItem('layout');
  HistoryStorage.clear();
  if (layoutItem) {
    HistoryStorage.setItem('layout', layoutItem);
  }
  history.push("/sso/login");
}

export default memo(() => {
  const breadcrumb = useMenuStore((state) => state.breadcrumb)
  const setCollapsed = useMenuStore((state) => state.setCollapsed)
  const collapsed = useMenuStore((state) => state.collapsed)
  const isFullLoadingShow = useFullLoading((state: any) => state.isFullLoadingShow)
  const setFullLoadingShow = useFullLoading((state: any) => state.setFullLoadingShow)
  const setUserInfo = useFullLoading((state: any) => state.setUserInfo)
  const _router = useRouteProps();

  const getHasPermission = async () => {
    try {
      // 没有 token
      const token = HistoryStorage.getItem("token")
      if (!token) return goLogin();

      // 鉴权
      let code, data = HistoryStorage.getSessionItem("userInfo");

      let permission = true;

      if (!data?.id) {
        ({ code, data } = await getUserInfo());
        permission = code === 200;
      }

      // 是否进入白名单
      const isWhiteList = WhiteList.includes(_router.originalPath);

      if (permission) {
        setUserInfo(data);
        HistoryStorage.setSessionItem("userInfo", data);

        // 有权限
        if (isWhiteList) {
          history.push("/");
        }

      } else {
        // 无权限
        return goLogin();
      }

    } catch (error) {
      return goLogin()
    }
  }

  useEffect(() => {
    getHasPermission().then(() => {
      setTimeout(() =>
        setFullLoadingShow(false)
        , 1000)
    })
  }, [_router.path])

  const layout = useMemo((): any => {
    return _router.layoutHidden ? <Outlet /> :
      <div className={styles.layout}>
        <Menu />
        <div id='rootMain' className={`main ${!collapsed ? 'width85' : 'width99'}`}>
          <div className='main-nav'>
            {
              window.innerWidth < 1150 ? "" : <Button onClick={() => setCollapsed(!collapsed)} type="dashed" icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} />
            }
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
    <>
      {
        isFullLoadingShow ? <FullLoading /> : ""
      }
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#cf5659',
          },
        }}
      >
        {isFullLoadingShow ? <></> : layout}
      </ConfigProvider>
    </>
  );
})
