import { message } from 'antd';

function checkResponse(response, callback, sucTips = '操作成功') {
  const msg=response.data.message;
  const code=response.data.code;

  const sendMsg = {
    isSuccess: true,
    msg: '',
    res: {},
    code,
  };


  if (msg.includes('操作成功')) {
    sendMsg.res = response;
    sendMsg.isSuccess = true;
    sendMsg.msg = sucTips;
    // message.success(sendMsg.msg);
    typeof callback==='function' ?callback(sendMsg):'';
    return true;
  } else {
    sendMsg.isSuccess = false;
    sendMsg.msg = response.data.message;
    message.error(sendMsg.msg);
    if (sendMsg.msg === '未登录' || sendMsg.msg === null) {
      window.location.href = '/user/login';
      return false;
    }
    typeof callback==='function' ?callback(sendMsg):'';

    return false;
  }
}

export { checkResponse };
