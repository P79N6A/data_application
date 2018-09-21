import {TableList} from "../services/resource";

export default {

  namespace: 'resource',

  state: {
    name: [555],
    resourceTableList: [],
  },

  subscriptions: {
    /*setup({dispatch, history}) {
    },*/
  },

  effects: {
    * getTableList({payload, callback}, {call, put}) {
      let res = yield call(TableList, payload.url);
      yield put({type: 'save', resourceTableList: res});
      callback(res);
    },
  },

  reducers: {
    save(state, data) {
      return {...state, ...data};
    },
  },

};
