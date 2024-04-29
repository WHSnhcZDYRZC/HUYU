import Request from "@/api";

export const getArticleMenu = (params: any) => Request({
    url: "/article/getArticleMenu",
    params,
})