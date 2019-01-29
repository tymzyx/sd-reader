import { fetch } from '../fetch';

export const bookDetail = params => fetch('/api/book/detail', params, 'get');
export const bookContent = params => fetch('/api/book/content', params, 'get');
