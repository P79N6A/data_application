import React, {Component} from 'react';
import {Layout, Menu, Breadcrumb, Icon, Button} from 'antd';
import styles from "./resourceList.less"
import ListSider from "components/DataResource/ListSider"
import ListContent from "components/DataResource/ListContent"

const {Header, Content, Footer, Sider} = Layout;
const SubMenu = Menu.SubMenu;


class ResourceList extends Component {
  state = {
    collapsed: false,
  };
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({collapsed});
  }

  render() {
    return (
      <div>
        <Layout style={{minHeight: '70vh'}}>

          <ListSider/>

          <Layout style={{padding: "0 0 0 16px"}}>

            <Header className={styles["content-bar"]} style={{background: '#fff', padding: 0}}>
              <span>资源目录列表</span>
            </Header>

            <Content>
              <ListContent/>
            </Content>

            <Footer style={{textAlign: 'center'}}>
              紫光华山智安科技有限公司
            </Footer>

          </Layout>
        </Layout>
      </div>
    );
  }
}

export default ResourceList;
