import React, { PureComponent } from 'react'
import Table from '@/components/Common/Table/1.0'
import {Popconfirm} from 'antd'
import Search from './Search'
const datas = [
  {
    name: 'dzdz_hwxx_ptfp',
    type: '原始数据',
    gov: '重庆市',
    desc: '信息基础表'
  }, 
  {
    name: 'dzdz_fpxx_sk',
    type: '原始数据',
    gov: '重庆市',
    desc: '业务数据数据详情表'
  }, 
  {
    name: 'dzdz_hwxx_zzsfp',
    type: '原始数据',
    gov: '重庆市',
    desc: '数据采集表'
  }, 
  {
    name: 'dzdz_hpszs_zsfz',
    type: '原始数据',
    gov: '重庆市',
    desc: '地理信息采集表'
  }, 
  {
    name: 'dzdz_hvss_asd',
    type: '原始数据',
    gov: '重庆市',
    desc: '资源管理一览表'
  }
]
const column = [
  {
    title: '数据表明',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '表类型',
    dataIndex: 'type',
    key: 'type'
  },
  {
    title: '主管部门',
    dataIndex: 'gov',
    key: 'gov'
  },
  {
    title: '数据表说明',
    dataIndex: 'desc',
    key: 'desc'
  },
  {
    title: '操作',
    key: 'action',
    render: () => {
      return (
        <span>
          <a>详情</a>&nbsp;&nbsp;
          <Popconfirm onConfirm={() =>{console.log('删除')}}
              title="确定是否删除"
                    >
              <a>删除</a>
            </Popconfirm>
        </span>
      )
    }
  }
]

class DataManage extends PureComponent{
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
    return (
      <div style={{paddingLeft: '20px'}}>
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
export default DataManage
