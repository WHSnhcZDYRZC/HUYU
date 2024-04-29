import Request from "@/api";

export const mediumUpdateFile = (data: any) => Request({
    url: "/system/dataUpload",
    method: "post",
    data
})

export const beforeUpdateFile = (data: any) => Request({
    url: "/system/beforeUpload",
    method: "post",
    data
})

export const shardingUpload = (data: any, config: any) => Request({
    url: "/system/shardingUpload",
    method: "post",
    data,
    ...config
})

export const getFileList = (params: any) => Request({
    url: "/system/getFileList",
    params
})

