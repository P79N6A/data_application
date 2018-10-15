import { approvalList } from '../services/approval';
export default {
   namespace: 'approval',
   state: {
     reseaseList: []
   },
   effects: {
     // 获取接口发布审批模块
    *fetchRelease({ payload }, { call, put }) {
      console.log(payload)
      const data = yield call(approvalList, payload)
      yield put({
        type: 'releaseLists',
        payload: data
      })
    }
   },
   reducers: {
    releaseLists(state, { payload }) {
       return {
         ...state,
         reseaseList: payload.data.data
       }
     }
   }
}
