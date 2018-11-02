import React, { PureComponent } from 'react'
import Table from '@/components/Common/Table/1.0'
import Modal from '@/components/Common/Modal'
import Search from './Search'
import Detail from './Detail'


const datas = [
  {
    name: 'dzdz_hwxx_ptfp',
    type: '原始数据',
    gov: '重庆市',
    desc: '信息基础表',
  }, 
  {
    name: 'dzdz_fpxx_sk',
    type: '原始数据',
    gov: '重庆市',
    desc: '业务数据数据详情表',
  }, 
  {
    name: 'dzdz_hwxx_zzsfp',
    type: '原始数据',
    gov: '重庆市',
    desc: '数据采集表',
  }, 
  {
    name: 'dzdz_hpszs_zsfz',
    type: '原始数据',
    gov: '重庆市',
    desc: '地理信息采集表',
  }, 
  {
    name: 'dzdz_hvss_asd',
    type: '原始数据',
    gov: '重庆市',
    desc: '资源管理一览表',
  },
]
const column = [
  {
    title: '数据表名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '表类型',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '主管部门',
    dataIndex: 'gov',
    key: 'gov',
  },
  {
    title: '数据表说明',
    dataIndex: 'desc',
    key: 'desc',
  },
]

class DataManage extends PureComponent{
  constructor(props) {
    super(props)
    this.state = {
      modal: {
        modalVisible: false,
        modalTitle: '详情',
      },
      actions: {
        title: '操作',
        key: 'action',
        render: (text, record) => {
          return (
            <span>
              <a onClick={this.detail.bind(this, record)}>详情</a>&nbsp;&nbsp;
            </span>
          )
        },
      },
    }
  }

  // 展开详情
  detail = (record) => {
    const {name} = record
    this.setState({
      modal: {
        modalVisible: true,
        modalTitle: name,
        children: <Detail record={record} />,
        width: '800px',
      },
    })
  }

  // 关闭弹框
  handleModalCancel = () => {
    this.setState({
      modal: {
        modalVisible: false,
      },
    })
  }

  // 模拟获取数据获取数据
  _fetchdData = () => {
    return new Promise((resolve) => {
      resolve({
        res: {
          data: datas,
          page_param:{
            total: 5,
          },
        },
        isSuccess:true,
      })
    })
  }

  render() {
    const { modal, actions } = this.state
    return (
      <div style={{paddingLeft: '20px'}}>
        <Table
          antdTableProps={{rowSelection:false}}
          HeaderExtend={Search}
          // eslint-disable-next-line no-underscore-dangle
          getFn={() => this._fetchdData()}
          columnsArr={[...column, actions]}
          hasSearch={false}
        />
        <Modal {...modal} handleModalCancel={this.handleModalCancel} />
      </div>
    )
  }
}
export default DataManage
