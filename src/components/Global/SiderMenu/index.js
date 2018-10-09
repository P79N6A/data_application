import React from 'react';
import { Drawer } from 'antd';
import SiderMenu from './SiderMenu';

/**
 * Recursively flatten the data
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
  return isMobile ? (
    <Drawer
      onClose={() => onCollapse(true)}
      placement="left"
      style={{
        padding: 0,
        height: '100vh',
      }}
      visible={!collapsed}
    >
      <SiderMenu
        {...props}
        collapsed={isMobile ? false : collapsed}
        flatMenuKeys={getFlatMenuKeys(menuData)}
      />
    </Drawer>
  ) : (
    <SiderMenu {...props}
               flatMenuKeys={getFlatMenuKeys(menuData)}
    />
  );
};

export default SiderMenuWrapper;