import React, {Component} from 'react';
import ManageTable from '../../components/DataResource/ManageTable'
import styles from './resourceManage.less';
import {connect} from 'dva';
import {Divider} from 'antd'


function getColumn(data) {
  const columns = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  }, {
    title: 'Age',
    dataIndex: 'type',
    key: 'type'
  }, {
    title: 'Address',
    dataIndex: 'org',
    key: 'org'
  }, {
    title: 'detail',
    dataIndex: 'comment',
    key: 'comment'
  }, {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
      <a href="javascript:;">Invite {record.name}</a>
      <Divider type="vertical"/>
      <a href="javascript:;">Delete</a>
    </span>
    )
  }];
  console.log(columns)
  return columns;
}

class ResourceManage extends Component {
  constructor(props) {
    super(props);
    this.doUpdate = this.doUpdate.bind(this);
    this.state = {
      tableList: null,
      columns: null
    }
  }


  componentDidMount() {
    this.props.dispatch({
      type: 'resource/getTableList',
      payload: {},
      callback: (res) => {
        this.doUpdate('tableList', res.data.datalist)
      }
    })
  }

  doUpdate(state, data) {
    if (state === 'tableList') {
      let col = getColumn(data);
      this.setState({tableList: data, columns: col});
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
