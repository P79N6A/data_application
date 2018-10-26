import React, { Component } from 'react';
import ApprovalSearch from './ApplySearch';
import Table from '@/components/Common/Table/1.0'
import ApprovalDetailModal from '@/components/DataResource/Modal/ApprovalDetailModal'
import dateFormat from '@/utils/dateFormat';
import {applyList} from '@/services/apply'
import { connect } from 'dva';
import './index.less';
const APPLYTYPE = ['接口发布', '接口使用']
const STATUS = ['待审批', '已审批', '驳回']
class Apply extends Component {
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
      modal:{
        modalTitle:'详情',
        modalVisible:false,
        modalContent:{}
      }
    }
  }
  openInfo(record) {
    this.setState({
      modal:{
        modalVisible: true,
        modalTitle: record.interfaceName,
        modalContent: {...record}
      }
    })
  }
  handleCancel = () => {
    this.setState({
      modal:{
        modalVisible:false
      }
    });
  }
  render() {
    let {modal={}}=this.state;
    return (
      <div>
        <ApprovalDetailModal
            {...modal}
            handleModalCancel={this.handleCancel}
            handleModalOk={this.handleModalOk}
        ></ApprovalDetailModal>
        <Table 
            antdTableProps={{
              rowSelection: null
            }}
            columnsArr={this.state.columns}
            getFn={applyList}
            hasSearch={false}
            HeaderExtend={ApprovalSearch}
            searchExtendParam={{applyType: '1', status: '0'}}
        />
      </div>
    );
  }
}

export default connect(({apply}) => ({
  apply
}))(Apply);
