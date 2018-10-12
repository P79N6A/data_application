import { apiList, removeRule, addApi, updateRule, fakeSubmitForm } from '@/services/api';
export default {
  namespace: 'apiResource',

  state: {
    data: {
      list: [],
      pagination: {},
    }
  },

  effects: {
    * getApiList({ payload }, { call, put, select }) {
      const response = yield call(apiList, payload);
      yield put({
        type: 'save',
        payload: response.list ? response : response.data,
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

    * saveApi({ payload, callback }, { call, put, select }) {
      let oldData = yield select(({ apiResource }) => {
        return apiResource.data;
      });
      payload.apiState = 2;
      yield call(addApi, payload);
      console.log(payload, oldData);
    },

    * update({ payload, callback }, { call, put, select }) {
      let oldData = yield select(({ apiResource }) => {
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
