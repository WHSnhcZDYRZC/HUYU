import { Utils } from "@/utils";

export const qiankun = {
    async mount(props: any) {
        console.log("props", props);
        Utils.initUtils(props)
    },
    async bootstrap() {
        console.log('umi app bootstraped');
    },
    async afterMount(props: any) {
        console.log('umi app afterMount', props);
    },
};