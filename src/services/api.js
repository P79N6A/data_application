import { stringify } from 'qs';
import request from '@/utils/request_w';

export async function apiList(params) {
  return request(`/mock/api/apiList?${stringify(params)}`);
}

export async function apiListJava(params) {
  return request('/register/interface/findPage', params);
}

export async function addApi(params) {
  return request('/register/interface/add', {
    method: 'POST',
    body: {
      ...params
    }
  });
}

export async function queryNotices() {
  return request('/mock/notices/list');
}
