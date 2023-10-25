import { defineConfig } from "umi";
import routes from "./src/config/router"

export default defineConfig({
  base: '/application', // 和基座中 activeRule 配置一致
  plugins: ['@umijs/plugins/dist/qiankun'],
  routes,
  npmClient: 'pnpm',
  qiankun: {
    slave: {},
  }
});
