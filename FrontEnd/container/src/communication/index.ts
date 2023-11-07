import { initGlobalState } from 'qiankun';
import { history } from 'umi'

// 初始化 state
let state = {
  // 容器名称
  sso: {
    changeRouter: (path) => history.push(path)
  },
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
