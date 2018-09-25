import React, { Component } from 'react'
class ListTable extends Component {
	constructor(props) {
		super(props)
		this.state = {
			colums: [
				{ title: '任务名称', dataIndex: 'name', key: 'name'},
				{ title: '任务状态', dataIndex: 'state', key: 'state'},
				{ title: '任务执行次数', dataIndex: 'num', key: 'num'},
				{ title: '创建时间', dataIndex: 'time', key: 'time'},
				{ title: '采集任务描述', dataIndex: 'desc', key: 'desc'},
				{ title: '数据主管部门', dataIndex: 'manage', key: 'manage'},
				{ title: '采集数据类型', dataIndex: 'type', key: 'type'},
				{ title: '操作', dataIndex: 'operate', key: 'operate'}
			],
			data: [
				{key: 1, name:'测试', state: '测试', num: '测试', time: '测试', desc: '测试', manage: '测试', type: '测试', operate: '测试'}
			]
		}
	}
	render() {
		return(
			<h1>1111</h1>
		)
	}
}
export default ListTable
