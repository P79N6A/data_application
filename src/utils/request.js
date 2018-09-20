import fetch from 'dva/fetch';
import fetchjsonp from 'fetch-jsonp'
import {getCookie} from "./utils";

//自定义返回信息
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  //单点登录
  418: "登录授权已过期，请重新登录",
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};


//解析返回数据
function parseResponse(response) {
  if (!response.ok) {
    throw new Error('Network response was not ok.');
  }
  let resType = response.headers.get('content-type');
  if (resType.includes("json")) {
    return response.json();
  } else if (resType.includes("text")) {
    return response.text();
  } else if (resType.includes("jpg" || resType.includes("mp3"))) {
    return response.blob();
  } else {
    return "请定义返回数据类型";
  }
}

//处理错误码
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  let msg = codeMessage[response.status];
  let error = msg ? new Error(msg) : new Error("跨域/网络故障/未知错误...,请检查");
  error.response = response;
  throw error;
}

// 处理请求选项
function initOptions(defReq, options) {
  if (!options) return defReq;

  if (options.body && (typeof options.body) === "string") {
    options.body = JSON.parse(options.body);
    defReq.body = options.body;
    delete options.body;
  }

  if (options.headers) {
    for (let k in options.headers) {
      if (defReq.headers.has(k)) {
        defReq.headers.set(k, options.headers[k])
      } else {
        defReq.headers.append(k, options.headers[k]);
      }
    }
    delete options.headers;
  }

  return {
    ...defReq,
    options,
  }
}

//处理cookie
function setCookie(defReq) {
  const userCode = getCookie('usercode'), userName = getCookie('username')
  let user = `usercode:${userCode}&username:${userName}`;

  defReq.headers.append("x-client-ajax", "data");
  defReq.headers.append("Authorization", escape(escape(user)));
  defReq.headers.append('us-app', escape(escape(window.Sysconfig.sysName || process.env.sysName || "app")));
  return defReq;
}

/**
 * options{
 *     method:请求方式
 *     body:Object/String 请求体，可以为json字符串/json对象，
 *     headers{
 *         name:value,
 *     }
 *     其他参数参见defReq设置
 * }
 *获取本地mock数据请在url中包含mock-sax
 */
export default function request(url, options = {}) {
  let defReq = {
    method: "GET",
    headers: new Headers({
      // 'Accept-Charset' : 'utf-8',
      'Accept': 'application/json,text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      //可选application/x-www-form-urlencoded  multipart/form-data text/plain application/json
      'Content-Type': 'application/x-www-form-urlencoded', //; charset=utf-8
    }),
    //请求体
    body: null,
    //跨域设置 cors, no-cors, same-origin, 或 navigate
    mode: "cors",
    //cookie发送策略omit, same-origin, 或 include
    credentials: "include",
    //缓存策略 default no-store no-cache reload force-cache only-if-cached具体请查资料
    cache: "default",
    //对重定向处理的模式： follow, error, or manual
    redirect: "follow",
    //no-referrer, client, 或一个 URL
    referrer: "client",
  };

  //mock数据处理
  if (url.includes("mock-sax")) {
    delete options.headers;
    delete defReq.headers;
  } else {
    url = window.apiOrigin ? window.apiOrigin + url : url;
    defReq = setCookie(defReq);
  }

  if ((options.method === "GET" || !options.method) && options.body) {
    if (typeof options.body === "string") {
      options.body = JSON.parse(options.body);
    }

    if (!url.includes("?")) {
      url += "?";
    }

    for (let k in options.body) {
      url += `${k}=${options.body[k]}&`;
    }
    delete options.body;
  }

  // 跨域jsonp
  /*return fetchjsonp(url)
    .then(parseResponse).then(function(json) {
      console.log('parsed json', json); // 在此处进行接收数据之后的操作
    }).catch(function(ex) {
      console.log('parsing failed', ex) // 此处是数据请求失败后的处理
    })*/

  return fetch(url, initOptions(defReq, options))
    .then(checkStatus)
    .then(parseResponse)
    .then(data => ({data}))
    .catch(err => {
      return err;
    });
}
