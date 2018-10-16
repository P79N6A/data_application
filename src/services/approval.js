import request from '@/utils/request_w';
export async function approvalList(params) {
  console.log(params);
  return request('/register/apply/findApproveByPage', {
    method: 'POST',
    body: {
      ...params
    }
  })
}
