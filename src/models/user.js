import { query as queryUsers, queryCurrent } from '@/services/user';
import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { login } from '../services/user';
import { setAuthority, clearAuthority } from '@/utils/authority';
import { getPageQuery, store } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';
import { checkResponse } from '../utils/checkResponse';


export default {
  namespace: 'user',

  state: {
    status: undefined,
    list: [],
    currentUser: {}
  },

  effects: {
    * userLogin({ payload, callback }, { call, put }) {
      let res = yield call(login, payload);
      //登录失败
      if (!checkResponse(res, callback)) {
        return;
      }
      store('save',{currentUser:JSON.stringify(res.data.data)});
      let rs = {
        currentAuthority: payload.userName,
        status: 'ok',
        type: 'account'
      };
      yield put({
        type:'saveCurrentUser',
        payload: res.data.data
      });

      yield put({
        type: 'changeLoginStatus',
        payload: rs
      });
      // 登录成功跳转
        reloadAuthorized();
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.startsWith('/#')) {
              redirect = redirect.substr(2);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
    },

    * logout(_, { put }) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          currentAuthority: 'guest'
        }
      });
      reloadAuthorized();
      clearAuthority();
      yield put(
        routerRedux.push({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href
          })
        }),
      );
    },

    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response
      });
    },

    *fetchCurrent(_, { call, put }) {
      let cu=store('get','currentUser');
      let cus=cu.replace(/\\/g,'');
      cus=cus.substring(1,cus.length-1);
      let user=JSON.parse(cus);

      if (!user || !user.userId){
        return window.location.href='/user/login'
      }
      yield put({
        type: 'saveCurrentUser',
        payload: user
      });
    }
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {}
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload
        }
      };
    },
    // 改变路由权限
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type
      };
    }
  }
};
