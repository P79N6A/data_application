import request from '@/utils/request_b';

export default async function queryError(code) {
  return request(`/mock/user/${code}`);
}
