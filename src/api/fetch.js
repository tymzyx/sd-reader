import axios from './instance';

export const fetch = (url, params, method = 'GET') => (
    new Promise((resolve, reject) => {
        const data = method.toUpperCase() === 'GET' ? 'params' : 'data';
        axios({
            method,
            url,
            [data]: params
        })
            .then((res) => {
                resolve(res);
            })
            .catch((err = {}) => {
                reject(err);
            });
    })
);
