import host from './config';
import axios from 'axios';

const instance = axios.create({
    baseURL: host,
    timeout: 30000,
    withCredentials: true,
    headers: {},
    validateStatus(status) {
        return status >= 200 && status <= 500; // default
    }
});
instance.interceptors.request.use(config => config);
instance.interceptors.response.use(
    (response) => {
        if (response.status !== 200) {
            return Promise.reject(response.data);
        }
        if (response.data.code === 403) {
            return Promise.resolve(response.data);
        }
        if (response.data.code !== 200) {
            console.log(response.data.msg);
            return Promise.reject(response.data);
        }
        return response.data;
    },
    error => Promise.reject(error)
);

export default instance;