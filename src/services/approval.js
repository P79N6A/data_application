import request from '@/utils/request_w';
import {modelResponse} from '@/utils/utils'
/**
 * 获取审批列表
 */
// export async function approvalList(params) {
//   return request('/register/apply/findApproveByPage', {
//     method: 'POST',
//     body: {
//       ...params
//     }
//   })
// }
// 处理申请是同意还是拒绝
export async function operationApproval(params) {
  return request('/register/apply/approve', {
    method: 'GET',
    body: {
      ...params,
    },
  })
}
export function approvalList(params) {
  const { applyType, page_index, page_size, status, beginDate=null, endDate=null} = params
  const payload = {
    applyType,
    status,
    beginDate,
    endDate,
    pageParam: {
      pageIndex: page_index,
      pageSize: page_size,
      orderFiled: 'approve_date',
      orderRule: 'desc',
    },
  }
  return request('/register/apply/findApproveByPage', {
    method: 'POST',
    body: {
      ...payload,
    },
  }).then((data) => {
    return modelResponse(data.data)
  })
}
