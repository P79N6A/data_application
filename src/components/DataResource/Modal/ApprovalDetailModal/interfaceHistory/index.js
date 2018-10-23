import React from 'react'
import { Table } from 'antd'
import dateFormat from '@/utils/dateFormat';
import {addColumnKey} from '@/utils/utils';

const columns = [
  {
    title:'序号',
    dataIndex:'serial',
    key:'serial'
  },
  {
  title: '时间',
  dataIndex: 'approveDate',
  key: 'approveDate',
  render: (text) => (
    <span>{dateFormat(text)}</span>
  )
},{
  title: '操作描述',
  dataIndex: 'approveDesc',
  key: 'approveDesc'
},{
  title: '操作人',
  dataIndex: 'approveByName',
  key: 'approveByName'
}]
const InterfaceHistory = (props) => {
  let { approveHistorys=[] } = props
  approveHistorys=addColumnKey(approveHistorys);
  return (
      <Table bordered
          columns={columns}
          dataSource={approveHistorys}
          pagination={false}
          size="small"
      />
  )
}
export default InterfaceHistory
