import { message } from 'antd';
import Redirect from 'umi/redirect';


let sendMsg = {
  isSuccess: true,
  msg: '',
  res: {}
};

function checkResponse(response, callback, sucTips = '操作成功') {
  if (response && response.data && response.data.message === '操作成功') {
    sendMsg.res = response;
    sendMsg.isSuccess = true;
    sendMsg.msg = sucTips;
    !!sucTips && message.success(sendMsg.msg);
    !!callback && callback(sendMsg);
    return true;
  } else {
    sendMsg.isSuccess = false;
    sendMsg.msg = response.data.message;
    message.error(sendMsg.msg);
    !!callback && callback(sendMsg);

    if (sendMsg.msg === '未登录') {
      window.location.href = '/user/login';
    }
    return false;
  }
}

export { checkResponse };
