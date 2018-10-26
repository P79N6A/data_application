import React, { Component } from 'react'
import { connect } from 'dva';
import Table from '@/components/Common/Table/1.0'
import InterfaceSearch from './InterfaceSearch'
import {interfaceList} from '@/services/apply'
import {Badge,message} from 'antd'
import BaseModal from '@/components/DataResource/Modal/BaseModal'
import InterfaceList from '@/components/DataResource/Modal/ApprovalDetailModal/InterfaceList'
const STATUS = ['未使用', '已使用']
const rowSelection = {
  getCheckboxProps: record => ({
    disabled: record.status === '1'   // 已使用就不能够再次勾选
  })
}
class Interface extends Component{
  constructor(props) {
    super(props)
    this.state={
      modal:{
        modalTitle:'接口详情',
        modalVisible:false,
        modalContent:{}
      },
      column:[
        {
          title: '接口名称',
          dataIndex: 'interfaceName',
          key: 'interfaceName'
        }, {
          title: '描述',
          dataIndex: 'interfaceDesc',
          key: 'interfaceDesc'
        }, {
          title: '服务名称',
          dataIndex: 'serviceName',
          key: 'serviceName'
        }, {
          title: '状态',
          dataIndex: 'status',
          key: 'status',
          render: (text) => {
            return (<span>
              <Badge status={text === '0' ? 'success' : 'default'} text={STATUS[text]} />
            </span>)
          }
        }, {
          title: '操作',
          key: 'action',
          render: (text, record) => {
            return record.status === '0' ?
              (
                <span><a onClick={this.details.bind(this, record)}>详情</a></span>
              ) : (
                <span><a onClick={() => {message.success('点赞成功')}}>点赞</a></span>
              )
          }
      }]
    }
  }
  // 点击展开详情
  details = (record) => {
    this.setState({
      modal:{
        modalVisible:true,
        children: <InterfaceList interfaceInfos={[record]}/>
      }
    })
  }
  // 点击隐藏详情
  handleCancel = () => {
    this.setState({
      modal:{
        modalVisible:false
      }
    })
  }
  render() {
    const {catalog} = this.props.global
    let {modal={}}=this.state;
    return(
      <div>
        <BaseModal
            {...modal}
            handleModalCancel={this.handleCancel}
            handleModalOk={this.handleModalOk}
         />
        <Table
            antdTableProps={{
              rowSelection
            }}
            columnsArr={this.state.column}
            getFn={interfaceList}
            hasSearch={false}
            HeaderExtend={InterfaceSearch}
            recordIDName="interfaceId"
            searchExtendParam={{catalogId: catalog[0].id, status: '0'}}
        />
      </div>
    )
  }
}
export default connect(({apply, global}) => ({
  apply,
  global
}))(Interface)
