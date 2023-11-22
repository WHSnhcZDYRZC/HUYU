import { message } from 'ant-design-vue';
import { ref, h, createVNode } from 'vue';
import { Progress, Button } from 'ant-design-vue';
import { PauseOutlined, CaretRightOutlined } from '@ant-design/icons-vue'
import UploadProgress from '../../UploadProgress/UploadProgress.vue';
import BigDataUpdateHandler from './BigDataUpdateHandler';

export default class {
    /**
     * 开始
     * @param content 展示内容
     * @param duration 持续时间 单位 s
     */
    static start(content: string | any = "文件正在初始化，请勿关闭页面...", duration: number = 0) {
        message.loading({
            content,
            duration,
            class: "upload-message",
        })
    }

    static showUploadProgress = (_this: BigDataUpdateHandler) => {
        message.destroy()
        this.start(
            () => createVNode(UploadProgress, {
                handler: _this
            })
        )
    }

    static success(content: string = "文件上传成功") {
        message.destroy()
        message.success(content)
    }

    static error(content: string = "文件上传失败") {
        message.destroy()
        message.success(content)
    }
}