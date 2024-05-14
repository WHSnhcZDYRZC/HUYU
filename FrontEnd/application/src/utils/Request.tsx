// import { getDvaApp } from 'umi';
// import HistoryStorage from './HistoryStorage';
// import { message } from 'antd';

// // 与后端约定的响应数据格式
// interface ResponseStructure {
//   success: boolean;
//   data: any;
//   errorCode?: number;
//   errorMessage?: string;
// }

// enum ErrorType {
//   UNAUTHORIZED = 401,
// }
// const urlParamsTest = /[?&=]+/g;
// // 运行时配置
// export default {
//   baseURL: '/gateway/',
//   timeout: 60000,
//   headers: { 'Content-Type': 'application/json;charset=utf-8' },

//   errorConfig: {
//     errorThrower: (res: ResponseStructure) => {
//       console.log('res', res);

//       return res;
//     },
//     errorHandler: (error: any, opts: any) => {
//       const { dispatch } = getDvaApp()._store;

//       switch (error.response.status) {
//         case ErrorType.UNAUTHORIZED:
//           console.log('无权限');
//           dispatch({
//             type: 'user/removeUser',
//           });
//           break;

//         default:
//           message.error({
//             content: error.response.data.message,
//           });
//           break;
//       }
//     },
//   },

//   // 请求拦截器
//   requestInterceptors: [
//     (config: any) => {
//       config.headers.Authorization = 'Bearer ' + HistoryStorage.getItem('token') || null;

//       console.log("aaaaaaa");

//       return { ...config };
//     },
//   ],

//   // 响应拦截器
//   responseInterceptors: [
//     (response: any) => {
//       return response;
//     },
//   ],
// };
