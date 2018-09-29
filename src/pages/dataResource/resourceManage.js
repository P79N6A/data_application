/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react';
import { connect } from 'dva';
import { Icon, Popconfirm, Button } from 'antd';
import classNames from 'classnames';
import ManageTable from '../../components/DataResource/ManageTable';
import styles from './resourceManage.less';
import BSTableModal from '../../components/Common/Modal/BSTableModal';
import BSFormModal from '../../components/Common/Modal/BSFormModal';

function getColumn(data, action) {
  const columns = [
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
      dataIndex: 'org',
      key: 'org',
    },
    {
      title: '数据表说明',
      dataIndex: 'comment',
      key: 'comment',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <Icon
            onClick={action.info}
            style={{ cursor: 'pointer', fontSize: '18px' }}
            theme="outlined"
            type="info-circle"
          />
          &nbsp;&nbsp;
          <Popconfirm
            cancelText="取消"
            okText="确定"
            // onCancel={}
            onConfirm={() => {
              action.delete(record);
            }}
            title="确定删除此数据表?"
          >
            <Icon style={{ cursor: 'pointer', fontSize: '18px' }}
                  theme="outlined"
                  type="delete"
            />
          </Popconfirm>
        </span>
      )
    }
  ];
  return columns;
}

class ResourceManage extends Component {
  constructor(props) {
    super(props);
    this.doUpdate = this.doUpdate.bind(this);
    this.handleDeleteCol = this.handleDeleteCol.bind(this);
    this.handleOK = this.handleOK.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleShowModal = this.handleShowModal.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.state = {
      tableList: [],
      columns: [],
      infoVisible: false,
      addFormVisible: false,
    };
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'resource/getTableList',
      payload: {},
      callback: () => {
        this.doUpdate('tableList');
      }
    });
  }

  handleDeleteCol(record) {
    this.props.dispatch({
      type: 'resource/deleteCol',
      payload: { id: record.id, data: this.props.resourceTableList },
      callback: newData => {
        this.doUpdate('tableList', newData);
      }
    });
  }

  handleShowModal(modal) {
    this.setState({ [modal]: true });
  }

  handleOK(modal) {
    this.setState({ [modal]: false });
    console.error(this.state.visible);
  }

  handleCancel(modal) {
    this.setState({ [modal]: false });
  }

  handleFormSubmit = (values, state) => {
    console.log(values, state);
  };

  // 表单挂载时获取对话框的表单，用于操作表单提交
  getChildForm(ref) {
    this.childForm = ref;
  }

  doUpdate(state, data) {
    if (state === 'tableList') {
      const maia = data || this.props.resourceTableList;
      const col = getColumn(maia, {
        delete: this.handleDeleteCol,
        info: () => this.handleShowModal('infoVisible'),
      });
      maia.map((v, i) => {
        v.key = i;
      });
      this.setState({ tableList: maia, columns: col });
    }
  }

  render() {
    const InfoModal = BSTableModal({
      title: '数据表详情',
      visible: this.state.infoVisible,
      width: 1000,
      onOk: () => this.handleOK('infoVisible'),
      onCancel: () => this.handleCancel('infoVisible'),
    });

    const AddFormModal = BSFormModal({
      title: '数据表添加申请',
      visible: this.state.addFormVisible,
      onOk: () => this.handleOK('addFormVisible'),
      onCancel: () => this.handleCancel('addFormVisible'),
      state: this.state,
      getForm: this.getChildForm,
      childFormSubmit: this.handleFormSubmit,
    });

    return (
      <div className={styles['manage-table']}>
        <div className="table-header">
          <span>当前查看: 资源目录列表</span>
        </div>
        <div className={classNames('apply', styles['clear-fix'])}>
          <Button onClick={() => this.handleShowModal('addFormVisible')}
                  type="primary"
          >
            <Icon theme="outlined"
                  type="folder-add"
            />
            新数据资源库添加申请
          </Button>
        </div>
        <ManageTable {...this.props}
                     {...this.state}
        />
        <InfoModal/>
        <AddFormModal/>
      </div>
    );
  }
}

export default connect(data => data.resource)(ResourceManage);
