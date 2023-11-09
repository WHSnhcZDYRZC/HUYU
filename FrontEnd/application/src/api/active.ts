import Request from "@/api";
import { articleSaveParams } from "@/pages/Core/Core";

export const saveOrUpdate = (data: articleSaveParams) => Request({
    method: "post",
    url: "/article/saveOrUpdate",
    data,
})

export const getArticleContent = (id: string) => Request({
    url: "/article/getArticleContent/" + id,
})