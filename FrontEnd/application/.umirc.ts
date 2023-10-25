import { defineConfig } from "umi";

export default defineConfig({
  base: '/application', // 和基座中 activeRule 配置一致
  plugins: ['@umijs/plugins/dist/qiankun'],
  routes: [
    { path: "/", component: "index" },
  ],
  npmClient: 'pnpm',
  qiankun: {
    slave: {},
  }
});
