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
    const menus=[
        {name:'资源管理', path:'catalog'},
        {name:'数据采集', path:'data'},
        {name:'数据应用', path:'application'},
        {name:'数据服务', path:'api'},
        {name:'运维统计', path:'audit'},
        {name:'任务调度', path:'task'},
    ];
    return (
      <span className={styles['header-menu']}>
        {menus.map(menu=>(
          <Link
            onClick={()=>this.changePathAuth(menu.path)}
            className={!currentApp || currentApp===menu.path ?styles['active-link']:''}
            to={`/${menu.path}`}
          > {menu.name}
          </Link>
        ))}
      </span>
    );
  }
}

HeaderMenu.propTypes = {
  currentApp: PropTypes.string,
};

export default HeaderMenu;
