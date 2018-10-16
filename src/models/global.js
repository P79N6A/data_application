import { queryNotices } from '@/services/api';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'global',

  state: {
    collapsed: false,
    notices: []
  },

  effects: {

    // 获取消息提示
    *fetchNotices(_, { call, put, select }) {
      let data = yield call(queryNotices);
      data=data.data;
      yield put({
        type: 'saveNotices',
        payload: data
      });
      yield put({
        type: 'user/changeNotifyCount',
        payload: data.length
      });
    },

    // 清空消息
    *clearNotices({ payload }, { put, select }) {
      yield put({
        type: 'saveClearedNotices',
        payload
      });
      const count = yield select(state => state.global.notices.length);
      yield put({
        type: 'user/changeNotifyCount',
        payload: count
      });
    },

    // 函数式地址跳转
    * toLocation({ payload }, { put }) {
      yield put(routerRedux.push(payload));
    }
  },

  reducers: {
    changeLayoutCollapsed(state, { payload }) {
      return {
        ...state,
        collapsed: payload
      };
    },
    saveNotices(state, { payload }) {
      return {
        ...state,
        notices: payload
      };
    },
    saveClearedNotices(state, { payload }) {
      return {
        ...state,
        notices: state.notices.filter(item => item.type !== payload)
      };
    }
  },

  subscriptions: {
    setup({ history }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      return history.listen(({ pathname, search }) => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
      });
    }
  }
};
