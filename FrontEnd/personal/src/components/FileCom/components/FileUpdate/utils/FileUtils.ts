import { beforeUpdateFile, shardingUpload } from '@/api/file';
import '/spark-md5.min.js?url';
import FileWork from '@/works/FileWork/FileWork.ts?raw'
import { message } from 'ant-design-vue';
import { ref } from 'vue';
import BigDataUpdateMessage from '../class/BigDataUpdateMessage';
import BigDataUpdateHandler from '../class/BigDataUpdateHandler';

// 10G
export const MAX_FILE_SIZE = 1024 * 1000000 * 100;

// 10MB
export const MINI_FILE_SIZE = 1024 * 1000 * 10;

export enum ResFile {
    SUCCESS = 'success',
    ERROR = 'error'
}

export const packageParams = (data: any) => {
    const fm = new FormData();
    fm.append("fileStream", data.fileStream)
    fm.append("fileName", data.info.fileName)
    fm.append("totalSize", data.info.totalSize)
    fm.append("totalFileHash", data.info.totalFileHash)
    fm.append("fileHash", data.info.fileHash)
    fm.append("totalNum", data.info.totalNum)
    fm.append("startSize", data.info.startSize)
    fm.append("num", data.info.num)

    return fm;
}

export const getBigFileSimple = async (file: File) => new Promise((resolve) => {
    BigDataUpdateMessage.start();

    const webWork = new Worker(window.URL.createObjectURL(
        new Blob([FileWork], { type: 'application/javascript' })
    ))

    webWork.postMessage({
        file,
        SparkMD5URL: import.meta.url.split('src')[0] + 'spark-md5.min.js?url',
        type: 'HASH'
    })

    webWork.onmessage = async e => {
        const { data } = e;

        console.log("data", data);

        const res: any = await verifyFile({
            fileHash: data.totalFileHash
        })

        if (res.message === "文件已存在") {
            return resolve(ResFile.SUCCESS);
        }

        new BigDataUpdateHandler(data.resultInfo, () => resolve(ResFile.SUCCESS));
    }
})

export const getFileSimple = async (file: File) => {
    const end: any = await readFileHandler(file)

    const { code, message }: any = await verifyFile({
        fileName: file.name,
        fileHash: end,
        fileSize: file.size
    })

    return {
        state: message === "文件已存在" ? ResFile.SUCCESS : ResFile.ERROR,
        hash: end,
    };
}

const readFileHandler = (file: File) => new Promise((resolve) => {
    const spark = new SparkMD5.ArrayBuffer();
    const fr = new FileReader();
    fr.readAsArrayBuffer(file);
    fr.onload = e => {
        spark.append(e.target?.result)
        resolve(spark.end())
    }
})

const verifyFile = async ({ fileName, fileHash, fileSize }: any) => {
    const res = await beforeUpdateFile({
        fileName,
        fileHash,
        fileSize,
    })

    return res;
}