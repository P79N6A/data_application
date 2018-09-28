import React, { Component } from 'react';
import { Layout } from 'antd';
import styles from './resourceList.less';
import ListSider from '../../components/DataResource/ListSider';
import ListContent from '../../components/DataResource/ListContent';

const { Header, Content, Footer } = Layout;

class ResourceList extends Component {
  render() {
    return (
      <div>
        <Layout style={{ minHeight: '70vh' }}>
          {/* 左侧栏 */}
          <ListSider/>
          {/* 内容部分 */}
          <Layout style={{ padding: '0 0 0 16px' }}>
            <Header className={styles['content-bar']} style={{ background: '#fff', padding: 0 }}>
              <span>资源目录列表</span>
            </Header>

            <Content>
              <ListContent/>
            </Content>

            <Footer style={{ textAlign: 'center' }}>紫光华山智安科技有限公司</Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default ResourceList;
