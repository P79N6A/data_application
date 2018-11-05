import { getProject } from '../services/project';

export default {
  namespace: 'project',

  state: {
    projectData: [],
    executeFlowVisible:false
  },

  effects: {
    * getProjectData({ payload, callback }, { call, put }) {
      const res = yield call(getProject, payload);
      yield put({
        type: 'save',
        data: res.data,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        projectData:action.data,
      };
    },
    showModal(){
      return {
        executeFlowVisible:true
      }
    },
    hideModal(){
      return {
        executeFlowVisible:false
      }
    }
  }
};
