import HistoryStorage from "@/utils/HistoryStorage";
import axios from "axios";
import { message } from 'ant-design-vue';

const Request = axios.create({
    baseURL: import.meta.env.VITE_BASE_API + '/api',
    timeout: import.meta.env.TIME_OUT_PERIOD,
})

const errorHandler = (error: any) => {
    if (error.code) {
        // message.error(error.message)
        return Promise.reject(error.message)
    } else {
        const { response: { data } } = error
        message.error(data.message)
        return data;
    }
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
    (response: any) => {
        return response.data;
    },
    (error) => {
        return errorHandler(error)
    }
);

export default Request;