import React, { Component } from 'react'
import ListTable from '../ListTable'
class ListContent extends Component{
  render() {
		return (
			<div>
				<div>
					<h1 style={{color: '#1890ff', display: 'inline-block'}}>采集任务列表</h1>
					<span style={{float: 'right'}}>显示时间</span>
				</div>
				<div>搜索框</div>
				<ListTable></ListTable>
			</div>
		)
	}
}
export default ListContent
