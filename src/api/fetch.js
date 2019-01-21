import axios from './instance';

export const fetch = (url, params, method = 'get') => (
    new Promise((resolve, reject) => {
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
    })
);
