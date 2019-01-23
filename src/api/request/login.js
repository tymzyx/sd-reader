import { fetch } from '../fetch';

export default params => fetch('/api/user/login', params, 'post');
