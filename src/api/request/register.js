import { fetch } from '../fetch';

export default params => fetch('/api/register', params, 'post');
