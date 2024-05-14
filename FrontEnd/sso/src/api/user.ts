import Request from "@/api";

export const loginApi = (data: any) => Request({
    url: "/login",
    method: "post",
    data
})

export const register = (data: any) => Request({
    url: "/register",
    method: "post",
    data
})

export const getUserInfo = () => Request({
    url: "/getUserInfo",
})