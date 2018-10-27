import React, { Component } from 'react';
import { Menu } from 'antd';
import Link from 'umi/link';
import styles from './HeaderMenu.less';
import {store} from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';

class HeaderMenu extends Component {
  constructor(props) {
    super(props);
    this.state={selectedKeys:[]}
  }

  // 切换路由菜单
   async changePathAuth (path) {
    await store('save',{'path':path});
     await reloadAuthorized();
  }

  render() {

    return (
      <span className={styles['header-menu']}>
        <Link onClick={()=>this.changePathAuth('data')}
            to={'/api'}
        > 数据平台</Link>
        <Link onClick={()=>this.changePathAuth('community')}
            to={'/community'}
        >社区平台</Link>
      </span>
    );
  }
}

export default HeaderMenu;
