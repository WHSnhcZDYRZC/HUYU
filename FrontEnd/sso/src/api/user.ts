import Request from "@/api";

export const loginApi = (data: any) => Request({
    url: "/login",
    method: "post",
    data
})