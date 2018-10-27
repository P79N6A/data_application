import React, { PureComponent } from 'react';
import Table from '@/components/Common/Table/1.0'

const datas = [
  {
    name: '历史查询',
    desc: '查询改业务的一些历史信息'
  }, {
    name: '数据删除',
    desc: '业务数据的删除'
  }, {
    name: '详情查看',
    desc: '查看详细信息'
  }, {
    name: '新增数据',
    desc: '新增数据业务'
  }, {
    name: '修改数据',
    desc: '对以前的数据进行相关修改'
  }
]
const column = [
  {
    title: '接口名',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '接口详情',
    dataIndex: 'desc',
    key: 'desc'
  }
]
class Interface extends PureComponent{
  // 获取数据
  _fetchdData = () => {
    return new Promise((resolve) => {
      resolve({
        res: {
          data: datas,
          page_param:{
            total: 5
          }
        },
        isSuccess:true
      })
    })
  }
  render() {
    return(
      <div>
        <Table
            antdTableProps={{rowSelection:false}}
            getFn={() => this._fetchdData()}
            columnsArr={column}
            hasSearch={false}
        />
      </div>
    )
  }
}
export default Interface