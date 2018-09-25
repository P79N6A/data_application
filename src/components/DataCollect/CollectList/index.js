import React, {Component} from 'react';
import CollectSilder from './CollectSilder'
import ListContent from './ListContent/index'
import { Layout } from 'antd';
const { Sider, Content } = Layout;
class CollectList extends Component{
  render() {
    return (
      <div style={{flex: 1, padding: '0 11px', marginTop: '5px'}}>
        <Content style={{height: '100%', display: 'flex'}}>
          <Sider style={{background: '#fff'}}><CollectSilder {...this.props}></CollectSilder></Sider>
          <Content>
            <ListContent></ListContent>
          </Content>
        </Content>
      </div>
    )
  }
}
export default CollectList