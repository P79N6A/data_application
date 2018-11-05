import React, { Component } from 'react';
import { Menu, Dropdown } from 'antd';
import Link from 'umi/link';
import PropTypes from 'prop-types';
import styles from './HeaderMenu.less';
import {store} from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';
import style from '../../../styles/iconfont.css';

class HeaderMenu extends Component {
  constructor(props) {
    super(props);
    this.changePathAuth = this.changePathAuth.bind(this);
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
      {name:'资源管理', path:'catalog',icon:'icon-web-icon-'},
      {name:'服务管理', path:'api',icon:'icon-anquanfuwuguanli'},
      {name:'数据采集', path:'data',icon:'icon-zhongguohangtiantubiaoheji-weizhuanlunkuo-'},
      {name:'数据应用', path:'application',icon:'icon-yingyong'},
      // {name:'运维统计', path:'audit'},
      // {name:'任务调度', path:'task'},
      ]

    const menuitem = [
      {name:'运维统计', path:'audit',icon:'icon-tongji'},
      {name:'任务调度', path:'task',icon:'icon-renwutiaodu'},
    ]

    const menudrop = (
      <Menu>
        {menuitem.map(menu=>(
          <Menu.Item className={!currentApp || currentApp===menu.path ?`${styles['active-link']} ${styles.dropLi}`:styles.dropLi}>
            <i className={`${style.iconfont  } ${ style[menu.icon]}`} />
            <Link
              onClick={()=>this.changePathAuth(menu.path)}
              to={`/${menu.path}`}
            > {menu.name}
            </Link>
          </Menu.Item>
        ))}
      </Menu>
    );
    return (
      <span className={styles['header-menu']}>
      
        {menus.map(menu=>(
          
          <Link
            onClick={()=>this.changePathAuth(menu.path)}
            className={!currentApp || currentApp===menu.path ?styles['active-link']:''}
            to={`/${menu.path}`}
          > 
            <i className={`${styles.titleIcon  } ${  style.iconfont  } ${ style[menu.icon]}`} />
            {menu.name}
          </Link>
        ))}
        <Dropdown overlay={menudrop}>
          <a className="ant-dropdown-link" href="#">
            更多
          </a>
        </Dropdown>
      </span>

    );
  }
}

HeaderMenu.propTypes = {
  currentApp: PropTypes.string,
};

export default HeaderMenu;
