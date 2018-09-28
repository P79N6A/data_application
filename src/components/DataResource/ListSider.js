import React, { Component } from 'react';
import { Icon, Menu, Layout } from 'antd';
import styles from '../../pages/dataResource/resourceList.less';

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

class ListSider extends Component {
  constructor(props) {
    super(props);
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.state = {
      selected: ['sub1', '5'],
    };
  }

  handleMenuClick({ keyPath }) {
    this.setState({ selected: keyPath });
  }

  render() {
    return (
      <div>
        <Sider className={styles['side-bar']} theme="light">
          <Menu
            defaultOpenKeys={['sub1']}
            defaultSelectedKeys={this.state.selected}
            mode="inline"
            onClick={this.handleMenuClick}
            theme="light"
          >
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="mail"/>
                  <span>资源目录查看方式</span>
                </span>
              }
            >
              <Menu.Item key="5">所有数据查看</Menu.Item>
              <SubMenu
                key="sub2"
                title={
                  <span>
                    <Icon type="mail"/>
                    <span>按机构查看</span>
                  </span>
                }
              >
                <SubMenu
                  key="sub3"
                  title={
                    <span>
                      <Icon type="mail"/>
                      <span>学校</span>
                    </span>
                  }
                >
                  <Menu.Item key="31">重庆大学</Menu.Item>
                  <Menu.Item key="32">西南大学</Menu.Item>
                  <Menu.Item key="33">重庆邮电大学</Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub4"
                  title={
                    <span>
                      <Icon type="mail"/>
                      <span>企业</span>
                    </span>
                  }
                >
                  <Menu.Item key="41">长安汽车</Menu.Item>
                  <Menu.Item key="42">永辉超市</Menu.Item>
                  <Menu.Item key="43">富士康集团</Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub5"
                  title={
                    <span>
                      <Icon type="mail"/>
                      <span>政府机构</span>
                    </span>
                  }
                >
                  <Menu.Item key="51">两江公安局</Menu.Item>
                  <Menu.Item key="52">江北交通局</Menu.Item>
                  <Menu.Item key="53">两江居委会</Menu.Item>
                </SubMenu>
              </SubMenu>
            </SubMenu>
          </Menu>
        </Sider>
      </div>
    );
  }
}

export default ListSider;
