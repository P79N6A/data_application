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
      ...params,
    },
  });
}

export async function updateApiStatus(params) {
  const url=`/register/interface/updateStatus?interfaceId=${params.interfaceId}&opType=${params.option}`;
  return request(url);
}

export async function queryNotices() {
  return request('/mock/notices/list');
}

export async function getCatalog() {
  return request('/register/catalog/findAll');
}

export async function testS() {
  return setTimeout(()=>console.log('sss==='),1000);
}
