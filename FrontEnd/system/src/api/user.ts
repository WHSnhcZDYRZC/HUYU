import Request from "@/api";

export const setUserInfo = (data: any) => Request({
    url: "/personal/setUserInfo",
    method: "post",
    data
})

export const getUserList = (params: any) => Request({
    url: "/personal/getUserList",
    params
})