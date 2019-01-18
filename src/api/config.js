const httpConfig = {
    mock: '',
    development: 'http://localhost:3001/',
    test: '',
    production: ''
};

export default httpConfig[process.env.http];
