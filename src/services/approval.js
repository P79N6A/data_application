import request from '@/utils/request_w';

export async function approvalList(params) {
  console.log(params);
  return request('https://dsn.apizza.net/mock/40a8b4a3ed5d6fd4c01e6e3743b65925/approval/list', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
