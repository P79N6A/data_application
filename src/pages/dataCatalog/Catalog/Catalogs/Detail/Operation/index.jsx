import React, { PureComponent } from 'react';
import Search from './Search'
import Table from '@/components/Common/Table/1.0'
const datas = [
  {
    name:'stg',
    table: 'dzdz_hwxx_ptfp',
    action: 'select',
    user: 'admin',
    desc: 'admin select dzdz_hwxx_ptfp...',
    time: '2018-8-5'
  },
  {
    name:'stg',
    table: 'dzdz_ptfp_back',
    action: 'select',
    user: 'admin',
    desc: 'admin select dzdz_ptfp_back...',
    time: '2018-8-3'
  },
  {
    name:'stg',
    table: 'dzdz_hwxx_ptfp',
    action: 'select',
    user: 'admin',
    desc: 'admin select dzdz_hwxx_ptfp...',
    time: '2018-8-4'
  },  {
    name:'stg',
    table: 'dzdz_hwxx_ptfp',
    action: 'select',
    user: 'admin',
    desc: 'admin select dzdz_hwxx_ptfp...',
    time: '2018-9-5'
  },
  {
    name:'stg',
    table: 'dzdz_hwxx_ptfp',
    action: 'select',
    user: 'admin',
    desc: 'admin select dzdz_hwxx_ptfp...',
    time: '2018-9-12'
  }
]
const column = [
  {
    title: '资源库名称',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '资源库表名称',
    dataIndex: 'table',
    key: 'table'
  },
  {
    title: '操作动作',
    dataIndex: 'action',
    key: 'action'
  },
  {
    title: '操作人员',
    dataIndex: 'user',
    key: 'user'
  },
  {
    title: '操作详情',
    dataIndex: 'desc',
    key: 'desc'
  },  
  {
    title: '操作日期',
    dataIndex: 'time',
    key: 'time'
  }
]
class Operation extends PureComponent{
  // 获取数据
  _fetchdData = () => {
    return new Promise((resolve) => {
      resolve({
        res: {
          data: datas,
          page_param:{
            total: 6
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
            HeaderExtend={Search}
            getFn={() => this._fetchdData()}
            columnsArr={column}
            hasSearch={false}
        />
      </div>
    )
  }
}
export default Operation