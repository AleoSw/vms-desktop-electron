import axios from "axios";
import { getCookie } from "./cookieUtils";
import env from "../../env";

const axiosInstance = axios.create({
    baseURL: env.DB_IP,   
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = getCookie('authToken');

        if (token) {
            config.headers.Authorization = token;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export default axiosInstance;