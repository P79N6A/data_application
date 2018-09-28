import request from '../utils/request_w';

export function TableList() {
  return request('https://dsn.apizza.net/mock/40a8b4a3ed5d6fd4c01e6e3743b65925/resource/tablelist');
}
