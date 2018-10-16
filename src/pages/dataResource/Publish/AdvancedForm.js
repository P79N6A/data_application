import React, { PureComponent } from 'react';
import {
  Card, Button, Form, Icon, Col,
  Row, Input, Select, Popover, TreeSelect
} from 'antd';
import { connect } from 'dva';
import FooterToolbar from '@/components/Global/FooterToolbar';
import TableForm from './TableForm';
import styles from './style.less';
import DefaultTreeSelect from '@/components/DataResource/DefaultTreeSelect';
import AutoInput from '@/components/DataResource/AutoInput';

const TreeNode = TreeSelect.TreeNode;

const { Option } = Select;

const fieldLabels = {
  apiMenu: '接口目录',
  interfaceName: '接口名称',
  interfaceDesc: '接口描述',
  catalogId: '服务分组',
  serviceName: '服务名称',
  servicePath: '接口路径',
  serviceMethodType: '请求类型'
};


// 可编辑表单默认数据
const tableData = [
  {
    key: '1',
    paramName: 'name',
    paramType: 'string',
    paramIsnull: '是',
    paramRemark: '备注'
  }
];

@connect(({ loading }) => ({
  submitting: loading.effects['apiResource/submitAdvancedForm']
}))
@Form.create()
class AdvancedForm extends PureComponent {
  constructor(props) {
    super(props);
    this.getAutoInputValue = this.getAutoInputValue.bind(this);
    this.getErrorInfo = this.getErrorInfo.bind(this);
  }

  state = {
    width: '100%'
  };

  componentDidMount() {
    window.addEventListener('resize', this.resizeFooterToolbar, { passive: true });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeFooterToolbar);
  }

  getErrorInfo = () => {
    const {
      form: { getFieldsError }
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
        <li className={styles.errorListItem}
            key={key}
            onClick={() => scrollToField(key)}
        >
          <Icon className={styles.errorIcon}
              type="cross-circle-o"
          />
          <div className={styles.errorMessage}>{errors[key][0]}</div>
          <div className={styles.errorField}>{fieldLabels[key]}</div>
        </li>
      );
    });
    return (
      <span className={styles.errorIcon}>
        <Popover
            content={errorList}
            getPopupContainer={trigger => trigger.parentNode}
            overlayClassName={styles.errorPopover}
            title="表单校验信息"
            trigger="click"
        >
          <Icon type="exclamation-circle"/>
        </Popover>
        {errorCount}
      </span>
    );
  };

  getAutoInputValue(e) {
    return '8888';
  }

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
      dispatch
    } = this.props;
    validateFieldsAndScroll((error, values) => {
      if (!error) {
        // submit the values
        dispatch({
          type: 'apiResource/saveApi',
          payload: values
        });
        dispatch({
          type: 'global/toLocation',
          payload: '/resource'
        });
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      submitting
    } = this.props;
    const { width } = this.state;

    return (
      <div
        /*content="请输入接口详细信息。"
        title="发布接口"*/
          wrapperClassName={styles.advancedForm}
      >
        <Card bordered={false}
            className={styles.card}
            title="接口信息"
        >
          <Form hideRequiredMark
              layout="vertical"
          >
            <Row gutter={16}>
              <Col lg={6}
                  md={12}
                  sm={24}
              >
                <Form.Item label={fieldLabels.interfaceName}>
                  {getFieldDecorator('interfaceName', {
                    rules: [{ required: true, message: '请输入接口名称' }]
                    // 表单控件输入值
                    // getValueFromEvent:this.getAutoInputValue,
                    // trigger:'onSelect'
                  })(<Input/>)}
                </Form.Item>
              </Col>
              <Col lg={{ span: 8 }}
                  md={{ span: 12 }}
                  sm={24}
                  xl={{ span: 6, offset: 2 }}
              >
                <Form.Item label={fieldLabels.interfaceDesc}>
                  {getFieldDecorator('interfaceDesc', {
                    rules: [{ required: true, message: '请输入描述' }]
                  })(<Input.TextArea placeholder="请输入描述"/>)}
                </Form.Item>
              </Col>
              <Col lg={{ span: 10 }}
                  md={{ span: 24 }}
                  sm={24}
                  xl={{ span: 8, offset: 2 }}
              >
                <Form.Item label={fieldLabels.catalogId}>
                  {getFieldDecorator('catalogId', {
                    rules: [{ required: true, message: '请输入服务分组' }]
                  })(
                    <TreeSelect
                        allowClear
                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                        onChange={this.onChange}
                        placeholder="Please select"
                        showSearch
                        style={{ width: 300 }}
                        treeDefaultExpandAll
                      // value={this.state.value}
                    >
                      <TreeNode key="0-1"
                          title="两江大数据组"
                          value="2"
                      >
                        <TreeNode key="0-1-1"
                            title="视频监控服务"
                            value="3"
                        >
                          <TreeNode key="random"
                              title="车牌识别"
                              value="1"
                          />
                          <TreeNode key="random1"
                              title="人脸识别"
                              value="leaf2"
                          />
                        </TreeNode>
                        <TreeNode key="random2"
                            title="图片服务"
                            value="parent 1-1"
                        >
                          <TreeNode key="random3"
                              title={<b style={{ color: '#08c' }}>人像身份识别</b>}
                              value="sss"
                          />
                        </TreeNode>
                      </TreeNode>
                      <TreeNode key="random3"
                          title="语音服务"
                          value="parent 1-1"
                      >
                        <TreeNode key="random3"
                            title={<b style={{ color: '#08c' }}>录音分析</b>}
                            value="sss"
                        />
                      </TreeNode>
                    </TreeSelect>,
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6}
                  md={12}
                  sm={24}
              >
                <Form.Item label={fieldLabels.serviceName}>
                  {getFieldDecorator('serviceName', {
                    rules: [{ required: true, message: '请输入服务名' }]
                  })(<Input placeholder="请输入接服务名"/>)}
                </Form.Item>
              </Col>
              <Col lg={{ span: 8 }}
                  md={{ span: 12 }}
                  sm={24}
                  xl={{ span: 6, offset: 2 }}
              >
                <Form.Item label={fieldLabels.servicePath}>
                  {getFieldDecorator('servicePath', {
                    rules: [{ required: true, message: '请输入接口路径' }]
                  })(
                    <Input placeholder="请输入接口路径"/>,
                  )}
                </Form.Item>
              </Col>
              <Col lg={{ span: 8 }}
                  md={{ span: 12 }}
                  sm={24}
                  xl={{ span: 6, offset: 2 }}
              >
                <Form.Item label={fieldLabels.serviceMethodType}>
                  {getFieldDecorator('serviceMethodType', {
                    rules: [{ required: true, message: '请选择请求类型' }]
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
        <Card bordered={false}
            title="输入参数"
        >
          {getFieldDecorator('paramInfoReqDTOS', {
            initialValue: tableData
          })(<TableForm/>)}
        </Card>
        <FooterToolbar style={{ width }}>
          {this.getErrorInfo()}
          <Button loading={submitting}
              onClick={this.validate}
              type="primary"
          >
            提交
          </Button>
        </FooterToolbar>
      </div>
    );
  }
}

export default AdvancedForm;
