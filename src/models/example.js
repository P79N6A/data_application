import {query} from "../services/example";

export default {

  namespace: 'example',

  state: {
    name: [55],
  },

  subscriptions: {
    setup({dispatch, history}) {  // eslint-disable-line
    },
  },

  effects: {
    * fet({payload, callback}, {call, put}) {

      let res = yield call(query, payload);
      callback(res)
      yield put({type: 'save'});
    },
  },

  reducers: {
    save(state, action) {
      return {...state, ...action.payload};
    },
  },

};
