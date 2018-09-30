/* eslint-disable no-alert */
import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  DatePicker,
  Badge,
  Radio,
  TreeSelect,
} from 'antd';
import StandardTable from '@/components//DataResource/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Link } from 'dva/router';

import styles from './TableList.less';

const TreeNode = TreeSelect.TreeNode;
const FormItem = Form.Item;
const { Option } = Select;
const RadioGroup = Radio.Group;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['无效', '已发布', '审批中', '已驳回'];

// 根据状态码和权限显示操作
function GetOption(props) {
  switch (props.apiState) {
    case 0:
      return (<Button type="primary"><a onClick={() => (props.handleOption('use', props.id))}>启用</a></Button>);
    case 1:
    case 3:
      return (<Button type="primary"><a onClick={() => (props.handleOption('stop', props.id))}>停用</a></Button>);
    case 2:
      return (
        <span><Button type="primary"><a onClick={() => (props.handleOption('stop', props.id))}>停用</a></Button> <Button
          type="primary"
        ><Link to={'/resource/approval'}>去审批</Link></Button></span>);
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
  constructor(props) {
    super(props);
    this.handleOption = this.handleOption.bind(this);
  }

  state = {
    expandForm: false,
    selectedRows: [],
    formValues: {},
    stepFormValues: {},
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'apiResource/fetch',
    });
  }

  columns = [
    {
      title: '接口名称',
      dataIndex: 'apiName',
      key: 'apiName',
    },
    {
      title: '描述',
      dataIndex: 'apiDesc',
      key: 'apiDesc',
    },
    {
      title: '服务名称',
      dataIndex: 'serviceName',
      key: 'serviceName',
    },
    {
      title: '状态',
      dataIndex: 'apiState',
      key: 'apiState',
      filters: [
        {
          text: status[0],
          value: 0,
        },
        {
          text: status[1],
          value: 1,
        },
        {
          text: status[2],
          value: 2,
        },
        {
          text: status[3],
          value: 3,
        }
      ],
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
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'apiResource/fetch',
      payload: params,
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'apiResource/fetch',
      payload: {},
    });
  };

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
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

  handleMenuClick = e => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (!selectedRows) return;
    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'apiResource/remove',
          payload: {
            key: selectedRows.map(row => row.key),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          }
        });
        break;
      default:
        break;
    }
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'apiResource/fetch',
        payload: values,
      });
    });
  };

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form layout="inline"
            onSubmit={this.handleSearch}
      >
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8}
               sm={24}
          >
            <FormItem key="apiName"
                      label="接口名称"
            >
              {getFieldDecorator('apiName', {
                initialValue: '',
              })(<Input style={{ width: '100%' }}/>)}
            </FormItem>,

          </Col>
          <Col md={8}
               sm={24}
          >
            <FormItem key="apiState"
                      label="接口状态"
            >
              {getFieldDecorator('apiState', {
                initialValue: '',
              })(
                <Select style={{ width: '100%' }}>
                  <Option value="published">已发布</Option>
                  <Option value="onProve">审批中</Option>
                  <Option value="stop">无效</Option>
                </Select>,
              )}
            </FormItem>,
          </Col>
          <Col md={8}
               sm={24}
          >
            <span className={styles.submitButtons}>
              <Button htmlType="submit"
                      type="primary"
              >
                查询
              </Button>
              <Button onClick={this.handleFormReset}
                      style={{ marginLeft: 8 }}
              >
                重置
              </Button>
              <a onClick={this.toggleForm}
                 style={{ marginLeft: 8 }}
              >
                展开 <Icon type="down"/>
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderAdvancedForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form layout="inline"
            onSubmit={this.handleSearch}
      >
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8}
               sm={24}
          >
            <FormItem key="apiName"
                      label="接口名称"
            >
              {getFieldDecorator('apiName', {
                initialValue: '',
              })(<Input style={{ width: '100%' }}/>)}
            </FormItem>,

          </Col>
          <Col md={8}
               sm={24}
          >
            <FormItem key="apiState"
                      label="接口状态"
            >
              {getFieldDecorator('apiState', {
                initialValue: '',
              })(
                <Select placeholder="请选择"
                        style={{ width: '100%' }}
                >
                  <Option value="published">已发布</Option>
                  <Option value="published">审批中</Option>
                  <Option value="published">无效</Option>
                </Select>,
              )}
            </FormItem>,
          </Col>
          <Col md={8}
               sm={24}
          >
            <FormItem label="服务名">
              {getFieldDecorator('serviceName')(<Input style={{ width: '100%' }}/>)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8}
               sm={24}
          >
            <FormItem label="请求类型">
              {getFieldDecorator('requestType')(
                <Select placeholder="请选择"
                        style={{ width: '100%' }}
                >
                  <Option value="GET">GET(参数以url发送，安全等级较低)</Option>
                  <Option value="POST">POST(安全等级较高)</Option>
                </Select>,
              )}
            </FormItem>
          </Col>
          <Col md={8}
               sm={24}
          >
            <FormItem label="按发布时间">
              {getFieldDecorator('publishTime')(
                <DatePicker
                  format="YYYY-MM-DD HH:mm:ss"
                  placeholder="选择时间点"
                  showTime
                  style={{ width: '100%' }}
                />,
              )}
            </FormItem>
          </Col>
          <Col md={8}
               sm={24}
          >
            <Button type="primary">显示待审批</Button>
          </Col>
        </Row>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ float: 'right', marginBottom: 24 }}>
            <Button htmlType="submit"
                    type="primary"
            >
              查询
            </Button>
            <Button onClick={this.handleFormReset}
                    style={{ marginLeft: 8 }}
            >
              重置
            </Button>
            <a onClick={this.toggleForm}
               style={{ marginLeft: 8 }}
            >
              收起 <Icon type="up"/>
            </a>
          </div>
        </div>
      </Form>
    );
  }

  renderForm() {
    const { expandForm } = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  render() {
    const {
      apiResource: { data },
      loading,
    } = this.props;
    const { selectedRows } = this.state;
    const menu = (
      <Menu onClick={this.handleMenuClick}
            selectedKeys={[]}
      >
        <Menu.Item key="remove">删除</Menu.Item>
        <Menu.Item key="approval">批量审批</Menu.Item>
      </Menu>
    );

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button type="primary"><Link to="/resource/publish">发布接口</Link>
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
      </PageHeaderWrapper>
    );
  }
}

export default TableList;
