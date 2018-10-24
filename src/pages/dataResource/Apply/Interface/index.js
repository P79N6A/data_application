import React, { Component } from 'react'
import { connect } from 'dva';
// import Table from '@/components/Table'
import {mockData} from '@/services/apply'
// const column = [
//   {
//     title: '名字',
//     dataIndex: 'name',
//     key: 'name'
//   }, {
//     title:'年龄',
//     dataIndex: 'age',
//     key:'age'
//   }
// ]
class Interface extends Component{
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    mockData({
      catalogId: this.props.global.catalog[0].id,
      interfaceName: null,
      pageParam: {
          orderFiled: 'last_update',
          orderRule: 'desc',
          pageIndex: 1,
          pageSize: 10
      },
      serviceMethodType: null,
      serviceName: null,
      status: '0'
    }).then(res => {
      console.log(res)
    })
  }
  render() {
    return(
      <div >
        测试table
        {/* <Table 
            columnsArr={column}
        /> */}
      </div>
    )
  }
}
export default connect(({apply, global}) => ({
  apply,
  global
}))(Interface)
