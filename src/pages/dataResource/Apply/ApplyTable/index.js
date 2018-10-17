import React, { Component } from 'react'
import { Table, Button, Popconfirm} from 'antd'
import {dateFormat} from '@/utils/dateFormat';
import PropTypes from 'prop-types'
const APPLYTYPE = ['接口发布', '接口使用']
const STATUS = ['审批中', '已审批', '驳回']
class ApprovalTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // table列表参数
      columns: [
        {
          title: '申请类型',
          dataIndex: 'applyType',
          key: 'applyType',
          render: (text) => (
            <span>{APPLYTYPE[text]}</span>
          )
        },
        {
          title: '接口状态',
          dataIndex: 'status',
          key: 'status',
          render: (text) => (
            <span>{STATUS[text]}</span>
          )
        },
        {
          title: '申请人',
          dataIndex: 'applyByName',
          key: 'applyByName'
        },
        {
          title: '申请时间',
          dataIndex: 'applyDate',
          key: 'applyDate',
          render: (text) => (
            <span>{dateFormat(text)}</span>
          )
        },
        {
          title: '申请描述',
          dataIndex: 'applyDesc',
          key: 'applyDesc'
        }
      ],
      pagination: {
        total: 0,
        defaultCurrent: 1,
        pageSize: 10,
        showQuickJumper: true,
        onChange: (pageIndex, pageSize) => {
          let pageParam = {
            pageIndex,
            pageSize,
            orderFiled: 'approve_date',
            orderRule: 'desc'
          }
          this.props.search({pageParam})
        }
      },
      childColumns: [{
        title: '接口名',
        dataIndex: 'interfaceName',
        key: 'interfaceName'
      }, {
        title: '接口描述',
        dataIndex: 'interfaceDesc',
        key: 'interfaceDesc'
      }, {
        title: '请求类型',
        dataIndex: 'serviceMethodType',
        key: 'serviceMethodType'
      }]
    };
  }
  render() {
    let { apply } = this.props
    return (
      <div>
        <Table columns={this.state.columns}
            dataSource={apply.data}
            expandedRowRender={(record) => (
              <Table columns={this.state.childColumns} dataSource={record.interfaceInfos} pagination={false}></Table>
            )}
            pagination={{...this.state.pagination, ...apply.pageParam}}
        />
      </div>
    )
  }
}

ApprovalTable.propTypes = {
  apply: PropTypes.object.isRequired,
  search: PropTypes.func.isRequired
}

export default ApprovalTable
