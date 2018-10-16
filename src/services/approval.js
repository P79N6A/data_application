import request from '@/utils/request_w';
/**
 * 获取审批列表
 */
export async function approvalList(params) {
  return request('/register/apply/findApproveByPage', {
    method: 'POST',
    body: {
      ...params
    }
  })
}
// 处理申请是同意还是拒绝
export async function operationApproval(params) {
  return request('/register/apply/approve', {
    method: 'GET',
    body: {
      ...params
    }
  })
}
