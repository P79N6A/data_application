import React, { Component } from 'react';
import { Table, Button, Popconfirm} from 'antd';
class ApprovalTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // table列表参数
      columns: [
        {
          title: '接口名',
          dataIndex: 'name',
          key: 'name'
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
          key: 'username'
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
                <Popconfirm onConfirm={this.agree.bind(this, record)}
                    title="确定是否同意"
                >
                  <Button
                      style={{marginRight: '5px'}}
                      type="primary"
                  ><a>同意</a></Button>
                </Popconfirm>
                <Popconfirm onConfirm={this.reject.bind(this, record)}
                    title="确定是否拒绝"
                >
                  <Button
                      type="primary"
                  ><a>拒绝</a></Button>
                </Popconfirm>
              </div>
          )
        }
      ],
      pagination: {
        total: 50,
        defaultCurrent: 1,
        pageSize: 10,
        showQuickJumper: true,
        onChange: (page) => {
          console.log(page)
        }
      }
    };
  }
  // 同意
  agree(info) {
    console.log('同意',info)
  }
  reject(info) {
    console.log('拒绝', info)
  }
  render() {
    return (
      <div>
        <Table columns={this.state.columns}
            dataSource={this.props.approval}
            expandedRowRender={() => (
              <p>展开详情</p>
            )}
            pagination={this.state.pagination}
        />
      </div>
    )
  }
}
export default ApprovalTable;
