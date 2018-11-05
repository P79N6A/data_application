import React, { PureComponent } from 'react';
import { Menu, Icon } from 'antd';
import Link from 'umi/link';
import { formatMessage } from 'umi/locale';
import pathToRegexp from 'path-to-regexp';
import PropTypes from 'prop-types';
import { urlToList } from '../../_utils/pathTools';
import styles from './index.less';

const { SubMenu } = Menu;

const pathMenu={
  data:['data'],
  community:['community'],
  api:['api'],
  catalog:['catalog'],
  audit:['audit'],
  application:['application'],
  task:['task'],
}

// Allow menu.js config icon as string or ReactNode
//   icon: 'setting',
//   icon: 'http://demo.com/icon.png',
//   icon: <Icon type="setting" />,

const getIcon = icon => {
  if (typeof icon === 'undefined'){
    return <React.Fragment />
  }
  if (typeof icon === 'string' && icon.indexOf('http') === 0) {
    return (
      <img
        alt="icon"
        className={styles.icon}
        src={icon}
      />
);
  }
  if (typeof icon === 'string') {
    return <Icon type={icon} />;
  }
  return icon;
};

export const getMenuMatches = (flatMenuKeys, path) =>
     flatMenuKeys.filter(item => item && pathToRegexp(item).test(path));


export default class BaseMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.flatMenuKeys = this.getFlatMenuKeys(props.menuData);
  }

  /**
   * Recursively flatten the dataResource
   * [{path:string},{path:string}] => {path,path2}
   * @param  menus
   */
  getFlatMenuKeys(menus) {
    let keys = [];
    menus.forEach(item => {
      if (item.children) {
        keys = keys.concat(this.getFlatMenuKeys(item.children));
      }
      keys.push(item.path);
    });
    return keys;
  }

  /**
   * 获得菜单子节点
   * @memberof SiderMenu
   */
  getNavMenuItems = (menusData, parent) => {
    if (!menusData) {
      return [];
    }
    const {location}=this.props;
    return menusData
      .filter(item => item.name && !item.hideInMenu)
      .map(item => {
        // make dom
        const ItemDom = this.getSubMenuOrItem(item, parent);
        return this.checkPermissionItem(item.authority, ItemDom);
      })
      .filter(item =>  {
        if (!item) {return false}
        const path=pathToRegexp.parse(location.pathname)[0].split('/').filter(i=>i)[0];

        for (const k in pathMenu){
          const menu=pathMenu[k];
          if (menu.includes(path)){
            return menu.some((v) =>item.key.includes(v))
          }
        }
        return false;
      });
  };

  // 选中菜单
  getSelectedMenuKeys = () => {
    const {
      location: { pathname },
    } = this.props;
    return urlToList(pathname).map(itemPath => getMenuMatches(this.flatMenuKeys, itemPath).pop());
  };

  /**
   * get SubMenu or Item
   */
  getSubMenuOrItem = item => {
    // doc: add hideChildrenInMenu
    if (item.children && !item.hideChildrenInMenu && item.children.some(child => child.name)) {
      const name = formatMessage({ id: item.locale });
      return (
        <SubMenu
          key={item.path}
          title={
            item.icon ? (
              <span>
                {getIcon(item.icon)}
                <span>{name}</span>
              </span>
            ) : (
              name
            )
          }
        >
          {this.getNavMenuItems(item.children)}
        </SubMenu>
      );
    }
    return <Menu.Item key={item.path}>{this.getMenuItemPath(item)}</Menu.Item>;
  };

  /**
   * 判断是否是http链接.返回 Link 或 a
   * Judge whether it is http link.return a or Link
   * @memberof SiderMenu
   */
  getMenuItemPath = item => {
    const name = formatMessage({ id: item.locale });
    const itemPath = this.conversionPath(item.path);
    const icon = getIcon(item.icon);
    const { target } = item;
    // Is it a http link
    if (/^https?:\/\//.test(itemPath)) {
      return (
        <a
          href={itemPath}
          target={target}
        >
          {icon}
          <span>{name}</span>
        </a>
      );
    }
    const { location, isMobile, onCollapse } = this.props;
    return (
      <Link
        onClick={
          isMobile
            ? () => {
                onCollapse(true);
              }
            : undefined
        }
        replace={itemPath === location.pathname}
        target={target}
        to={itemPath}
      >
        {icon}
        <span>{name}</span>
      </Link>
    );
  };

  // permission to check
  checkPermissionItem = (authority, ItemDom) => {

    const { Authorized } = this.props;
    if (Authorized && Authorized.check) {
      const { check } = Authorized;
      return check(authority, ItemDom);
    }
    return ItemDom;
  };

  conversionPath = path => {
    if (path && path.indexOf('http') === 0) {
      return path;
    }
    return `/${path || ''}`.replace(/\/+/g, '/');
  };

  render() {
    const { openKeys, theme, mode, handleOpenChange, style, menuData, location } = this.props;
    // 无匹配时使用默认值
    let selectedKeys = this.getSelectedMenuKeys();
    if (!selectedKeys.length && openKeys) {
      selectedKeys = [openKeys[openKeys.length - 1]];
    }
    let props = {};
    if (openKeys) {
      props = {
        openKeys,
      };
    }
    return (
      <Menu
        className={mode === 'horizontal' ? 'top-nav-menu' : ''}
        key="Menu"
        mode={mode}
        onOpenChange={handleOpenChange}
        selectedKeys={selectedKeys}
        style={style}
        theme={theme}
        {...props}
      >
        {this.getNavMenuItems(menuData, location)}
      </Menu>
    );
  }
}
// const { openKeys, theme, mode, handleOpenChange, style, menuData } = this.props;

BaseMenu.propTypes = {
  mode:PropTypes.string,
  theme:PropTypes.string,
  openKeys:PropTypes.array,
  handleOpenChange:PropTypes.func,
  style:PropTypes.object,
  menuData:PropTypes.array,
  location:PropTypes.shape({
    pathname:PropTypes.string,
  }),
};
