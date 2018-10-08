import { approvalList } from '../services/approval';
export default {
   namespace: 'approval',
   state: {
     useList: [],
     reseaseList: []
   },
   effects: {
     // 获取接口发布审批模块
    *fetchRelease({ payload }, { call, put }) {
      const data = yield call(approvalList, payload)
      yield put({
        type: 'releaseLists',
        payload: data
      })
    },
     // 获取接口使用审批
    *fetchUse({ payload }, { call, put }) {
      const data = yield call(approvalList, payload)
      yield put({
        type: 'useLists',
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
     },
     useLists(state, { payload }) {
       return {
         ...state,
         useList: payload.data.data
       }
     }
   }
}
