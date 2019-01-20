import { fetch } from '../fetch';

export default (params) => { return fetch('/api/register', params, 'post'); };
