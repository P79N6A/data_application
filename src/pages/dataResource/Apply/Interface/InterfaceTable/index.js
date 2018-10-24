import React, { Component } from 'react';
import { Table, Badge } from 'antd';

const STATUS = ['未使用', '已使用'];

class InterfaceTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
        title: '接口名称',
        dataIndex: 'interfaceName',
        key: 'interfaceName',
      }, {
        title: '描述',
        dataIndex: 'interfaceDesc',
        key: 'interfaceDesc',
      }, {
        title: '服务名称',
        dataIndex: 'serviceName',
        key: 'serviceName',
      }, {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: (text) => {
          return (<span>
            <Badge status={text === '0' ? 'success' : 'default'} text={STATUS[text]}/>
          </span>);
        },
      }, {
        title: '操作',
        key: 'action',
        render: (text, record) => {
          return record.status === '0' ?
            (
              <span><a>详情</a></span>
            ) : (
              <span><a>点赞</a></span>
            );
        },
      }],
      rowSelection: {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({
          disabled: record.status === '1',   // 已使用就不能够再次勾选
        }),
      },
      pagination: {
        total: 0,
        defaultCurrent: 1,
        pageSize: 3,
        showQuickJumper: true,
      },
    };
  }

  handleTableChange = (pagination, filters) => {
    let pageParam = {
      pageParam: {
        pageIndex: pagination.current,
        pageSize: pagination.pageSize,
        orderFiled: 'last_update',
        orderRule: 'desc',
      },
    };
    if (filters.status) {
      this.props.fetchInterface(pageParam, filters.status[0]);
    } else {
      this.props.fetchInterface(pageParam);
    }
  };

  render() {
    const { interfaces } = this.props;
    return (
      // <div style={{display: status===1 ? 'none' : 'block'}}>
      <div>
        <Table columns={this.state.columns}
               dataSource={interfaces.data}
               onChange={this.handleTableChange}
               pagination={{ ...this.state.pagination, ...interfaces.pageParam }}
               rowSelection={this.state.rowSelection}
        />
      </div>
    );
  }
}

export default InterfaceTable;
