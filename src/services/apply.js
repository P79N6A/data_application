import request from '@/utils/request_w'
import {modelResponse} from '@/utils/utils'
/**
 * 获取我的申请列表
 */
// export async function applyList(params) {
//   return request('/register/apply/findMyApplyByPage', {
//     method: 'POST',
//     body: {
//       ...params
//     }
//   })
// }
/**
 *  接口使用列表
 */
// export async function interfaceList(params) {
//   return request('/register/interface/findMyApplyPage', {
//     method: 'POST',
//     body: {
//       ...params
//     }
//   })
// }
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
// 获取使用接口列表
export function interfaceList(params) {
  const { catalogId, page_index, page_size, status} = params
  const payload = {
    catalogId,
    status,
    serviceName: null,
    interfaceName: null,
    serviceMethodType: null,
    pageParam: {
      pageIndex: page_index,
      pageSize: page_size,
      orderFiled: 'last_update',
      orderRule: 'desc'
    }
  }
  return request('/register/interface/findMyApplyPage', {
    method: 'POST',
    body: {
      ...payload
    }
  }).then((data) => {
    return modelResponse(data.data)
  })
}
/**
 * 获取我的申请列表
 */
export function applyList(params) {
  const { applyType, page_index, page_size, status, beginDate=null, endDate=null} = params
  const payload = {
    applyType,
    status,
    beginDate,
    endDate,
    pageParam: {
      pageIndex: page_index,
      pageSize: page_size,
      orderFiled: 'apply_date',
      orderRule: 'desc'
    }
  }
  return request('/register/apply/findMyApplyByPage', {
    method: 'POST',
    body: {
      ...payload
    }
  }).then((data) => {
    return modelResponse(data.data)
  })
}