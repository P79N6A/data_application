import React, { Component } from 'react';
import { Menu } from 'antd';
import Link from 'umi/link';
import styles from './HeaderMenu.less';
import {store} from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';

class HeaderMenu extends Component {
  constructor(props) {
    super(props);
    this.changePathAuth = this.changePathAuth.bind(this);
    this.state={}
  }

  // 切换路由菜单
    changePathAuth (path) {
      this.setState({activePath:path});
  }

  render() {
    let activePath=this.state.activePath;
    return (
      <span className={styles['header-menu']}>
        <Link onClick={()=>this.changePathAuth('data')}
            className={!activePath || activePath==='data' ?styles['active-link']:''}
            to={'/api'}
        > 数据平台</Link>
        <Link onClick={()=>this.changePathAuth('community')}
            className={activePath==='community'?styles['active-link']:''}
            to={'/community'}
        >社区平台</Link>
      </span>
    );
  }
}

export default HeaderMenu;
