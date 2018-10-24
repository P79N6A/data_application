import { message } from 'antd';

function checkResponse(response, callback, sucTips = '操作成功') {
  let msg=response.data.message;
  let code=response.data.code;

  let sendMsg = {
    isSuccess: true,
    msg: '',
    res: {},
    code:code
  };


  if (msg.includes('操作成功')) {
    sendMsg.res = response;
    sendMsg.isSuccess = true;
    sendMsg.msg = sucTips;
    // message.success(sendMsg.msg);
    typeof callback==='function' ?callback(sendMsg):'';
    return sendMsg;
  } else {
    sendMsg.isSuccess = false;
    sendMsg.msg = response.data.message;
    message.error(sendMsg.msg);
    if (sendMsg.msg === '未登录' || sendMsg.msg === null) {
      window.location.href = '/user/login';
      return false;
    }
    typeof callback==='function' ?callback(sendMsg):'';

    return sendMsg;
  }
}

export { checkResponse };
