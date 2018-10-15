import request from '@/utils/request_w';
export async function approvalList(params) {
  console.log(params);
  return request('/apply/findApproveByPage', {
    method: 'POST',
    body: {
      ...params
    }
  })
}
