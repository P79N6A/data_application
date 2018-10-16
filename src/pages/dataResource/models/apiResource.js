import { apiList, removeRule, addApi, apiListJava } from '@/services/api';
import { message } from 'antd';
import { checkResponse } from '../../../utils/checkResponse';

let objToMap=function(obj) {
  let m=new Map();
  for (let k in obj){
    obj[k]?m.set(k,obj[k]):'';
  }
  return m;
};

export default {
  namespace: 'apiResource',

  state: {
    data: {
      data: [],
      pageParam: {}
    }
  },


  effects: {
    * getApiList({payload={}, callback }, { call, put, select }) {

      let option = {
        method:'POST',
        body: {
          'catalogId': '1',
          'serviceName': null,
          'status': null,
          'interfaceName':null,
          'serviceMethodType': null,
          'beginDate': null,
          'endDate': null,
          'pageParam': {
            'total': 0,
            'pageIndex': 1,
            'pageSize': 10,
            'orderFiled': 'last_update',
            'orderRule': 'desc'
          },
          ...payload
        }
      };
      // message.success('获取数据');
      let res = yield call(apiListJava, option);

      if (checkResponse(res, callback, '更新成功')) {
        yield put({
          type: 'save',
          payload: res.data.data
        });
      }

    },

    * add({ payload, callback }, { call, put }) {
      const response = yield call(addRule, payload);
      yield put({
        type: 'save',
        payload: response
      });
      if (callback) callback();
    },

    * remove({ payload, callback }, { call, put }) {
      const response = yield call(removeRule, payload);
      yield put({
        type: 'save',
        payload: response
      });
      if (callback) callback();
    },

    * saveApi({ payload, callback }, { call}) {
      // payload.status = 2;

      payload['paramInfoReqDTOS'].forEach((v)=>{
        Reflect.deleteProperty(v,'key');
      });

      let res=yield call(addApi, payload);
      checkResponse(res,callback,'添加成功')
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
        data: action.payload
      };
    }
  }
};
