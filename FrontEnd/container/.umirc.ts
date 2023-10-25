import { defineConfig } from "umi";
import routes from './src/config/router';

export default defineConfig({
  qiankun: {
    master: {},
  },
  plugins: ['@umijs/plugins/dist/qiankun'],
  routes,
  npmClient: 'pnpm',
});
