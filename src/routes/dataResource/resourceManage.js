import React, {Component} from 'react';
import ManageTable from '../../components/DataResource/ManageTable'
import styles from './resourceManage.less';
import {connect} from 'dva';
import {Icon, Popconfirm} from 'antd'


function getColumn(data, action) {
  const columns = [{
    title: '数据表名',
    dataIndex: 'name',
    key: 'name'
  }, {
    title: '表类型',
    dataIndex: 'type',
    key: 'type'
  }, {
    title: '主管部门',
    dataIndex: 'org',
    key: 'org'
  }, {
    title: '数据表说明',
    dataIndex: 'comment',
    key: 'comment'
  }, {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>

        <Icon
          onClick={action.info}
          style={{cursor: 'pointer', fontSize: '18px'}}
          theme="outlined"
          type="info-circle"
        />
        &nbsp;&nbsp;
        <Popconfirm
          cancelText="取消"
          okText="确定"
          // onCancel={}
          onConfirm={() => {
            action.delete(record)
          }}
          title="确定删除此数据表?"
        >
    <Icon
      style={{cursor: 'pointer', fontSize: '18px'}}
      theme="outlined"
      type="delete"
    />
  </Popconfirm>

    </span>
    )
  }];
  return columns;
}

class ResourceManage extends Component {
  constructor(props) {
    super(props);
    this.doUpdate = this.doUpdate.bind(this);
    this.handleDeleteCol = this.handleDeleteCol.bind(this);
    this.handleShowTableInfo = this.handleShowTableInfo.bind(this);
    this.state = {
      tableList: [],
      columns: []
    }
  }


  componentDidMount() {
    this.props.dispatch({
      type: 'resource/getTableList',
      payload: {},
      callback: (res) => {
        this.doUpdate('tableList')
      }
    })
  }

  handleDeleteCol(record) {
    this.props.dispatch({
      type: 'resource/deleteCol',
      payload: {id: record.id, data: this.props.resourceTableList},
      callback: (newData) => {
        this.doUpdate('tableList', newData);
      }
    })
  }

  handleShowTableInfo() {
    alert('info')
  }

  doUpdate(state, data) {
    if (state === 'tableList') {
      let maia = data ? data : this.props.resourceTableList;
      let col = getColumn(maia, {delete: this.handleDeleteCol, info: this.handleShowTableInfo});
      maia.map((v, i) => {
        v.key = i;
      });
      this.setState({tableList: maia, columns: col});
    }
  }

  render() {
    return (
      <div className={styles['manage-table']}>
        <div className={'table-header'}>
          <span>当前查看: 资源目录列表</span>
        </div>
        <ManageTable
          {...this.props}
          {...this.state}
        />
      </div>
    );
  }
}

export default connect((data) => (data.resource))(ResourceManage);
