import React, { Component } from 'react'
import { Table, Modal } from 'antd'
import dateFormat from '@/utils/dateFormat';
import PropTypes from 'prop-types'
import InterfaceList from '../../Approval/ApprovalTable/interfaceList'
import InterfaceHistory from '../../Approval/ApprovalTable/InterfaceHistory'
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
        },{
          title: '操作',
          key: 'action',
          render: (text, record) => {
            return(
              <div>
                <a onClick={this.openInfo.bind(this, record)}>详情</a>
              </div>
            )
          }
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
      interfaceInfos: [],
      approveHistorys: []
    };
  }
  openInfo(record) {
    this.setState({
      visible: true,
      interfaceInfos: record.interfaceInfos,
      approveHistorys:record.approveHistorys
    })
  }
  handleCancel = () => {
    this.setState({
      visible: false
    });
  }
  render() {
    let { apply } = this.props
    return (
      <div>
        <Table columns={this.state.columns}
            dataSource={apply.data}
            pagination={{...this.state.pagination, ...apply.pageParam}}
        />
        <Modal footer={null} onCancel={this.handleCancel} visible={this.state.visible} width="800px">
          <InterfaceList interfaceInfos={this.state.interfaceInfos}></InterfaceList>
          <InterfaceHistory approveHistorys={this.state.approveHistorys}></InterfaceHistory>
        </Modal>
      </div>
    )
  }
}

ApprovalTable.propTypes = {
  apply: PropTypes.object.isRequired,
  search: PropTypes.func.isRequired
}

export default ApprovalTable
