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
            return Promise.reject(response.data.message);
        }
        if (response.data.status !== 1) {
            return Promise.reject(response.data.message);
        }
        return Promise.resolve(response.data.message);
    },
    error => Promise.reject(error)
);

export default instance;
