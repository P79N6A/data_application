import React from 'react'
import {Table} from 'antd'
import {addColumnKey} from '../../../../../utils/utils';

const columns = [
  {
    title:'序号',
    dataIndex:'serial',
    key:'serial'
  },
  {
  title: '接口名',
  dataIndex: 'interfaceName',
  key: 'interfaceName',
}, {
  title: '接口描述',
  dataIndex: 'interfaceDesc',
  key: 'interfaceDesc',
}, {
  title: '请求类型',
  dataIndex: 'serviceMethodType',
  key: 'serviceMethodType'
}]
const InterfaceList = (props) => {
  let {interfaceInfos=[]} = props;
  interfaceInfos=addColumnKey(interfaceInfos);
  return(
      <Table bordered
          className="interfaceInfos"
          columns={columns}
          dataSource={interfaceInfos}
          pagination={false}
          size="small"
      />
  )
}
export default InterfaceList
