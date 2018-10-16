/* eslint-disable no-alert */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Row, Col, Card, Form, Input, Select, Icon,
  Button, Dropdown, Menu, DatePicker, Badge
} from 'antd';
import StandardTable from '@/components//DataResource/StandardTable';
import { Link } from 'dva/router';
import PropTypes from 'prop-types';
import styles from './TableList.less';
import {TableSearchForm, AdvanceTableSearchForm, ExpandableSearchForm} from '../../../components/DataResource/Table/TableSearchForm';

const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

// 状态码
const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['无效', '审批中', '已发布', '已驳回'];

// 根据状态码和权限显示操作
function GetOption(props) {
  switch (Number(props.status)) {
    case 0:
      return (<Button type="primary"><a onClick={() => (props.handleOption('use', props.id))}>启用</a></Button>);
    case 2:
    case 3:
      return (<Button type="primary"><a onClick={() => (props.handleOption('stop', props.id))}> 停用</a></Button>);
    case 1:
      return (
        <span>
          <Button type="primary"><a onClick={() => (props.handleOption('stop', props.id))}>停用</a></Button>
          &nbsp;&nbsp;
          <Button type="primary"><Link to={'/resource/approval'}>去审批</Link></Button></span>);
    /*case 3:
      return (<Button type="primary"><a onClick={() => (props.handleOption('edit', props.id))}>修改</a></Button>);*/
    default:
      return (<React.Fragment>未知状态</React.Fragment>);
  }
}

function map({ apiResource, loading }) {
  return { apiResource, loading };
}
/* eslint react/no-multi-comp:0 */
@connect(map)
@Form.create()
class TableList extends PureComponent {
  constructor() {
    super();
    this.handleOption = this.handleOption.bind(this);
    this.handleSelectRows = this.handleSelectRows.bind(this);
    this.handleRowFilter = this.handleRowFilter.bind(this);
    this.handleSearch_w = this.handleSearch_w.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.state={
      expandForm: false,
      selectedRows: [],
      formValues: {}
    }
  }


  // 初始化表格数据
  componentDidMount() {
    this.props.dispatch({
      type: 'apiResource/getApiList'
    });
  }

  columns = [
    {
      title: '接口名称',
      dataIndex: 'interfaceName',
      key: 'interfaceName'
    },
    {
      title: '描述',
      dataIndex: 'interfaceDesc',
      key: 'interfaceDesc'
    },
    {
      title: '服务名称',
      dataIndex: 'serviceName',
      key: 'serviceName'
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      filters: [
        {
          text: status[0],
          value: 0
        },
        {
          text: status[1],
          value: 1
        },
        {
          text: status[2],
          value: 2
        },
        {
          text: status[3],
          value: 3
        }
      ],
      onFilter: (value, record) => (this.handleRowFilter(value, record)),

      render(val) {
        return <Badge status={statusMap[val]}
            text={status[val]}
               />;
      }
    },
    {
      title: '操作',
      key: 'option',
      width: 250,
      render: (text, record) => (
        <GetOption {...record}
            handleOption={this.handleOption}
        />
      )
    }
  ];

  // 表格内筛选
  handleRowFilter(value, record) {
    return Number(record.status) === Number(value);
  }

  // 分页操作
  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'apiResource/fetch',
      payload: params
    });
  };

  // 表格字段搜索
  handleSearch_w(selectedKeys, confirm) {
    // confirm();
    this.setState({ searchText: selectedKeys[0] });
  }

  // 表格字段过滤
  handleFilter(value, record) {
    return record.apiName.toLowerCase().includes(value.toLowerCase());
  }

  // 重置搜索
  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {}
    });
    dispatch({
      type: 'apiResource/fetch',
      payload: {}
    });
  };

  // 收起展开搜索表单
  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm
    });
  };

  //处理表格操作
  handleOption(option, id) {
    this.props.dispatch({
      type: 'apiResource/update',
      payload: { option: option, id: id },
      callback: (res) => {
        console.log(res);
      }
    });
  }

  // 更多操作，批量操作
  handleMenuClick = e => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (!selectedRows) return;
    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'apiResource/remove',
          payload: {
            key: selectedRows.map(row => row.key)
          },
          callback: () => {
            this.setState({
              selectedRows: []
            });
          }
        });
        break;
      default:
        break;
    }
  };

  handleSelectRows(rows) {
    this.setState({
      selectedRows: rows
    });
  }

// 顶部搜索栏提交
  handleSearch(e) {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf()
      };

      this.setState({
        formValues: values
      });
      dispatch({
        type: 'apiResource/getApiList',
        payload: values
      });
    });
  }

  render() {
    const {
      apiResource: { data },
      loading,
      form: { getFieldDecorator }
    } = this.props;
    const { selectedRows } = this.state;
    const menu = (
      <Menu onClick={this.handleMenuClick}
          selectedKeys={[]}
      >
        <Menu.Item key="remove">删除</Menu.Item>
        <Menu.Item key="approval">批量停用</Menu.Item>
      </Menu>
    );

    return (
      <div>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {
                ExpandableSearchForm({
                  handleSearch:this.handleSearch,
                  toggleForm:this.toggleForm,
                  handleFormReset:this.handleFormReset,
                  getFieldDecorator:getFieldDecorator,
                  expandForm:this.state.expandForm
                })
              }
              </div>
            <div className={styles.tableListOperator}>
              <Button type="primary"><Link to="/resource/manage/publish">发布接口</Link>
              </Button><Button type="primary"><Link to="/resource/approval">查看接口使用申请</Link></Button>

              {selectedRows.length > 0 && (
                <span>
                  <Button>批量通过</Button>
                  <Dropdown overlay={menu}>
                    <Button>
                      更多操作 <Icon type="down"/>
                    </Button>
                  </Dropdown>
                </span>
              )}
            </div>
            <StandardTable
                columns={this.columns}
                data={data}
                loading={loading}
                onChange={this.handleStandardTableChange}
                onSelectRow={this.handleSelectRows}
                selectedRows={selectedRows}
                showSizeChanger={false}
            />
          </div>
        </Card>
      </div>
    );
  }
}

TableList.propTypes = {
  data: PropTypes.shape({
    data: PropTypes.array,
    pageParam: PropTypes.object
})
};
export default TableList;
