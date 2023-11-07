import { defineConfig } from "umi";
import routes from './src/config/router';

const BASE_API = process.env.UMI_APP_BASE_API;

export default defineConfig({
  qiankun: {
    master: {},
  },
  plugins: ['@umijs/plugins/dist/qiankun'],
  routes,
  npmClient: 'pnpm',
  proxy: {
    [BASE_API as string]: {
      target: process.env.UMI_APP_PROXY_URL,
      changeOrigin: true,
      pathRewrite: { [`^${BASE_API}` as string]: '' },
    },
  },
  favicons: [
    "/icon.svg"
  ]
});
