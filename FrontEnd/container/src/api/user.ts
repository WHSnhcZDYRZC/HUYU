import Request from "@/api";

export const getUserInfo = () => Request({
    url: "/personal/getUserInfo",
})