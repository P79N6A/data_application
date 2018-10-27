import React, { PureComponent } from 'react';
import BaseInfo from './BaseInfo';
import Operation from './Operation'
import Interface from './Interface'
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;
class Detail extends PureComponent{
  render() {
    return (
      <div>
        <Tabs defaultActiveKey="1">
          <TabPane tab="基本信息" key="1">
            <BaseInfo></BaseInfo>
          </TabPane>
          <TabPane tab="操作记录" key="2">
            <Operation></Operation>
          </TabPane>
          <TabPane tab="接口目录" key="3">
            <Interface></Interface>
          </TabPane>
        </Tabs>
      </div>
    )
  }
}
export default Detail