import { fetch } from '../fetch';

export default params => fetch('/api/book/detail', params, 'get');
