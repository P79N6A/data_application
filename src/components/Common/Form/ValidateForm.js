/* eslint-disable react/no-multi-comp,no-unused-vars */
import React, { Component } from 'react';
import { Form, Input, Select, Radio } from 'antd';
import Reg from '../../../utils/RegExp';

const FormItem = Form.Item;

function getValidateForm(props) {
  class BSForm extends Component {
    constructor(props) {
      super(props);
      this.handleInputValidate_w = this.handleInputValidate_w.bind(this);
      this.handleValueFilter_w = this.handleValueFilter_w.bind(this);
      this.state = {
        formLayout: 'horizontal',
      };
    }

    componentDidMount() {
      props.getForm && props.getForm(this, props.key);
    }

    handleSubmit(length, i, to) {
      return this.props.form.validateFields((err, values) => {
        if (err) {
          err.errCode = 100;
        } else {
          // 表单提交数据处理在routes中完成
          props.next(values, length, i, to);
        }
      });
    }

    // 校验规则
    handleInputValidate_w(rule, value, callback) {
      value = this.handleValueFilter_w(value);
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

    // 此处添加过滤规则
    handleValueFilter_w(v) {
      let res;
      if (typeof v === 'string') {
        res = v.replace(/^ *$/, '').trim();
      } else {
        res = v;
      }
      return res;
    }

    render() {
      const { getFieldDecorator } = this.props.form;
      const { formLayout } = props.layout ? props.layout : this.state;
      const formItemLayout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 20 },
      };
      const levelList = [];
      return (
        <Form
          className={props.className}
          layout={formLayout}
          onSubmit={this.handleSubmit}
          style={{ marginLeft: '30%', width: '600px' }}
        >
          {props.FormItems.map((v, i) => {
            const w = v.width ? `${v.width}px` : '';
            if (v.type === 'option') {
              return (
                <FormItem
                  {...formItemLayout}
                  key={i}
                  label={v.label}
                  labelCol={{ span: 3, offset: 1 }}
                  style={{ width: `${w}` }}
                >
                  {getFieldDecorator(v.name, {
                    rules: [
                      { required: true, message: `请输入${v.label}` },
                      { validator: this.handleInputValidate_w },
                    ],
                    initialValue: props.formValue[v.name],
                  })(
                    <Select allowClear placeholder="请选择">
                      {v.optionData.map(item => (
                        <Select.Option key={item} value={item}>
                          {item}
                        </Select.Option>
                      ))}
                    </Select>,
                  )}
                </FormItem>
              );
            }
            return (
              <FormItem
                {...formItemLayout}
                key={i}
                label={v.label}
                labelCol={{ span: 3, offset: 1 }}
                style={{ width: `${w}` }}
              >
                {getFieldDecorator(v.name, {
                  rules: [{ required: true, message: `请输入${v.label}` }],
                  initialValue: props.formValue[v.name],
                })(<Input/>)}
              </FormItem>
            );
          })}
        </Form>
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

export default getValidateForm;
