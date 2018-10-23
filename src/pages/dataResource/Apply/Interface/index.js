import React, { Component } from 'react'
import { connect } from 'dva';
import InterfaceTable from './InterfaceTable'
import InterfaceSearch from './InterfaceSearch'
class Interface extends Component{
  constructor(props) {
    super(props)
    this.state = {
      search: {
        catalogId: this.props.global.catalog[0].id,
        interfaceName: null,
        pageParam: {
            orderFiled: 'last_update',
            orderRule: 'desc',
            pageIndex: 1,
            pageSize: 3
        },
        serviceMethodType: null,
        serviceName: null,
        status: '0'
      }
    }
  }
  componentDidMount() {
    this.fetchInterface(this.state.search)
  }
  fetchInterface =(pageParam)=> {
    let payload = {...this.state.search, ...pageParam}
    this.props.dispatch({
      type: 'apply/fetchInterface',
      payload: payload
    })
  }
  render() {
    console.log(this.props.global)
    return(
      <div >
        <InterfaceSearch catalog={this.props.global.catalog} fetchInterface={this.fetchInterface}></InterfaceSearch>
        <InterfaceTable fetchInterface={this.fetchInterface} interfaces={this.props.apply.interfaces}></InterfaceTable>
      </div>
    )
  }
}
export default connect(({apply, global}) => ({
  apply,
  global
}))(Interface)
