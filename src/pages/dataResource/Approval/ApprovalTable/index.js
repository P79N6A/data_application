import React, { Component } from 'react';
import { Table } from 'antd';
class ApprovalTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: '接口名',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '资源目录',
          dataIndex: 'catalog',
          key: 'catalog',
        },
        {
          title: '所属服务',
          dataIndex: 'services',
          key: 'services',
        },
        {
          title: '申请人',
          dataIndex: 'username',
          key: 'username',
        },
        {
          title: '申请时间',
          dataIndex: 'time',
          key: 'time',
        },
        {
          title: '操作',
          key: 'action',
          render: (text, record) => (
            <span>
              <a href="#">同意</a>
              <a href="#">拒绝</a>
            </span>
          )
        }
      ],
      dataSource: [],
    };
  }
  render() {
    return <Table columns={this.state.columns}
                  dataSource={this.props.approval}/>;
  }
}
export default ApprovalTable;
