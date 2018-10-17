import {applyList} from '@/services/apply'
import { message } from 'antd'
import { OK_CODE } from '@/config/code'
export default {
  namespace: 'apply',
  state: {
    applyList: {}
  },
  effects: {
    // 获取我的申请列表
    *fetchApply({payload}, {call, put}) {
      const response = yield call(applyList, payload)
      const data = response.data
      if(!data.code || data.code !== OK_CODE) {
        message.error(data.message)
        return
      }
      yield put({
        type: 'setApply',
        payload: data
      })
    }
  },
  reducers: {
    setApply(state, {payload}) {
      return{
        ...state,
        applyList: payload.data
      }
    }
  }
}