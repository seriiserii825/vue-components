import {axiosInstance} from "../axios/axios-instance";

export const useAxiosToken = (token) => {
    console.log(token, 'token')
    axiosInstance.defaults.headers.common['userToken'] = token;
}
