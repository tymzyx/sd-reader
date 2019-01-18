import axios from './instance';

export const fetchFactory = () => (url, params, method = 'get') => {
    return new Promise((resolve, reject) => {
        const data = method.toUpperCase() === 'GET' ? 'params' : 'data';
        axios({
            method,
            url,
            [data]: params
        })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err = {}) => {
                reject(err);
            });
    });
};
export const getData = fetchFactory();
