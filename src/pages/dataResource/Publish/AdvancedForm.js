import React, { PureComponent } from 'react';
import {
  Card,
  Button,
  Form,
  Icon,
  Col,
  Row,
  DatePicker,
  TimePicker,
  Input,
  Select,
  Popover,
  TreeSelect,
} from 'antd';
import { connect } from 'dva';
import FooterToolbar from '@/components/FooterToolbar';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import TableForm from './TableForm';
import styles from './style.less';

const TreeNode = TreeSelect.TreeNode;

class Demo extends React.Component {
  state = {
    value: undefined,
  };

  onChange = (value) => {
    console.log(value);
    this.setState({ value });
  };

  render() {
    return (
      <TreeSelect
        showSearch
        style={{ width: 300 }}
        value={this.state.value}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        placeholder="Please select"
        allowClear
        treeDefaultExpandAll
        onChange={this.onChange}
      >
        <TreeNode value="parent 1" title="parent 1" key="0-1">
          <TreeNode value="parent 1-0" title="parent 1-0" key="0-1-1">
            <TreeNode value="leaf1" title="my leaf" key="random"/>
            <TreeNode value="leaf2" title="your leaf" key="random1"/>
          </TreeNode>
          <TreeNode value="parent 1-1" title="parent 1-1" key="random2">
            <TreeNode value="sss" title={<b style={{ color: '#08c' }}>sss</b>} key="random3"/>
          </TreeNode>
        </TreeNode>
      </TreeSelect>
    );
  }
}

const { Option } = Select;
const { RangePicker } = DatePicker;

const fieldLabels = {
  apiMenu: '接口目录',
  apiName: '接口名称',
  apiDesc: '接口描述',
  serviceName: '服务名称',
  apiType: '接口类型',
  requestType: '请求类型',
};

const tableData = [
  {
    key: '1',
    paramName: 'userName',
    paramType: 'string',
    paramIsNull: '是',
    paramNotice: 'New York No. 1 Lake Park',
  },
];

@connect(({ loading }) => ({
  submitting: loading.effects['form/submitAdvancedForm'],
}))
@Form.create()
class AdvancedForm extends PureComponent {
  state = {
    width: '100%',
  };

  componentDidMount() {
    window.addEventListener('resize', this.resizeFooterToolbar, { passive: true });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeFooterToolbar);
  }

  getErrorInfo = () => {
    const {
      form: { getFieldsError },
    } = this.props;
    const errors = getFieldsError();
    const errorCount = Object.keys(errors).filter(key => errors[key]).length;
    if (!errors || errorCount === 0) {
      return null;
    }
    const scrollToField = fieldKey => {
      const labelNode = document.querySelector(`label[for="${fieldKey}"]`);
      if (labelNode) {
        labelNode.scrollIntoView(true);
      }
    };
    const errorList = Object.keys(errors).map(key => {
      if (!errors[key]) {
        return null;
      }
      return (
        <li key={key} className={styles.errorListItem} onClick={() => scrollToField(key)}>
          <Icon type="cross-circle-o" className={styles.errorIcon}/>
          <div className={styles.errorMessage}>{errors[key][0]}</div>
          <div className={styles.errorField}>{fieldLabels[key]}</div>
        </li>
      );
    });
    return (
      <span className={styles.errorIcon}>
        <Popover
          title="表单校验信息"
          content={errorList}
          overlayClassName={styles.errorPopover}
          trigger="click"
          getPopupContainer={trigger => trigger.parentNode}
        >
          <Icon type="exclamation-circle"/>
        </Popover>
        {errorCount}
      </span>
    );
  };

  resizeFooterToolbar = () => {
    requestAnimationFrame(() => {
      const sider = document.querySelectorAll('.ant-layout-sider')[0];
      if (sider) {
        const width = `calc(100% - ${sider.style.width})`;
        const { width: stateWidth } = this.state;
        if (stateWidth !== width) {
          this.setState({ width });
        }
      }
    });
  };

  validate = () => {
    const {
      form: { validateFieldsAndScroll },
      dispatch,
    } = this.props;
    validateFieldsAndScroll((error, values) => {
      if (!error) {
        // submit the values
        dispatch({
          type: 'form/submitAdvancedForm',
          payload: values,
        });
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      submitting,
    } = this.props;
    const { width } = this.state;

    return (
      <PageHeaderWrapper
        title="发布接口"
        content="请输入接口详细信息。"
        wrapperClassName={styles.advancedForm}
      >
        <Card title="接口信息" className={styles.card} bordered={false}>
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label={fieldLabels.apiName}>
                  {getFieldDecorator('apiName', {
                    rules: [{ required: true, message: '请输入接口名称' }],
                  })(<Input placeholder="请输入接口名称"/>)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label={fieldLabels.apiMenu}>
                  {getFieldDecorator('apiMenu', {
                    rules: [{ required: true, message: '请选择目录' }],
                  })(
                    <TreeSelect
                      showSearch
                      style={{ width: 300 }}
                      value={this.state.value}
                      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                      placeholder="Please select"
                      allowClear
                      treeDefaultExpandAll
                      onChange={this.onChange}
                    >
                      <TreeNode value="parent 1" title="parent 1" key="0-1">
                        <TreeNode value="parent 1-0" title="parent 1-0" key="0-1-1">
                          <TreeNode value="leaf1" title="my leaf" key="random"/>
                          <TreeNode value="leaf2" title="your leaf" key="random1"/>
                        </TreeNode>
                        <TreeNode value="parent 1-1" title="parent 1-1" key="random2">
                          <TreeNode value="sss" title={<b style={{ color: '#08c' }}>sss</b>} key="random3"/>
                        </TreeNode>
                      </TreeNode>
                    </TreeSelect>,
                  )}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item label={fieldLabels.apiDesc}>
                  {getFieldDecorator('apiDesc', {
                    rules: [{ required: true, message: '请输入接口描述' }],
                  })(<Input placeholder="请输入接口描述"/>)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label={fieldLabels.serviceName}>
                  {getFieldDecorator('serviceName', {
                    rules: [{ required: true, message: '请输入服务名' }],
                  })(<Input placeholder="请输入接服务名"/>)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label={fieldLabels.apiType}>
                  {getFieldDecorator('apiType', {
                    rules: [{ required: true, message: '请输入接口类型' }],
                  })(
                    <Input placeholder="请输入接口类型"/>,
                  )}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item label={fieldLabels.requestType}>
                  {getFieldDecorator('requestType', {
                    rules: [{ required: true, message: '请选择请求类型' }],
                  })(
                    <Select placeholder="请选择请求类型">
                      <Option value="GET">GET</Option>
                      <Option value="POST">POST</Option>
                    </Select>,
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card title="输入参数" bordered={false}>
          {getFieldDecorator('params', {
            initialValue: tableData,
          })(<TableForm/>)}
        </Card>
        <FooterToolbar style={{ width }}>
          {this.getErrorInfo()}
          <Button type="primary" onClick={this.validate} loading={submitting}>
            提交
          </Button>
        </FooterToolbar>
      </PageHeaderWrapper>
    );
  }
}

export default AdvancedForm;
