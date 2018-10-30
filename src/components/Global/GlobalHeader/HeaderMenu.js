import React, { Component } from 'react';
import { Menu } from 'antd';
import Link from 'umi/link';
import PropTypes from 'prop-types';
import styles from './HeaderMenu.less';
import {store} from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';

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
        payload:{currentApp:path},
      })
  }

  render() {
    const {currentApp}=this.props;
    return (
      <span className={styles['header-menu']}>
        <Link
          onClick={()=>this.changePathAuth('api')}
          className={!currentApp || currentApp==='api' ?styles['active-link']:''}
          to="/api"
        > 服务管理
        </Link>
        <Link
          onClick={()=>this.changePathAuth('data')}
          className={currentApp==='data'?styles['active-link']:''}
          to="/data"
        >数据采集
        </Link>
        <Link
          onClick={()=>this.changePathAuth('application')}
          className={currentApp==='application'?styles['active-link']:''}
          to="/application"
        >数据应用
        </Link>
        <Link
          onClick={()=>this.changePathAuth('catalog')}
          className={currentApp==='catalog'?styles['active-link']:''}
          to="/catalog"
        >资源管理
        </Link>
        <Link
          onClick={()=>this.changePathAuth('audit')}
          className={currentApp==='audit'?styles['active-link']:''}
          to="/audit"
        >运维统计
        </Link>
      </span>
    );
  }
}

HeaderMenu.propTypes = {
  currentApp: PropTypes.string,
};

export default HeaderMenu;
