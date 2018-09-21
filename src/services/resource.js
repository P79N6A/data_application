import request from '../utils/request';
import axios from 'axios'

export function TableList(url) {
  return request("https://dsn.apizza.net/mock/40a8b4a3ed5d6fd4c01e6e3743b65925/resource/tablelist");
}
