import {TableList} from '../services/resource';

export default {

  namespace: 'resource',

  state: {
    name: [555],
    resourceTableList: []
  },

  subscriptions: {
    /*setup({dispatch, history}) {
    },*/
  },

  effects: {
    * getTableList({payload, callback}, {call, put}) {
      let res = yield call(TableList, payload.url);
      yield put({
        type: 'save',
        data: {resourceTableList: res.data.datalist}
      });
      callback(res);
    },

    * deleteCol({payload, callback}, {call, put}) {
      // let res=yield call(deleteCol);
      let newData = payload.data.filter((v) => {
        return v.id !== payload.id;
      });
      yield put({
        type: 'save',
        data: {resourceTableList: newData}
      });
      callback(newData);
    }
  },

  reducers: {
    save(state, {data}) {
      return {...data};
    }
  }

};
