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
/**
 *  接口使用列表
 */
export async function interfaceList(params) {
  return request('/register/interface/findMyApplyPage', {
    method: 'POST',
    body: {
      ...params
    }
  })
}
/**
 * 新增申请
 */
export async function addService(params) {
  return request('/register/apply/add', {
    method: 'POST',
    body: {
      ...params
    }
  })
}
