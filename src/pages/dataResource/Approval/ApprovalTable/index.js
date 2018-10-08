import React, { Component } from 'react';
import { Table, Modal, Tooltip, Button} from 'antd';
class ApprovalTable extends Component {
  constructor(props) {
    super(props)
    this.cancelInterface = this.cancelInterface.bind(this)
    this.state = {
      // 弹出框参数
      interFace: false,
      approval: false,
      // table列表参数
      columns: [
        {
          title: '接口名',
          dataIndex: 'name',
          key: 'name',
          render: (text, record) => (
            <Tooltip title="双击显示详情">
              <a href="#" onDoubleClick={this.infoInterface.bind(this, record)}>{text}</a>
            </Tooltip >
          )
        },
        {
          title: '资源目录',
          dataIndex: 'catalog',
          key: 'catalog'
        },
        {
          title: '所属服务',
          dataIndex: 'services',
          key: 'services'
        },
        {
          title: '申请人',
          dataIndex: 'username',
          key: 'username',
          render: (text, record) => (
            <Tooltip title="双击显示详情">
              <a href="#" onDoubleClick={this.infoApproval.bind(this, record)}>{text}</a>
            </Tooltip>
          )
        },
        {
          title: '申请时间',
          dataIndex: 'time',
          key: 'time'
        },
        {
          title: '操作',
          key: 'action',
          render: (text, record) => (
              <div>
                <Button onClick={this.agree.bind(this, record)} type="primary">同意</Button>
                <Button onClick={this.reject.bind(this, record)} type="danger">拒绝</Button>
              </div>
          )
        }
      ],
      pagination: {
        total: 50,
        defaultCurrent: 1,
        pageSize: 10,
        onChange: (page) => {
          console.log(page)
        }
      }
    };
  }
  infoInterface(info) {
    console.log(info)
    this.setState({
      interFace: true
    })
  }
  // 同意
  agree(info) {
    console.log('同意',info)
  }
  reject(info) {
    console.log('拒绝', info)
  }
  // 申请人详情
  infoApproval(info) {
    console.log(info)
    this.setState({
      approval: true
    })
  }
  // 关闭弹出框
  cancelInterface() {
    this.setState({
      interFace: false,
      approval: false
    })
  }
  render() {
    return (
      <div>
        <Table columns={this.state.columns}
            dataSource={this.props.approval}
            pagination={this.state.pagination}
        />
        <Modal footer={null}
            onCancel={this.cancelInterface}
            visible={this.state.interFace}
        >
          <h1>接口详情</h1>
        </Modal>
        <Modal footer={null}
            onCancel={this.cancelInterface}
            visible={this.state.approval}
        >
          <h1>申请人详情</h1>
        </Modal>
      </div>
    )
  }
}
export default ApprovalTable;
