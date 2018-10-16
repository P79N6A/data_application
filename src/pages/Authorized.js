import React from 'react';
import RenderAuthorized from '@/components/Global/Authorized';
import { getAuthority } from '@/utils/authority';
import Redirect from 'umi/redirect';

// 获取用户权限
const Authority = getAuthority();
// 渲染权限路由
const Authorized = RenderAuthorized(Authority);

export default ({ children }) => {
  return (
    <Authorized authority={children.props.route.authority}
        noMatch={<Redirect to="/user/login"/>}
    >
      {children}
    </Authorized>
  );
};
