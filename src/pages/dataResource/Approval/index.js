import React, { Component } from 'react';
import ApprovalSearch from './ApprovalSearch';
import ApprovalTable from './ApprovalTable';
import { connect } from 'dva';
class Approval extends Component {
  constructor(props) {
    super(props);
    this.Search = this.Search.bind(this);
  }

  Search(values) {
    // 获取值然后去调用接口
    this.props.dispatch({
      type: 'approval/fetchApproval',
      payload: values,
    });
  }
  render() {
    return (
      <div>
        <ApprovalSearch Search={this.Search}/>
        <ApprovalTable approval={this.props.approval}/>
      </div>
    );
  }
}

export default connect(({ approval }) => ({
  approval,
}))(Approval);
