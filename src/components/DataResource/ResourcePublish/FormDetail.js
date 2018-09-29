/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Table } from 'antd';

class FormDetail extends Component {
  render() {
    const values = this.props.formValue;
    const columnsParam = [
      { title: '参数名', dataIndex: 'paramName', key: 'paramName' },
      { title: '参数类型', dataIndex: 'paramType', key: 'paramType' },
      { title: '能否为空', dataIndex: 'paramIsNull', key: 'paramIsNull' },
      { title: '参数备注', dataIndex: 'paramNotice', key: 'paramNotice' },
    ];
    const columnsApi = [
      { title: '接口名称', dataIndex: 'apiName', key: 'apiName' },
      { title: '接口目录', dataIndex: 'apiMenu', key: 'apiMenu' },
      { title: '接口描述', dataIndex: 'apiDesc', key: 'apiDesc' },
      { title: '服务名', dataIndex: 'serviceName', key: 'serviceName' },
      { title: '接口路径', dataIndex: 'apiPath', key: 'apiPath' },
      { title: '请求类型', dataIndex: 'requestType', key: 'requestType' },
    ];
    return (
      <div>
        <Table columns={columnsApi}
               dataSource={[values]}
               pagination={false}
        />
        <br/>
        <h2>参数列表</h2>
        <br/>
        <Table columns={columnsParam}
               dataSource={values.params}
               pagination={false}
        />
      </div>
    );
  }
}

export default FormDetail;
