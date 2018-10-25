import React, { Component } from 'react'
import { Table, Badge, Button, message  } from 'antd'
import { OK_CODE } from '@/config/code'
import BaseModal from '@/components/DataResource/Modal/BaseModal'
import InterfaceList from '@/components/DataResource/Modal/ApprovalDetailModal/InterfaceList'
// import Table from '@/components/Table'
const STATUS = ['未使用', '已使用']
class InterfaceTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      columns: [
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
        }],
      rowSelection: {
        onChange: (selectedRowKeys, selectedRows) => {
          this.setState({
            selectedRows: selectedRows,
            selectedRowKeys: selectedRowKeys
          })
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({
          disabled: record.status === '1'   // 已使用就不能够再次勾选
        })
      },
      pagination: {
        total: 0,
        defaultCurrent: 1,
        pageSize: 10,
        showQuickJumper: true
      },
      selectedRows: [],
      selectedRowKeys: [],
      modal:{
        modalTitle:'接口详情',
        modalVisible:false,
        modalContent:{}
      }
    }
  }
  handleTableChange = (pagination) => {
    let pageParam = {
      pageParam: {
        pageIndex: pagination.current,
        pageSize: pagination.pageSize,
        orderFiled: 'last_update',
        orderRule: 'desc'
      }
    }
    this.props.fetchInterface(pageParam)
  }
  sumbit = () => {
    console.log(this.state.selectedRows)
    const interfaceIds = (this.state.selectedRows.map(item => item.interfaceId)).join(',')
    this.props.dispatch({
      type: 'apply/add',
      payload: {
        applyDesc: '接口使用申请',
        applyType: '1',
        interfaceIds
      },
      callback: (res) => {
        if (res.code === OK_CODE) {
          // 操作成功
          this.setState({
            selectedRows: [],
            selectedRowKeys: []
          })
          // 重新获取数据
          let pageParam = {
            pageParam: {
              pageIndex: this.state.pagination.defaultCurrent,
              pageSize: this.state.pagination.pageSize,
              orderFiled: 'last_update',
              orderRule: 'desc'
            }
          }
          this.props.fetchInterface(pageParam)
        }
      }
    })
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
    const { interfaces } = this.props
    let {modal={}}=this.state;
    return (
      <div>
        <BaseModal
            {...modal}
            handleModalCancel={this.handleCancel}
            handleModalOk={this.handleModalOk}
         />
        <Button onClick={this.sumbit} style={{ display: this.state.selectedRows.length > 0 ? 'block' : 'none' }} type="primary">提交审批</Button>
        <Table columns={this.state.columns}
            dataSource={interfaces.data}
            onChange={this.handleTableChange}
            pagination={{ ...this.state.pagination, ...interfaces.pageParam }}
            rowKey={(record => record.interfaceId)}
            rowSelection={{...this.state.rowSelection, selectedRowKeys:this.state.selectedRowKeys}}
        />
      </div>
    )
  }
}
export default InterfaceTable