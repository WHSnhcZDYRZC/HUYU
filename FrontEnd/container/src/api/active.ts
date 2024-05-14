import Request from "@/api";

export const getArticleMenu = (params: any) => Request({
    url: "/article/getArticleMenu",
    params,
})

export const searchArticleMenu = (params: any) => Request({
    url: "/article/searchArticleMenu",
    params,
})

export const deleteArticleMenu = (params: any) => Request({
    url: "/article/delete",
    params
})