import React, { Component } from 'react';
import ApprovalSearch from './ApprovalSearch';
import ApprovalTable from './ApprovalTable';
import { connect } from 'dva';
import { message } from 'antd'
import './index.less';
import { OK_CODE } from '@/config/code'
class Approval extends Component {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this)
    this.fetchList = this.fetchList.bind(this)
    this.operation = this.operation.bind(this)
    this.state = {
      applyType: '0',
      status: '0',
      beginDate: '',
      endDate: '',
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
      type: 'approval/fetchRelease',
      payload: payload
    })
  }
  //  操作同意或者拒绝
  operation(values) {
    this.props.dispatch({
      type: 'approval/operation',
      payload: values,
      callback: (res) => {
        if(res.code !== OK_CODE) {
          message.warning(res.message)
          return
        }
        // 重新获取数据
        this.fetchList(this.state)
      }
    })
  }
  render() {
    return (
      <div>
        <ApprovalSearch search={this.search}/>
        <ApprovalTable
            approval={this.props.approval.reseaseList}
            operation={this.operation}
            search={this.search}
        ></ApprovalTable>
      </div>
    );
  }
}

export default connect(({ approval }) => ({
  approval
}))(Approval);
