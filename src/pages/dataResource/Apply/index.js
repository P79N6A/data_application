import React, { Component } from 'react';
import { Tabs } from 'antd';
import ApprovalSearch from './ApplySearch';
import ApprovalTable from './ApplyTable';
import { connect } from 'dva';
import './index.less';

class Approval extends Component {
  constructor(props) {
    super(props);
    this.Search = this.Search.bind(this);
    this.onChoose = this.onChoose.bind(this);
    this.state = {
      activeKey: '1'
    };
  }

  // 点击搜索按钮
  Search(values) {
    // 获取值然后去调用接口
    this.props.dispatch({
      type: this.state.activeKey === '1' ? 'approval/fetchUse' : 'approval/fetchRelease',
      payload: values
    });
  }

  // 切换标签
  onChoose(key) {
    this.setState({
      activeKey: key
    });
  }

  render() {
    return (
      <div>
        <ApprovalSearch Search={this.Search}/>
        <ApprovalTable approval={this.props.approval.useList}/>
      </div>
    );
  }
}

export default connect(({ approval }) => ({
  approval
}))(Approval);
