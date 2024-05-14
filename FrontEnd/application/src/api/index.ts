import axios from "axios";
import HistoryStorage from "@/utils/HistoryStorage";
import { message } from 'antd';

const Request = axios.create({
    baseURL: process.env.UMI_APP_BASE_API + '/api',
    timeout: process.env.UMI_APP_TIME_OUT_PERIOD as any,
})

const errorHandler = (error: any) => {
    console.log("error", error);

    const { response: { data } } = error
    message.error(data.message)
    return data;
}

Request.interceptors.request.use((request: any) => {
    request.headers = {
        ...request.headers,
        token: HistoryStorage.getItem("token")
    };

    return request;
}, (error) => {
    return Promise.reject(error);
})

Request.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        return errorHandler(error)
    }
);

export default Request;