import { apiList, removeRule, addApi, apiListJava, updateApiStatus } from '@/services/api';
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
  namespace: 'ListManage',

  state: {
    data: {
      data: [],
      pageParam: {
        'total': 0,
        'pageIndex': 1,
        'pageSize': 10,
        'orderFiled': 'last_update',
        'orderRule': 'desc'
      }
    },
    searchFormValue:new Map()
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
      let {data:{data}}=res;
      if (checkResponse(res, callback, '更新成功')) {
        yield put({
          type: 'save',
          payload: data
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

    * updateApiStatus({ payload, callback }, { call, put, select }) {
      let res=yield call(updateApiStatus,payload);
      checkResponse(res,callback,payload.option==='1'?'启用成功':'停用成功')
    }
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload
      };
    }
  },

  subscriptions:{
    whatchAndUpdateApiList({dispatch, ...res}, ...rr){
    }
  }
};
