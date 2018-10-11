import { stringify } from 'qs';
import request from '@/utils/request_b';

export async function apiList(params) {
  return request(`/mock/api/apiList?${stringify(params)}`);
}

export async function addApi(params) {
  return request('/mock/api/addApi', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    }
  });
}

export async function queryNotices() {
  return request('/mock/notices/list');
}
