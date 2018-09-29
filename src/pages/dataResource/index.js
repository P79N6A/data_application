import React, { Component } from 'react';
import { Menu } from 'antd';
import { Link, Switch, Route } from 'dva/router';
import { FaClipboardList, FaFolder, FaPencilAlt } from 'react-icons/fa';
import { IoIosCloudUpload } from 'react-icons/io';
import ResourceList from './resourceList';
import ResourceManage from './resourceManage';
import ResourceApply from './resourceApply';
import ResourcePublish from './resourcePublish';

class DataResource extends Component {
  constructor(props) {
    super(props);
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.state = {
      currentMenu: 'manage',
    };
  }

  // 点击菜单切换选中项
  handleMenuClick(e) {
    this.setState({
      currentMenu: e.key,
    });
  }

  render() {
    return (
      <div>
        <div>
          <Menu
            mode="horizontal"
            onClick={this.handleMenuClick}
            selectedKeys={[this.state.currentMenu]}
          >
            <Menu.Item key="list">
              <Link to="/resource/list">
                <FaClipboardList/> 数据资源目录
              </Link>
            </Menu.Item>
            <Menu.Item key="manage">
              <Link to="/resource/manage">
                <FaFolder/> 数据资源管理
              </Link>
            </Menu.Item>
            <Menu.Item key="publish">
              <Link to="/resource/publish">
                <IoIosCloudUpload/> 接口服务发布
              </Link>
            </Menu.Item>
            <Menu.Item key="apply">
              <Link to="/resource/apply">
                <FaPencilAlt/> 接口服务申请
              </Link>
            </Menu.Item>
          </Menu>
        </div>

        <Switch>
          <Route component={ResourceList}
                 exact
                 path="/resource/list"
          />
          <Route component={ResourceManage}
                 exact
                 path="/resource/manage"
          />
          <Route component={ResourceApply}
                 exact
                 path="/resource/apply"
          />
          <Route component={ResourcePublish}
                 exact
                 path="/resource/publish"
          />
        </Switch>
      </div>
    );
  }
}

export default DataResource;
