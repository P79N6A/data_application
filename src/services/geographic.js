import request from '@/utils/request_b';

export async function queryProvince() {
  return request('/mock/geographic/province');
}

export async function queryCity(province) {
  return request(`/mock/geographic/city/${province}`);
}
