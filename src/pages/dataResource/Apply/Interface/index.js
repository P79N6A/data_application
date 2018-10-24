import React, { Component } from 'react'
import { connect } from 'dva';
import Table from '@/components/Table'
import {mockData} from '@/services/apply'
const column = [
  {
    title: '名字',
    dataIndex: 'name',
    key: 'name'
  }, {
    title:'年龄',
    dataIndex: 'age',
    key:'age'
  }
]
class Interface extends Component{
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    console.log(mockData)
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
