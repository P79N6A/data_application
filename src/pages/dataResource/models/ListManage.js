import { apiList, removeRule, addApi, apiListJava, updateApiStatus, testS } from '@/services/api';
import { message } from 'antd';
import { checkResponse } from '../../../utils/checkResponse';
import {delay} from 'redux-saga'

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

    searchFormValue:new Map(),

    apiReqParam:{
      method:'POST',
      body: {
        'catalogId': '1',
        'serviceName': null,
        'status': null,
        'interfaceName':null,
        'serviceMethodType': null,
        'beginDate': null,
        'endDate': null
      }
    },
    pageParam:{
      'total': 0,
      'pageIndex': 1,
      'pageSize': 10,
      'orderFiled': 'last_update',
      'orderRule': 'desc'
    }
  },


  effects: {
    * getApiList({payload={}, callback }, { call, put, select, takeEvery, take }) {

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
    },

    // 监听并触发更新api列表
    * watchAndUpdateApiList({n},{call, put, take, fork, takeLatest, select, race }){
      while (true){
        let watch=yield take(['getApiList','saveApi','updateApiStatus', 'updateReqParam', 'add']);

        let [options,pageParam]=yield select(({ListManage})=>([ListManage.apiReqParam, ListManage.pageParam]));
        let option={...options};
        option.body.pageParam=pageParam;

        for (let i=1; i<=3; i++) {
          let {res, timeOut} = yield race({
            res: call(apiListJava, option),
            timeOut: call(delay, 4000)
          });
          // let res=yield call(apiListJava,option);
          if (res) {
            let { data: { data } } = res;
            if (checkResponse(res, watch, '更新成功')) {
              yield put({
                type: 'save',
                payload: data
              });
            }
            break;
          } else {
            if (i===3){
              message.error('请求超时,请检查网络')
              break;
            }
            message.error(`请求超时, 重试${i}/3次`)
          }
        }
      }
    },

    /**testE( {payload}, { call, watcher, take }) {
      for (let i=1; i<3;i++){
        let as=yield take(['getApiList', 'userLogin'])
        console.log('======-==============='+i,take.toString(),as)
      }
      yield console.log('take end')
    }*/
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload
      };
    },

    updateReqParam(state,{pageParam}){
      return {
        ...state,
        pageParam:pageParam
      }
    }
  },

  subscriptions:{
  }
};
