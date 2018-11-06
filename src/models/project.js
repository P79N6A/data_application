import { addProject, deleteProject, getProjectList, getProjectLog } from '../services/project';

function modelResponse(response) {
  const sendMsg = {
    isSuccess: false,
    msg: '',
    res: {},
  };
  if (response && (response.statusText !== 'OK')) {
    sendMsg.isSuccess = false;
    sendMsg.msg = response.message;
  } else {
    sendMsg.res = response.data;
    sendMsg.isSuccess = true;
    sendMsg.msg = '操作成功';
  }
  return sendMsg;
}

export default {
  namespace: 'project',

  state: {
    projectData: [],
    executeFlowVisible: false,
  },

  effects: {
    * getProjectData({ payload, callback }, { call, put }) {
      const response = yield call(getProjectList, payload);
      yield put({
        type: 'save',
        data: response.data
      });
      return modelResponse(response);
    },

    * getProjectLog({ payload, callback }, { call }) {
      const response = yield call(getProjectLog, payload);
      return modelResponse(response);
    },

    * addProjectData({ payload, callback }, { call }) {
      const response = yield call(addProject, payload);
      return modelResponse(response);
    },

    * deleteProjectData({ payload, callback }, { call }) {
      const response = yield call(deleteProject, payload);
      return modelResponse(response);
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        projectData: action.data,
      };
    },
  },
};
