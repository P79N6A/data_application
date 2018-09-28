/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react';
import { Form, Input, Select, Modal } from 'antd';
import Reg from '../../../utils/RegExp';

const { TextArea } = Input;
const Option = Select.Option;
const FormItem = Form.Item;

function BSFormModal(props) {
  class BSForm extends Component {
    static handleValueFilter_w(v) {
      let res;
      if (typeof v === 'string') {
        res = v.replace(/^ *$/, '').trim();
      } else {
        res = v;
      }
      return res;
    }

    // 校验规则
    static handleInputValidate_w(rule, value, callback) {
      value = BSForm.handleValueFilter_w(value);
      switch (rule.field) {
        case 'receiver':
          if (!value) {
            callback('请输入接收人');
          } else {
            Reg.regName.test(value) ? callback('名称含有非法字符串') : callback();
          }
          break;
        default:
          callback();
      }
    }

    constructor(props) {
      super(props);
      BSForm.handleValueFilter_w = BSForm.handleValueFilter_w.bind(this);
      this.state = {
        formLayout: 'horizontal',
      };
    }

    componentDidMount() {
      props.getForm && props.getForm(this);
    }

    handleSubmit() {
      this.props.form.validateFields((err, values) => {
        if (err) {
          return false;
        }
        // 表单提交数据处理在routes中完成
        props.childFormSubmit(values);
      });
    }

    render() {
      const { getFieldDecorator } = this.props.form;
      const { formLayout } = this.state;
      const formItemLayout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 17 },
      };
      const levelList = [];
      return (
        <Modal {...props}>
          <Form layout={formLayout} onSubmit={this.handleSubmit}>
            <FormItem {...formItemLayout} label="目标资源库">
              {getFieldDecorator('level', {
                rules: [{ required: true, message: '请选择级别' }],
              })(
                <Select allowClear placeholder="请选择">
                  {levelList.map(item => (
                    <Option key={item.position_id} value={item.position_id}>
                      {item.position_name}
                    </Option>
                  ))}
                </Select>,
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="表添加模式">
              {getFieldDecorator('status', {
                rules: [{ required: true, message: '请选择状态' }],
              })(
                <Select allowClear placeholder="请选择">
                  <Option key="1">成功</Option>
                  <Option key="2">失败</Option>
                </Select>,
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="数据表选择">
              {getFieldDecorator('recevier', {
                rules: [
                  { required: true, message: '请填写接收者' },
                  { validator: this.handleInputValidate_w },
                ],
              })(<Input/>)}
            </FormItem>
            <FormItem {...formItemLayout} label="已选择的表">
              {getFieldDecorator('selected', {
                rules: [
                  { required: true, message: '请填写接收者' },
                  { validator: this.handleInputValidate_w },
                ],
              })(<TextArea autosize={{ minRows: 2, maxRows: 6 }} placeholder="..."/>)}
            </FormItem>
          </Form>
        </Modal>
      );
    }
  }

  return class Search extends Component {
    render() {
      const SForm = Form.create()(BSForm);
      return <SForm/>;
    }
  };
}

export default BSFormModal;
