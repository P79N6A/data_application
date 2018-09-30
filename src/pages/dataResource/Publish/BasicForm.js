import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Card,
  InputNumber,
  Radio,
  Icon,
  Tooltip,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(({ loading }) => ({
  submitting: loading.effects['form/submitRegularForm'],
}))
@Form.create()
class BasicForms extends PureComponent {
  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'form/submitRegularForm',
          payload: values,
        });
      }
    });
  };

  render() {
    const { submitting } = this.props;
    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      }
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      }
    };

    return (
      <PageHeaderWrapper
        content="表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。"
        title="基础表单"
      >
        <Card bordered={false}>
          <Form hideRequiredMark
                onSubmit={this.handleSubmit}
                style={{ marginTop: 8 }}
          >
            <FormItem {...formItemLayout}
                      label="标题"
            >
              {getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: '请输入标题',
                  }
                ]
              })(<Input placeholder="给目标起个名字"/>)}
            </FormItem>
            <FormItem {...formItemLayout}
                      label="起止日期"
            >
              {getFieldDecorator('date', {
                rules: [
                  {
                    required: true,
                    message: '请选择起止日期',
                  }
                ]
              })(<RangePicker placeholder={['开始日期', '结束日期']}
                              style={{ width: '100%' }}
              />)}
            </FormItem>
            <FormItem {...formItemLayout}
                      label="目标描述"
            >
              {getFieldDecorator('goal', {
                rules: [
                  {
                    required: true,
                    message: '请输入目标描述',
                  }
                ]
              })(
                <TextArea
                  placeholder="请输入你的阶段性工作目标"
                  rows={4}
                  style={{ minHeight: 32 }}
                />,
              )}
            </FormItem>
            <FormItem {...formItemLayout}
                      label="衡量标准"
            >
              {getFieldDecorator('standard', {
                rules: [
                  {
                    required: true,
                    message: '请输入衡量标准',
                  }
                ]
              })(<TextArea placeholder="请输入衡量标准"
                           rows={4}
                           style={{ minHeight: 32 }}
              />)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={
                <span>
                  客户
                  <em className={styles.optional}>
                    （选填）
                    <Tooltip title="目标的服务对象">
                      <Icon style={{ marginRight: 4 }}
                            type="info-circle-o"
                      />
                    </Tooltip>
                  </em>
                </span>
              }
            >
              {getFieldDecorator('client')(
                <Input placeholder="请描述你服务的客户，内部客户直接 @姓名／工号"/>,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={
                <span>
                  邀评人
                  <em className={styles.optional}>（选填）</em>
                </span>
              }
            >
              {getFieldDecorator('invites')(
                <Input placeholder="请直接 @姓名／工号，最多可邀请 5 人"/>,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={
                <span>
                  权重
                  <em className={styles.optional}>（选填）</em>
                </span>
              }
            >
              {getFieldDecorator('weight')(<InputNumber max={100}
                                                        min={0}
                                                        placeholder="请输入"
              />)}
              <span className="ant-form-text">%</span>
            </FormItem>
            <FormItem {...formItemLayout}
                      help="客户、邀评人默认被分享"
                      label="目标公开"
            >
              <div>
                {getFieldDecorator('public', {
                  initialValue: '1',
                })(
                  <Radio.Group>
                    <Radio value="1">公开</Radio>
                    <Radio value="2">部分公开</Radio>
                    <Radio value="3">不公开</Radio>
                  </Radio.Group>,
                )}
                <FormItem style={{ marginBottom: 0 }}>
                  {getFieldDecorator('publicUsers')(
                    <Select
                      mode="multiple"
                      placeholder="公开给"
                      style={{
                        margin: '8px 0',
                        display: getFieldValue('public') === '2' ? 'block' : 'none',
                      }}
                    >
                      <Option value="1">同事甲</Option>
                      <Option value="2">同事乙</Option>
                      <Option value="3">同事丙</Option>
                    </Select>,
                  )}
                </FormItem>
              </div>
            </FormItem>
            <FormItem {...submitFormLayout}
                      style={{ marginTop: 32 }}
            >
              <Button htmlType="submit"
                      loading={submitting}
                      type="primary"
              >
                提交
              </Button>
              <Button style={{ marginLeft: 8 }}>保存</Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default BasicForms;
