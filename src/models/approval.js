import { approvalList } from '../services/approval';

export default {
  namespace: 'approval',
  state: [],
  effects: {
    * fetchApproval({ payload }, { call, put }) {
      const data = yield call(approvalList, payload);
      yield put({
        type: 'getApprovalLists',
        payload: data,
      });
    },
  },
  reducers: {
    getApprovalLists(state, { payload }) {
      return [
        ...payload.data.data,
      ];
    },
  },
};
