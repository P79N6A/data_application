import React from 'react'
import { Table } from 'antd'
import dateFormat from '@/utils/dateFormat';
const columns = [{
  title: '时间',
  dataIndex: 'approveDate',
  key: 'approveDate',
  width: '400px',
  render: (text) => (
    <span>{dateFormat(text)}</span>
  )
},{
  title: '操作描述',
  dataIndex: 'approveDesc',
  key: 'approveDesc',
  width: '400px'
},{
  title: '操作人',
  dataIndex: 'approveByName',
  key: 'approveByName'
}]
const InterfaceHistory = (props) => {
  const { approveHistorys } = props
  return (
      <Table columns={columns}
          dataSource={approveHistorys}
          pagination={false}
          title={() => '审批记录'}
          bordered
          size="middle" 
      />
  )
}
export default InterfaceHistory