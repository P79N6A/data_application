import React, { PureComponent } from 'react';
import { Col, Form, Input, Row } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 },
};

class BasicForm extends PureComponent {

  handleSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.update({
          ...values,
          ...this.props.personData
        });
        this.props.onCancel();
      }
    });
  };

  componentDidMount() {
    console.log(this.props.personData);
    this.props.onRef && this.props.onRef(this);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Row>
          <Col span={24}>
            <FormItem label="名称" {...formItemLayout} >
              {getFieldDecorator('title', {
                rules: [{
                  required: true, message: '请输入项目名称!',
                }],
              })(
                <Input style={{ width: 350, maxWidth: 350 }} placeholder="项目名称"/>,
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem label="描述" {...formItemLayout} >
              {getFieldDecorator('value')(
                <TextArea style={{ width: 350, maxWidth: 350 }} rows={4} placeholder="项目描述"/>,
              )}
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }
}

class AddProject extends PureComponent {
  render() {
    const WrappedRegistrationForm = Form.create()(BasicForm);
    return (
      <WrappedRegistrationForm
        {...this.props}
      />
    );
  }
}

export default AddProject;
