import request from '../utils/request';
import axios from 'axios'

export function query(url) {
  return request(url);
}
