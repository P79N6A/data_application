import React, { Component } from 'react';
import { Tabs } from 'antd';
import ApprovalSearch from './ApprovalSearch';
import ApprovalTable from './ApprovalTable';
import { connect } from 'dva'
class Approval extends Component {
  constructor(props) {
    super(props);
    this.Search = this.Search.bind(this)
    this.onChoose = this.onChoose.bind(this)
    this.state = {
      activeKey: '1'
    }
  }
  // 点击搜索按钮
  Search(values) {
    // 获取值然后去调用接口
    this.props.dispatch({
      type: this.state.activeKey === '1' ? 'approval/fetchUse': 'approval/fetchRelease',
      payload: values
    })
  }
  // 切换标签
  onChoose(key) {
    console.log(this.props.approval)
    this.setState({
      activeKey: key
    })
  }
  render() {
    return (
      <div>
        <Tabs defaultActiveKey={this.state.activeKey} onChange={this.onChoose}>
          <Tabs.TabPane key="1" tab="接口使用">
            <ApprovalSearch Search={this.Search}/>
            <ApprovalTable approval={this.props.approval.useList}/>
          </Tabs.TabPane>
          <Tabs.TabPane key="2" tab="接口发布">
            <ApprovalSearch Search={this.Search}/>
            <ApprovalTable approval={this.props.approval.reseaseList}/>
          </Tabs.TabPane>
        </Tabs>
      </div>
    );
  }
}
export default connect(({approval}) => ({
  approval
}))(Approval);
