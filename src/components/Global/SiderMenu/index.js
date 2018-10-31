import React from 'react';
import { Drawer } from 'antd';
import SiderMenu from './SiderMenu';

/**
 * Recursively flatten the dataResource
 * [{path:string},{path:string}] => {path,path2}
 * @param  menus
 */
const getFlatMenuKeys = menuData => {
  let keys = [];
  menuData.forEach(item => {
    if (item.children) {
      keys = keys.concat(getFlatMenuKeys(item.children));
    }
    keys.push(item.path);
  });
  return keys;
};

const SiderMenuWrapper = props => {
  const { isMobile, menuData, collapsed, onCollapse } = props;
  return (
    <SiderMenu
      {...props}
      flatMenuKeys={getFlatMenuKeys(menuData)}
    />
  )
};

export default SiderMenuWrapper;
