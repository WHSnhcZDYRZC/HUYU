import useMenuStore, { MenuItemInf, MenuStateInf } from '@/store/menuStore';
import { findObjectByPath } from '@/utils';
import { initGlobalState } from 'qiankun';
import { history } from 'umi'

// 初始化 state
let state = {
  // 容器名称
  sso: {
    changeRouter: (path: string) => history.push(path)
  },

  application: {
    setBreadcrumb: (titleStr: string = "HuYu 笔记") => {
      const _pageRouters = useMenuStore.getState().pageRouters
      const activeRouter = findObjectByPath(_pageRouters, history.location.pathname)

      document.title = titleStr;
      activeRouter.label = titleStr;
      useMenuStore.setState({ breadcrumb: titleStr })
      useMenuStore.setState({ pageRouters: JSON.parse(JSON.stringify(_pageRouters)) })
    },

    getActiveRouter: () => useMenuStore.getState().activeRouter,
    setActiveRouter: (activeRouter: MenuItemInf) => {
      const _pageRouters = useMenuStore.getState().pageRouters
      useMenuStore.setState({ activeRouter })

      const router = findObjectByPath(_pageRouters, activeRouter.routerPath)
      router.id = activeRouter.id;
      router.key = activeRouter.id;
      router.label = activeRouter.title;

      console.log("_pageRouters", _pageRouters);
      // console.log("router", router, activeRouter);

      useMenuStore.setState({ pageRouters: JSON.parse(JSON.stringify(_pageRouters)) })
    }
  }
};

const actions: any = initGlobalState(state);

actions.onGlobalStateChange((_state: any, prev: any) => {
  // state: 变更后的状态; prev 变更前的状态
  // console.log('=======> 容器：', _state, prev);
  state = _state;

  // console.log("state", state);
});

actions.setGlobalState(state);

// actions.offGlobalStateChange();
actions.getState = () => state;

actions.install = (initQiankun: any) => {
  initQiankun.apps.forEach((v: any) => {
    v.props['getActions'] = actions.getState;
  });

  return initQiankun;
};

export default actions;
