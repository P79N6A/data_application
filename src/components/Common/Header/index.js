import React, { PureComponent } from 'react';
import { Icon, Menu, Popover } from 'antd';
import { Link } from 'dva/router';
import pathToRegexp from 'path-to-regexp';
import styles from './index.less';
import logo from '../../../assets/logo/logo.png';
import { getMenuData } from '../../../common/menu';
import { getCookie } from '../../../utils/utils';

export const getFlatMenuKeys = menu =>
  menu.reduce((keys, item) => {
    keys.push(item.path);
    return keys;
  }, []);

export const getMenuMatchKeys = (flatMenuKeys, paths) =>
  paths.reduce(
    (matchKeys, path) =>
      matchKeys.concat(flatMenuKeys.filter(item => pathToRegexp(item).test(path))),
    [],
  );

export default class VideoHeader extends PureComponent {
  constructor() {
    super();
    this.flatMenuKeys = getFlatMenuKeys(getMenuData());
  }

  urlToList = url => {
    const urllist = url.split('/').filter(i => i);
    return urllist.map((urlItem, index) => `/${urllist.slice(0, index + 1).join('/')}`);
  };

  getSelectedMenuKeys = () => {
    const {
      location: { pathname },
    } = this.props;
    return getMenuMatchKeys(this.flatMenuKeys, this.urlToList(pathname));
  };

  render() {
    const selectedKeys = this.getSelectedMenuKeys();
    const username = getCookie('username');
    const content = (
      <div style={{ height: '60px' }}>
        <p style={{ color: '#595959' }}>
          <Icon type="setting"/>
          设置
        </p>
        <p style={{ color: '#595959' }}>
          <Icon type="poweroff"/>
          <a href="/logout">退出</a>
        </p>
      </div>
    );
    return (
      <div className={styles.headerWrap}>
        <div className={styles.logoWrap}>
          <img alt="logo" className={styles.logo} src={logo}/>
          <span>紫光华智安防项目</span>
        </div>

        <div className={styles.userInfoPanel}>
          <Icon type="user"/>
          <span className={styles.userName}>{username}</span>
          <Popover arrowPointAtCenter content={content} placement="bottomLeft" trigger="click">
            <Icon type="down"/>
          </Popover>
        </div>
        <Menu className={styles['menu-list']} mode="horizontal" selectedKeys={selectedKeys}>
          {getMenuData().map(item => (
            <Menu.Item key={item.path}>
              <Link to={item.path}>
                <span>{item.name}</span>
              </Link>
            </Menu.Item>
          ))}
        </Menu>
      </div>
    );
  }
}
