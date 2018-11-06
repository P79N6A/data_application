import request from '../utils/request_w';
import { stringify } from 'qs';

export function getProjectList(params) {
  return request(`/mock/project?${stringify(params)}`);
}

export function getProjectLog(params) {
  return request(`/mock/project/log?${stringify(params)}`);
}

export function getProjectFlow(params) {
  return request(`/mock/project/flow?${stringify(params)}`);
}
