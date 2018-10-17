import request from '@/utils/request_w'
/**
 * 获取我的申请列表
 */
export async function applyList(params) {
  return request('/register/apply/findMyApplyByPage', {
    method: 'POST',
    body: {
      ...params
    }
  })
}