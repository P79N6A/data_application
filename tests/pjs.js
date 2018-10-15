import request from '../src/utils/request_w';

let option = {
  method: 'POST',
  body: {
    'catalogId': '1',
    'serviceName': null,
    'status': null,
    'interfaceName': null,
    'serviceMethodType': null,
    'beginDate': null,
    'endDate': null,
    'pageParam': {
      'total': 0,
      'pageIndex': 1,
      'pageSize': 10,
      'orderFiled': 'last_update',
      'orderRule': 'desc',
    },
  },
};

let res = request('/api/register/interface/findPage', option);
console.log(res);
