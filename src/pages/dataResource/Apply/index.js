import React, { Component } from 'react';
import { Tabs } from 'antd'
import Apply from './Apply'
import Interface from './Interface'
const TabPane = Tabs.TabPane;
class Approval extends Component {
  state = {
    activeKey: '1'
  }
  callback = (key) => {
    this.setState({
      activeKey: key
    })
  }
  render() {
    return (
      <div style={{padding: '24px 32px'}}>
        <Tabs onChange={this.callback} type="card">
          <TabPane key="1" tab="已提交申请">
          {this.state.activeKey==='1'?<Apply/>:<div> </div>}
            {/* <Apply></Apply> */}
          </TabPane>
          <TabPane key="2" tab="申请服务">
            {/* <Interface></Interface> */}
            {this.state.activeKey==='2'?<Interface/>:<div> </div>}
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Approval
