import { fetch } from '../fetch';

export const bookDetail = params => fetch('/api/book/detail', params);
export const bookContent = params => fetch('/api/book/content', params);
export const keywords = params => fetch('/api/book/keywords', params);
export const bookSearch = params => fetch('/api/book/search', params);
export const bookCategoryList = params => fetch('/api/book/list', params);
