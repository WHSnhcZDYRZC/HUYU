import Request from "@/api";

export const imageUpload = (data: FormData) => Request({
    method: "post",
    url: "/system/imageUpload",
    data,
})