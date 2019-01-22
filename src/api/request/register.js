import { fetch } from '../fetch';

export default params => fetch('/api/user/register', params, 'post');
