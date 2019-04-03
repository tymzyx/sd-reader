import { fetch } from '../fetch';

export const topicOperate = params => fetch('/api/topic/operate', params, 'POST');
export const topicList = params => fetch('/api/topic/list', params);
export const topicDetail = params => fetch('/api/topic/detail', params);
