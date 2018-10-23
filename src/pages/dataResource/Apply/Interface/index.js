import React, { Component } from 'react'
import { connect } from 'dva';
class Interface extends Component{
  constructor(props) {
    super(props)
    this.state = {
      search: {
        catalogId: '1',
        interfaceName: '',
        pageParam: {
            orderFiled: '',
            orderRule: '',
            pageIndex: 1,
            pageSize: 3,
            start: 0,
            total: 0
        },
        serviceMethodType: '',
        serviceName: '',
        status: null
      }
    }
  }
  componentDidMount() {
    this.fetchInterface(this.state.search)
  }
  fetchInterface =(pageParam)=> {
    let payload = {...this.state.search, ... pageParam}
    this.props.dispatch({
      type: 'apply/fetchInterface',
      payload: payload
    })
  }
  render() {
    return(
      <div>
        表单申请
      </div>
    )
  }
}
export default connect(({apply}) => ({
  apply
}))(Interface)
