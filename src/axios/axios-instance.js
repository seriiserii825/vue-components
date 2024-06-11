import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://medik.altuofianco.com/api/v1",
    headers: {
        "appToken": "Medik01"
    },
});

export function addErrorHandler(fn) {
    axiosInstance.interceptors.response.use(response => response, fn);
}

export {axiosInstance};