/* eslint-disable no-unused-vars,no-const-assign,no-empty,no-alert */
import { Form, Row, Col, Input, Button, Icon, Select, Radio, Divider } from 'antd';
import React from 'react';
import styles from './RowForm.less';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

function getRowForm(props) {
  class BSRowForm extends React.Component {
    state = {
      expand: false,
      paramNum: 0,
      rows: [],
    };

    componentDidMount() {
      props.getForm && props.getForm(this, props.key);
    }

    handleSubmit(length, i, to) {
      return this.props.form.validateFields((err, values) => {
        if (err) {
          err.errCode = 100;
        } else {
          // 表单提交数据处理在routes中完成
          props.next(values, length, i, to, props.key);
        }
      });
    }

    handleReset = () => {
      this.props.form.resetFields();
    };

    toggle = () => {
      const { expand } = this.state;
      this.setState({ expand: !expand });
    };

    handleDelete(i) {
      const nr = this.state.rows;
      console.log('delete', i, this.state.rows, nr);
      const snr = nr.filter(v => {
        console.log(v.key, i);
        return v.key !== String(i);
      });
      console.log(snr);
      this.setState({ rows: snr });

      props.onDelete();
    }

    // To generate mock Form.Item
    getFields(j) {
      const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
      };
      const { getFieldDecorator } = this.props.form;
      const FormFields = [
        { name: 'paramName', label: '参数名称', type: 'input' },
        { name: 'paramType', label: '参数类型', type: 'option' },
        { name: 'paramIsNull', label: '能否为空', type: 'radio' },
        { name: 'paramNotice', label: '参数备注', type: 'input' },
      ];

      const children = [];
      let i = 1;
      const params = props.formValue.params;
      children.push(
        <Col
          className={styles['form-action']}
          key={`${i++}-${j}`}
          span={1}
          style={{ display: 'block' }}
        >
          <Button
            onClick={() => {
              this.handleDelete(j);
            }}
            type="danger"
          >
            <Icon style={{ color: 'red' }} theme="outlined" type="close"/>
          </Button>
        </Col>,
      );
      children.push(
        <Col key={`${i++}-${j}`} span={6} style={{ display: 'block' }}>
          <FormItem {...formItemLayout} label="参数名称">
            {getFieldDecorator(`paramName-${j}`, {
              rules: [
                {
                  required: true,
                  message: 'Input something!',
                },
              ],
              initialValue: params[j] && params[j].paramName,
            })(<Input placeholder="placeholder"/>)}
          </FormItem>
        </Col>,
      );
      children.push(
        <Col key={`${i++}-${j}`} span={6} style={{ display: 'block' }}>
          <FormItem {...formItemLayout} label="参数类型">
            {getFieldDecorator(`paramType-${j}`, {
              rules: [
                {
                  required: true,
                  message: 'Input something!',
                },
              ],
              initialValue: params[j] && params[j].paramType,
            })(
              <Select allowClear placeholder="请选择">
                <Select.Option value="string">string</Select.Option>
                <Select.Option value="int">string</Select.Option>
                <Select.Option value="boolean">string</Select.Option>
                <Select.Option value="json">string</Select.Option>
              </Select>,
            )}
          </FormItem>
        </Col>,
      );
      children.push(
        <Col key={`${i++}-${j}`} span={5} style={{ display: 'block' }}>
          <FormItem {...formItemLayout} label="能否为空">
            {getFieldDecorator(`paramIsNull-${j}`, {
              rules: [],
              initialValue: params[j] && params[j].paramIsNull,
            })(
              <RadioGroup>
                <Radio value={1}>是</Radio>
                <Radio value={2}>否</Radio>
              </RadioGroup>,
            )}
          </FormItem>
        </Col>,
      );
      children.push(
        <Col key={`${i++}-${j}`} span={6} style={{ display: 'block' }}>
          <FormItem {...formItemLayout} label="参数备注">
            {getFieldDecorator(`paramNotice-${j}`, {
              rules: [
                {
                  required: true,
                  message: 'Input something!',
                },
              ],
              initialValue: params[j] && params[j].paramNotice,
            })(<Input placeholder="placeholder"/>)}
          </FormItem>
        </Col>,
      );
      children.push(<Divider key={`${i++}-${j}`}/>);
      return children;
    }

    render() {
      const rows = [];
      if (this.state.paramNum < props.num) {
        const si = props.num - this.state.paramNum;
        for (let i = 0; i < si; i++) {
          rows.push(
            <Row
              gutter={24}
              key={i + si}
              /* ref={(ref) => {
                 let rows=this.state.rows;
                 rows[i]=ref;
               }} */
            >
              {this.getFields(i)}
            </Row>,
          );
        }
        // this.setState({paramNum: props.num});
      }

      return (
        <Form className={styles['ant-advanced-search-form']} onSubmit={this.handleSearch}>
          {rows}
        </Form>
      );
    }
  }

  const RowForm = Form.create()(BSRowForm);
  return RowForm;
}

export default getRowForm;
