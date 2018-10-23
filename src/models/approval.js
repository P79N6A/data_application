import { approvalList, operationApproval } from '../services/approval';
import { message } from 'antd'
import { OK_CODE } from '@/config/code'
export default {
   namespace: 'approval',
   state: {
     reseaseList: {}
   },
   effects: {
     // 获取接口发布审批模块
    *fetchRelease({ payload }, { call, put }) {
      const response = yield call(approvalList, payload)
      const data = response.data
      // 捕获异常
      if(!data.code ||data.code !== OK_CODE) {
        message.error(data.message);
        return
      }
      yield put({
        type: 'releaseLists',
        payload: data
      })
    },
    // 接口审批处理  同意 或 拒绝
    *operation({payload, callback}, {call}) {
      const response = yield call(operationApproval, payload)
      const data = response.data
      callback(data)
    }
   },
   reducers: {
    releaseLists(state, { payload }) {
       return {
         ...state,
         reseaseList: payload.data
       }
     }
   }
}
