// 从本地存储获取用户信息
const defaultAuth=['wan', 'community'];

export function getAuthority(str) {
  // return localStorage.getItem('antd-pro-authority') || ['admin', 'user'];
  const authorityString =
    typeof str === 'undefined' ? localStorage.getItem('authority') : str;
  const path=localStorage.getItem('path');
  // 默认目录路由是data
  const pathAuthority=typeof path === 'undefined' ? 'data': path;
  // authorityString could be admin, "admin", ["admin"]
  let authority;
  try {
    authority = JSON.parse(authorityString);
  } catch (e) {
    authority = authorityString;
  }
  if (typeof authority === 'string') {
    return [authority];
  }
  return authority || defaultAuth;
}

// 把服务端的用户信息存到本地
export function setAuthority(authority) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  return localStorage.setItem('authority', JSON.stringify(proAuthority));
}


export function clearAuthority() {
  return localStorage.setItem('authority', null)
}
