import { beforeUpdateFile, shardingUpload } from '@/api/file';
import { packageParams } from '../utils/FileUtils';
import { ref } from 'vue';
import BigDataUpdateMessage from './BigDataUpdateMessage';

export enum InfoEnum {
    READY = "READY",
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
    AWAIT = 'AWAIT'
}

interface InfoDataInf {
    // fileName: string,
    // totalSize: number,
    // totalFileHash: string,
    // fileHash: string
    // totalNum: number
    // startSize: number
    // num: number
    status: InfoEnum

    // 失败次数
    failNum: number
    fn: Promise<any> | null
    [key: string]: any
}

// 浏览器最大并发数
const MAX_REQUEST_NUM = 6

export default class {
    // 成功队列
    successList: InfoDataInf[] = []

    // 失败队列
    errorList: InfoDataInf[] = []

    // 正在上传数组
    uploadList: InfoDataInf[] = []

    // 源数据
    RawData: InfoDataInf[] = []

    // 完成数
    resultNum = 0;

    MULRIPLE = 0;

    // isPause = ref(false);
    percent = ref(0);

    // 取消请求
    controller = new AbortController();

    callBack = () => { }

    constructor(infoData: InfoDataInf[], callBack: () => void) {
        this.RawData = infoData;
        this.MULRIPLE = +(100 / infoData.length).toFixed(2)
        BigDataUpdateMessage.showUploadProgress(this);
        this.assemblyRequest()
        this.callBack = callBack;
    }

    assemblyRequest() {
        if (this.RawData.length < MAX_REQUEST_NUM) {
            this.uploadList = this.RawData.map(v => ({
                ...v,
                status: InfoEnum.READY,
                failNum: 0
            }))

            this.uploadListHandler();
            return
        }

        if (this.resultNum > this.RawData.length - 1) return;

        const getNext = () => {
            const res = this.RawData[this.resultNum]
            res.status = InfoEnum.READY
            res.failNum = 0
            this.resultNum++
            return res;
        }

        this.uploadListHandler(
            getNext
        )
    }

    uploadListHandler(getNext?: () => InfoDataInf) {
        if (getNext) {
            if (this.uploadList.length < MAX_REQUEST_NUM) {
                const infoData = getNext()
                this.uploadList.push(infoData)

                // 这里形成蹦床函数，不会爆栈
                this.assemblyRequest();
            } else return;
        }

        this.send();
    }

    send() {
        this.uploadList
            .filter(v => v.status === InfoEnum.READY)
            .map(v => {
                v.status = InfoEnum.AWAIT
                v.fn = shardingUpload(packageParams(v), {
                    signal: this.controller.signal
                })
                return v;
            })
            .forEach(v => v.fn
                .then(
                    (res: any) => {
                        v.status = InfoEnum.SUCCESS
                        this.percent.value = Math.round(this.MULRIPLE + this.percent.value)
                        this.successList.push(v)

                        if (this.successList.length === this.RawData.length) {
                            this.callBack();
                        }
                    },

                    (error: any) => {
                        v.status = InfoEnum.ERROR
                        v.failNum++;
                        this.errorList.push(v)
                    }
                ).finally(() => {
                    // console.log(v);

                    if (this.RawData.length > MAX_REQUEST_NUM) {
                        // 剔除上传
                        this.uploadList = this.uploadList.filter(o => v.info.totalNum !== o.info.totalNum)

                        // 重新 push 队列
                        this.assemblyRequest()
                    }
                }))
    }

    pause() {
        this.controller.abort();
    }

    recover() {
        this.controller = new AbortController();

        this.RawData = this.RawData.filter(v => v.status === InfoEnum.SUCCESS)
        this.resultNum = this.RawData.length;

        this.RawData = [...this.RawData, ...this.errorList.map(v => ({
            ...v,
            failNum: 0,
            status: InfoEnum.AWAIT,
            fn: null
        }))]

        this.assemblyRequest();
    }
}