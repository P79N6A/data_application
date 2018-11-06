import request from '../utils/request_w';
import { stringify } from 'qs';

export function getProject(params) {
    return request(`/mock/project?${stringify(params)}`);
}
