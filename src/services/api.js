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

export async function updateApiStatus(params) {
  let url=`/register/interface/updateStatus?interfaceId=${params.interfaceId}&opType=${params.option}`;
  return request(url);
}

export async function queryNotices() {
  return request('/mock/notices/list');
}
