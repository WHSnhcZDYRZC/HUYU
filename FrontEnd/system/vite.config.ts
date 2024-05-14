import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import qiankun from 'vite-plugin-qiankun';
import vueJsx from '@vitejs/plugin-vue-jsx';
import ElementPlus from 'unplugin-element-plus/vite'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    base: env.VITE_BASE_URL, // 和基座中配置的activeRule一致
    server: {
      port: 5183,
      cors: true,
      // origin: 'http://localhost:3001',
    },
    resolve: {
      alias: {
        '@': '/src/',
        '@components': '/src/components/',
      }
    },
    plugins: [
      vue(),
      vueJsx(),
      qiankun('system', {
        // 配置qiankun插件
        useDevMode: true,
      }),
      ElementPlus()
    ],
  }
})