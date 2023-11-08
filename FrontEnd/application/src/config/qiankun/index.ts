import { Utils } from "@/utils";

export const qiankun = {
    async mount(props: any) {
        Utils.initUtils(props)
    },
    async bootstrap() {
        console.log('umi app bootstraped');
    },
    async afterMount(props: any) {
        console.log('umi app afterMount', props);
    },
};