import request from '@/utils/request_w';


export async function query() {
  return request('/mock/user/users');
}

export async function queryCurrent() {
  return request('/mock/user/currentUser');
}

export async function login(params) {
  let res = request(`/register/user/login?userName=${params.userName}&passWord=${params.passWord}`);
  return res;
}
