import { query as queryUsers, queryCurrent } from '@/services/user';
import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { login } from '../services/user';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';


export default {
  namespace: 'user',

  state: {
    status: undefined,
    list: [],
    currentUser: {},
  },

  effects: {
    * userLogin({ payload }, { call, put }) {
      let res = yield call(login, payload);
      res = res.data;
      let rs = {};
      debugger;
      if (res['message'] && res.message === '操作成功') {
        rs = {
          currentAuthority: payload.userName,
          status: 'ok',
          type: 'account',
        };
      } else {
        rs = {
          currentAuthority: payload.userName,
          status: 'error',
          type: 'guest',
        };
      }
      yield put({
        type: 'changeLoginStatus',
        payload: rs,
      });
      // 登录成功跳转
      if (res.message === '操作成功') {
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
      }
    },

    * logout(_, { put }) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          currentAuthority: 'guest',
        }
      });
      reloadAuthorized();
      yield put(
        routerRedux.push({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          })
        }),
      );
    },
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response.name ? response : response.data,
      });
    }
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload,
        }
      };
    },
    // 改变路由权限
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    }
  }
};
