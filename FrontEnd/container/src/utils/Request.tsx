import { getDvaApp } from 'umi';
import HistoryStorage from './HistoryStorage';

import { USER_STORAGE_NAME } from '@/models/User';
import { getLocale } from '@umijs/max';
import { message } from 'antd';
import { getActiveEnterprise } from './index';

// 与后端约定的响应数据格式
interface ResponseStructure {
  success: boolean;
  data: any;
  errorCode?: number;
  errorMessage?: string;
}

enum ErrorType {
  UNAUTHORIZED = 401,
}
const urlParamsTest = /[?&=]+/g;
// 运行时配置
export default {
  baseURL: '/gateway/',
  timeout: 60000,
  headers: { 'Content-Type': 'application/json;charset=utf-8' },

  errorConfig: {
    errorThrower: (res: ResponseStructure) => {
      console.log('res', res);

      return res;
    },
    errorHandler: (error: any, opts: any) => {
      const { dispatch } = getDvaApp()._store;

      switch (error.response.status) {
        case ErrorType.UNAUTHORIZED:
          console.log('无权限');
          dispatch({
            type: 'user/removeUser',
          });
          break;

        default:
          message.error({
            content: error.response.data.message,
          });
          break;
      }
    },
  },

  // 请求拦截器
  requestInterceptors: [
    (config: any) => {
      config.headers.Authorization = 'Bearer ' + HistoryStorage.getItem('token') || null;

      config.headers.user =
        HistoryStorage.getItem(USER_STORAGE_NAME)?.id ||
        HistoryStorage.getItem('userInfo')?.id ||
        null;

      // 这里后端逻辑是有点问题的
      if (getActiveEnterprise()?.id) {
        config.headers['X-Tenant-Id'] = getActiveEnterprise()?.id;
      }
      config.headers.resource_type = 2;

      // 添加语言参数
      let { url = '' } = config;
      const lang = getLocale();
      const langParams = `${urlParamsTest.test(url) ? '&' : '?'}lang=${lang || 'zh-CN'}`;
      config.url = `${url}${langParams}`;

      return { ...config };
    },
  ],

  // 响应拦截器
  responseInterceptors: [
    (response: any) => {
      return response;
    },
  ],
};
