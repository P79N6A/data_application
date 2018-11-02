import React, { PureComponent } from 'react'
import Table from '@/components/Common/Table/1.0'

const datas = [
  {
    name: 'name',
    type: 'varchar',
    len: '16',
    desc: '用户名字',
  },
  {
    name: 'age',
    type: 'number',
    len: '16',
    desc: '用户年龄',
  },
  {
    name: 'phone',
    type: 'number',
    len: '16',
    desc: '用户的电话',
  },
  {
    name: 'edu',
    type: 'varchar',
    len: '16',
    desc: '用户的学历',
  },
]

const column = [
  {
    dataIndex: 'name',
    key: 'name',
    title: '字段名称',
  },
  {
    dataIndex: 'type',
    key: 'type',
    title: '字段类型',
  },
  {
    dataIndex: 'len',
    key: 'len',
    title: '字段长度',
  },
  {
    dataIndex: 'desc',
    key: 'desc',
    title: '字段描述',
  },
]

class Detail extends PureComponent {

  // 模拟获取数据获取数据
  _fetchdData = () => {
    return new Promise((resolve) => {
      resolve({
        res: {
          data: datas,
          page_param:{
            total: datas.length,
          },
        },
        isSuccess:true,
      })
    })
  }
  
  render() {
    return(
      <div>
        <Table
          antdTableProps={{rowSelection:false, pagination:false}}
          // eslint-disable-next-line no-underscore-dangle
          getFn={() => this._fetchdData()}
          columnsArr={column}
          hasSearch={false}
        />
      </div>
    )
  }
}
export default Detail
