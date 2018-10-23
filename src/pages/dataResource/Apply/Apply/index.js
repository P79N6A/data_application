import React, { Component } from 'react';
import ApprovalSearch from './ApplySearch';
import ApprovalTable from './ApplyTable';
import InterfaceTable from './InterfaceTable'
import { connect } from 'dva';
import { Tabs } from 'antd'
import './index.less';
const TabPane = Tabs.TabPane;
class Approval extends Component {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this)
    this.fetchList = this.fetchList.bind(this)
    this.applyInterface = this.applyInterface.bind(this)
    this.fetchInterface = this.fetchInterface.bind(this)
    this.state = {
      // 处理我的申请的集合
      search: {
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
      },
      // 处理接口
      interface: {
        catalogId: '1',
        serviceName: null,
        status: null,
        interfaceName: null,
        serviceMethodType: null,
        pageParam: {
          pageIndex: 1,
          pageSize: 3,
          orderFiled: 'last_update',
          orderRule: 'desc'
        }
      },
      // 控制那个table显示
      status: 1
    }
  }
  componentDidMount() {
    this.fetchList(this.state.search)
    this.fetchInterface(this.state.interface.pageParam)
  }
  // 点击搜索按钮
  search(values) {
    let payload = {...this.state.search, ...values}
    this.fetchList(payload)
    this.setState({
      search: {...values},
      status: 1
    })
  }
  // 获取服务列表
  fetchList(payload) {
    this.props.dispatch({
      type: 'apply/fetchApply',
      payload: payload
    })
  }
  // 服务申请
  applyInterface() {
    this.setState({
      status: 0
    })
    this.fetchInterface(this.state.interface.pageParam)
  }
  // 获取接口列表
  // payload为分页参数
  fetchInterface(payload, status) {
    let params = {...this.state.interface, pageParam: payload, status: !status ? null : status}
    this.props.dispatch({
      type: 'apply/fetchInterface',
      payload: params
    })
    this.setState({
      interface: {...params}
    })
  }
  render() {
    return (
      <div style={{padding: '24px 32px'}}>
        <Tabs type="card">
          <TabPane key="1" tab="已申请服务">
            <ApprovalSearch search={this.search}/>
            <ApprovalTable
                apply={this.props.apply.applyList}
                search={this.search}
                status={this.state.status}
            ></ApprovalTable>
          </TabPane>
          <TabPane key="2" tab="服务申请">
            <InterfaceTable 
              fetchInterface={this.fetchInterface}
              interfaces={this.props.apply.interfaces}
              status={this.state.status}
          >
            </InterfaceTable>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default connect(({apply}) => ({
  apply
}))(Approval);
