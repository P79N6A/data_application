import React, { Component } from 'react';
import ApprovalSearch from './ApprovalSearch';
import ApprovalTable from './ApprovalTable';
import { connect } from 'dva';
import './index.less';
class Approval extends Component {
  constructor(props) {
    super(props);
    this.Search = this.Search.bind(this)
    this.state = {
      applyType: '',
      status: '',
      beginDate: '',
      endDate: '',
      pageParam: {
        pageIndex: 1,
        pageSize: 10,
        orderFiled: 'apply_date',
        orderRule: 'desc'
      }
    }
  }
  // 点击搜索按钮
  Search(values) {
    console.log(values)
    let payload = {...this.state, ...values}
    // 获取值然后去调用接口
    this.props.dispatch({
      type: 'approval/fetchRelease',
      payload: payload
    })
    this.setState({
      ...values
    })
  }
  // 切换标签
  onChoose(key) {
    this.setState({
      activeKey: key
    })
  }
  render() {
    return (
      <div>
        <ApprovalSearch Search={this.Search}/>
        <ApprovalTable Search={this.Search}
            approval={this.props.approval.reseaseList}
        />
      </div>
    );
  }
}

export default connect(({ approval }) => ({
  approval
}))(Approval);
