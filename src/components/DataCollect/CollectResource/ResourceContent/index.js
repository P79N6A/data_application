import React, {Component} from 'react';
import { Tabs } from 'antd'
import InsderRerource from '../InsderRerource'
import OutResource from '../OutResource'
const TabPane = Tabs.TabPane;
class ResourceContent extends Component{
  constructor(props){
    super(props)
  }
  render() {
    return (
    <div style={{height: '100%'}}>
      <Tabs style={{height: '100%'}} tabPosition="left">
        <TabPane key="2" style={{height: '100%'}} tab="内部数据"><InsderRerource></InsderRerource></TabPane>
        <TabPane key="1" style={{height: '100%'}} tab="外部数据"><OutResource></OutResource></TabPane>
      </Tabs>
    </div>)
  }
}
export default ResourceContent