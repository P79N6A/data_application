import React, { Component } from 'react';
import ApprovalSearch from './ApplySearch';
import ApprovalTable from './ApplyTable';
import { connect } from 'dva';
import './index.less';
class Approval extends Component {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this)
    this.fetchList = this.fetchList.bind(this)
    this.state = {
      applyType: '0',
      status: '0',
      beginDate: null,
      endDate: null,
      pageParam: {
        pageIndex: 1,
        pageSize: 10,
        orderFiled: 'approve_date',
        orderRule: 'desc'
      }
    }
  }
  componentDidMount() {
    this.fetchList(this.state)
  }
  // 点击搜索按钮
  search(values) {
    let payload = {...this.state, ...values}
    this.fetchList(payload)
    this.setState({
      ...values
    })
  }
  // 获取列表
  fetchList(payload) {
    this.props.dispatch({
      type: 'apply/fetchApply',
      payload: payload
    })
  }
  render() {
    return (
      <div style={{padding: '24px 32px'}}>
        <ApprovalSearch search={this.search}/>
        <ApprovalTable
            apply={this.props.apply.applyList}
            search={this.search}
        ></ApprovalTable>
      </div>
    );
  }
}

export default connect(({apply}) => ({
  apply
}))(Approval);
