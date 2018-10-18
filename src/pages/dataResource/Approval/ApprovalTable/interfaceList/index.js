import React from 'react'
import {Table} from 'antd'
const columns = [{
  title: '接口名',
  dataIndex: 'interfaceName',
  key: 'interfaceName',
  width: '400px'
}, {
  title: '接口描述',
  dataIndex: 'interfaceDesc',
  key: 'interfaceDesc',
  width: '400px'
}, {
  title: '请求类型',
  dataIndex: 'serviceMethodType',
  key: 'serviceMethodType'
}]
const InterfaceList = (props) => {
  const {interfaceInfos} = props
  return(
      <Table bordered className="interfaceInfos" columns={columns} dataSource={interfaceInfos} pagination={false} size="middle"  title={() => '接口列表'}/>
  )
}
export default InterfaceList