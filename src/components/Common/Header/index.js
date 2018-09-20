import React, {PureComponent} from 'react';
import {Layout, Icon, Menu, Popover, Button} from 'antd';
import styles from './index.less'
import {Link} from 'dva/router';
import logo from '../../../assets/logo/logo.png';
import pathToRegexp from 'path-to-regexp';
import {getMenuData} from '../../../common/menu';
import {getCookie} from "../../../utils/utils";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export const getFlatMenuKeys = menu =>
  menu.reduce((keys, item) => {
    keys.push(item.path);
    return keys;
  }, []);

export const getMenuMatchKeys = (flatMenuKeys, paths) =>
  paths.reduce(
    (matchKeys, path) =>
      matchKeys.concat(flatMenuKeys.filter(item => pathToRegexp(item).test(path))),
    []
  );

export default class VideoHeader extends PureComponent {
  urlToList = (url) => {
    const urllist = url.split('/').filter(i => i);
    return urllist.map((urlItem, index) => {
      return `/${urllist.slice(0, index + 1).join('/')}`;
    });
  }
  getSelectedMenuKeys = () => {
    const {
      location: {pathname},
    } = this.props;
    return getMenuMatchKeys(this.flatMenuKeys, this.urlToList(pathname));
  }

  constructor() {
    super();
    this.flatMenuKeys = getFlatMenuKeys(getMenuData());
  }

  render() {
    let path = this.props.location.pathname;
    let selectedKeys = this.getSelectedMenuKeys();
    let username = getCookie('username')
    const content = (
      <div style={{height: '60px'}}>
        <p style={{color: '#595959'}}><Icon type="setting"/>设置</p>
        <p style={{color: '#595959'}}><Icon type="poweroff"/>
          <a href="/logout">退出</a>
        </p>
      </div>
    );
    return (
      <div className={styles.headerWrap}>
        <div className={styles.logoWrap}>
          <img className={styles.logo} src={logo} alt="logo"/>
          <span>紫光华智安防项目</span>
        </div>

        <div className={styles.userInfoPanel}>
          <Icon type="user"/><span className={styles.userName}>{username}</span>
          <Popover placement="bottomLeft" arrowPointAtCenter trigger="click">
            <Icon type="down"/>
          </Popover>
        </div>
        <Menu
          selectedKeys={selectedKeys}
          mode="horizontal"
          className={styles["menu-list"]}
        >
          {getMenuData().map(item => (
            <Menu.Item key={item.path}>
              <Link to={item.path}>
                <span>{item.name}</span>
              </Link>
            </Menu.Item>
          ))
          }
        </Menu>

      </div>
    );
  }
}
