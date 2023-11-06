import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper';

import 'ant-design-vue/dist/reset.css';
import Antd from 'ant-design-vue';

let app: any;
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
    createApp(App)
        .use(router)
        .use(Antd)
        .mount('#app');
} else {
    renderWithQiankun({
        // 子应用挂载
        mount(props: any) {
            app = createApp(App);
            app
                .use(router)
                .use(Antd)
                .mount(props.container.querySelector('#app'));
        },
        // 只有子应用第一次加载会触发
        bootstrap() {
            // console.log('vue app bootstrap');
        },
        // 更新
        update() {
            // console.log('vue app update');
        },
        // 卸载
        unmount() {
            // console.log('vue app unmount');
            app?.unmount();
        },
    });
}
