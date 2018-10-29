import React, { Component } from 'react';
import ApprovalSearch from './ApprovalSearch';
import Table from '@/components/Common/Table/1.0'
import dateFormat from '@/utils/dateFormat';
import {approvalList} from '@/services/approval'
import ApprovalDetailModal from '@/components/DataResource/Modal/ApprovalDetailModal'
import { connect } from 'dva';
import { message, Popconfirm } from 'antd'
import './index.less';
import { OK_CODE } from '@/config/code'

const APPLYTYPE = ['接口发布', '接口使用']
const STATUS = ['待审批', '已审批', '驳回']
class Approval extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: '申请类型',
          dataIndex: 'applyType',
          key: 'applyType',
          render: (text) => (
            <span>{APPLYTYPE[text]}</span>
          ),
        },
        {
          title: '接口状态',
          dataIndex: 'status',
          key: 'status',
          render: (text) => (
            <span>{STATUS[text]}</span>
          ),
        },
        {
          title: '申请人',
          dataIndex: 'applyByName',
          key: 'applyByName',
        },
        {
          title: '申请时间',
          dataIndex: 'applyDate',
          key: 'applyDate',
          render: (text) => (
            <span>{dateFormat(text)}</span>
          ),
        },{
          title: '申请描述',
          dataIndex: 'applyDesc',
          key: 'applyDesc',
        },
      ],
      modal:{
        modalTitle:'详情',
        modalVisible:false,
        modalContent:{},
      },
      moreFnArr: [
        {
          key: 'action',
          render: (text, record, index, props) => {
            switch(record.status) {
              case '0' :
                return (
                  <span>
                    <Popconfirm
                      onConfirm={this.dispose.bind(this, record, '同意', props)}
                      title="确定是否同意"
                    >
                      <a>同意</a>&nbsp;&nbsp;
                    </Popconfirm>
                    <Popconfirm
                      onConfirm={this.dispose.bind(this, record, '拒绝', props)}
                      title="确定是否拒绝"
                    >
                      <a>拒绝</a>&nbsp;&nbsp;
                    </Popconfirm>
                    <a onClick={this.openInfo.bind(this, record)}>详情</a>
                  </span>
                )
              case '1':
                return (
                  <span>
                    <a onClick={this.openInfo.bind(this, record)}>详情</a>
                  </span>
                )
              case '2':
                return (
                  <span>
                    <a onClick={this.openInfo.bind(this, record)}>详情</a>
                  </span>
                )
            }
          },
        },
      ],
    }
  }

  openInfo(record) {
    const {modalVisible}=this.state.modal;
    this.setState({
      modal:{
        modalVisible: !modalVisible,
        modalTitle: record.interfaceName,
        modalContent: {...record},
      },
    })
  }

  handleCancel = () => {
    this.setState({
      modal:{
        modalVisible:false,
      },
    });
  };

  // 同意或者拒绝
  dispose(info, res, parent) {
    const {applyId} = info
    const opts = {
      applyId,
      approveType: res === '同意' ? '0' : '1',
      approveDesc: res,
    }
    console.log(parent)
    this.props.dispatch({
      type: 'approval/operation',
      payload: opts,
      callback: (res) => {
        console.log(res)
        if(res.code !== OK_CODE) {
          message.warning(res.message)
          return
        }
        // 重新获取数据
        parent.getFn()
      },
    })

  }

  render() {
    const {modal={}}=this.state;
    return (
      <div style={{padding: '24px 32px'}}>
        <ApprovalDetailModal
          {...modal}
          handleModalCancel={this.handleCancel}
          handleModalOk={this.handleModalOk}
        />
        <Table
          antdTableProps={{
              rowSelection: null,
            }}
          fnWidth="150px"
          moreFnArr={this.state.moreFnArr}
          columnsArr={this.state.columns}
          getFn={approvalList}
          hasSearch={false}
          HeaderExtend={ApprovalSearch}
          searchExtendParam={{applyType: '1', status: '0'}}
        />
      </div>
    );
  }
}

export default connect(({ approval }) => ({
  approval,
}))(Approval);
