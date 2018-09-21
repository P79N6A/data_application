import React, {Component} from 'react';
import styles from '../../routes/dataResource/resourceList.less';
import {Icon, Menu, Layout} from 'antd';

const {Sider} = Layout;
const SubMenu = Menu.SubMenu;

class ListSider extends Component {
  render() {
    return (
      <div>
        <Sider
          className={styles['side-bar']}
          theme={'light'}
        >
          <Menu
            defaultOpenKeys={['sub1']}
            defaultSelectedKeys={['5']}
            mode="inline"
            theme="light"
          >
            <SubMenu key="sub1"
                     title={<span><Icon type="mail"/><span>资源目录查看方式</span></span>}
            >
              <Menu.Item key="5">所有数据查看</Menu.Item>
              <Menu.Item key="6">按数据主管部门查看</Menu.Item>
              <Menu.Item key="7">按资源来源域查看</Menu.Item>
            </SubMenu>
          </Menu>
          <div className={'apply'}>
            <p>
              <Icon theme="outlined"
                    type="folder-add"
              />
              <span>新数据资源库添加申请</span>
            </p>
            <p>
              <Icon theme="outlined"
                    type="file-add"
              />
              <span>新数表添加申请</span>
            </p>
          </div>

        </Sider>
      </div>
    );
  }
}

export default ListSider;
