import React, {Component} from 'react';
import {Icon, Menu, Layout} from 'antd';
import {Link, Switch, Route} from 'dva/router';
import ResourceList from './resourceList';
import ResourceManage from './resourceManage';
import {FaClipboardList, FaFolder} from 'react-icons/fa'


const {Header} = Layout.Header;

class DataResource extends Component {
  constructor(props) {
    super(props);
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.state = {
      currentMenu: 'list'
    };
  }

  handleMenuClick(e) {
    this.setState({
      currentMenu: e.key
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
              <Link to={'/resource/list'}><FaClipboardList/> 数据资源目录</Link>
            </Menu.Item>
            <Menu.Item key="manage">
              <Link to={'/resource/manage'}><FaFolder/> 数据资源管理</Link>
            </Menu.Item>
          </Menu>
        </div>
        <Switch>
          <Route component={ResourceList}
                 exact
                 path={'/resource/list'}
          />
          <Route component={ResourceManage}
                 exact
                 path={'/resource/manage'}
          />
        </Switch>
      </div>
    );
  }
}

export default DataResource;
