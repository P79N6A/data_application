import { queryRule, removeRule, addRule, updateRule } from '@/services/api';

export default {
  namespace: 'apiResource',

  state: {
    data: {
      list: [],
      pagination: {},
    }
  },

  effects: {
    * fetch({ payload }, { call, put, select }) {
      const response = yield call(queryRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    * add({ payload, callback }, { call, put }) {
      const response = yield call(addRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    * remove({ payload, callback }, { call, put }) {
      const response = yield call(removeRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    * update({ payload, callback }, { call, put, select }) {

      let oldData = yield select(({ apiResource }) => {
        console.log(apiResource.data);
        return apiResource.data;
      });

      function setState(state) {
        oldData.list = oldData.list.map((v, i) => {
          console.log(v.id, payload.id);
          if (v.id === payload.id) {
            v.apiState = state;
          }
          return v;
        });
      }
      switch (payload.option) {
        //state=0
        case 'use':
          setState(1);
          break;
        //state=2
        case 'stop':
          setState(0);
          break;
        //state=1
        case 'pass':
          setState(1);
          break;
        //state=1
        case 'reject':
          setState(3);
          break;
        default:
          break;
      }

      /*yield put({
        type: 'save',
        payload: response
      });*/
      if (callback) callback();
    }
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    }
  }
};
