import request from '../utils/request_w';

export function getProject() {
  return request('/mock/project');
}
