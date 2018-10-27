import React, { Component } from 'react';
import { Menu } from 'antd';
import Link from 'umi/link';
import styles from './HeaderMenu.less';
import {store} from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';
import PropTypes from 'prop-types';

class HeaderMenu extends Component {
  constructor(props) {
    super(props);
    this.changePathAuth = this.changePathAuth.bind(this);
    this.state={activePath:'data'}
  }

  // 切换路由菜单
    changePathAuth (path) {
      this.props.dispatch({
        type:'global/changeCurrentApp',
        payload:{currentApp:path}
      })
  }

  render() {
    const {currentApp}=this.props;
    return (
      <span className={styles['header-menu']}>
        <Link onClick={()=>this.changePathAuth('data')}
            className={!currentApp || currentApp==='data' ?styles['active-link']:''}
            to={'/api'}
        > 数据平台</Link>
        <Link onClick={()=>this.changePathAuth('community')}
            className={currentApp==='community'?styles['active-link']:''}
            to={'/community'}
        >社区平台</Link>
      </span>
    );
  }
}

HeaderMenu.propTypes = {
  currentApp: PropTypes.string
};

export default HeaderMenu;
