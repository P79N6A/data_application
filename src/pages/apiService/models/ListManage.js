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
        'orderRule': 'desc',
      },
    },

    defaultParam:{
      method:'POST',
      body: {
        'catalogId': '1',
        'serviceName': null,
        'status': null,
        'interfaceName':null,
        'serviceMethodType': null,
        'beginDate': null,
        'endDate': null,
      },
    },

    searchParam:{body:{}},

    pageParam:{
      'total': 0,
      'pageIndex': 1,
      'pageSize': 10,
      'orderFiled': 'last_update',
      'orderRule': 'desc',
    },
  },


  effects: {
   /* * getApiList({payload={}, callback }, { call, put, select, takeEvery, take }) {

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

      let {dataResource:{dataResource}}=res;
      if (checkResponse(res, callback, '更新成功')) {
        yield put({
          type: 'save',
          payload: dataResource
        });
      }
    }, */

    * remove({ payload, callback }, { call, put }) {
      const response = yield call(removeRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    * saveApi({ payload, callback }, { call}) {
      // payload.status = 2;

      payload.paramInfoReqDTOS.forEach((v)=>{
        Reflect.deleteProperty(v,'key');
      });

      const res=yield call(addApi, payload);
      checkResponse(res,callback,'添加成功')
    },

    * updateApiStatus({ payload, callback }, { call, take, put }) {
      const res=yield call(updateApiStatus,payload);
      try {
        checkResponse(res,callback,payload.option==='1'?'启用成功':'停用成功')
      }catch (e) {
        console.log(e.message)
      }finally {
        yield put('getApiList')
      }
    },


    // 监听并触发更新api列表
    * watchAndUpdateApiList({callback},{call, put, take, select, race }){
      // 初始化表格数据
      yield setTimeout(callback,100);
      while (true){
        // 监听列表
        const watch=yield take(['getApiList','saveApi','updateApiStatusDone', 'updatePageParam', 'updateParam']);
        // 获取请求参数
        const [defaultParam, searchParam, pageParam]=yield select(({ListManage})=> ([ListManage.defaultParam, ListManage.searchParam, ListManage.pageParam]));
        const option=Object.assign(defaultParam,searchParam);
        option.body.pageParam=pageParam;

        // 带延时处理的请求
        for (let i=1; i<=3; i++) {
          const {res, timeOut} = yield race({
            res: call(apiListJava, option),
            timeOut: call(delay, 4000),
          });

          // let res=yield call(apiListJava,option);
          if (res) {
            const { data: { data } } = res;
            if (checkResponse(res, watch, '更新成功')) {
              yield put({
                type: 'save',
                payload: data,
              });
            }
            break;
          } else {
            message.error(`请求超时, 重试${i}/3次`)
            if (i===3){
              call(delay,1000, message.error('请求超时,请检查网络')
              )
            }
          }
        }
      }
    },

    /** testE( {payload}, { call, watcher, take }) {
      for (let i=1; i<3;i++){
        let as=yield take(['getApiList', 'userLogin'])
        console.log('======-==============='+i,take.toString(),as)
      }
      yield console.log('take end')
    } */
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },

    updatePageParam(state, {pageParam}){
      return {
        ...state,
        pageParam,
      }
    },

    updateParam(state,{payload}){
      const newState=Object.assign({},state,);
      Object.assign(newState.searchParam,{body:{...payload}});
      Object.assign(newState.pageParam,{pageIndex:1});
      return {
        ...newState,
      }
    },

    getApiList(state) {
      return state;
    },
  },

  subscriptions:{
  },
};
