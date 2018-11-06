import React, { PureComponent } from 'react';
import { Col, Form, Input, message, Row, Modal } from 'antd';
import { connect } from 'dva';

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
        this.props.dispatch({
          type: 'project/addProjectData',
          payload: {
            ...values,
          },
        }).then((res) => {
          if (res.isSuccess) {
            this.props.getData();
            this.props.onCancel();
            message.success('操作成功');
          }

          else {
            message.error('操作失败');
          }
        });
      }
    });
  };

  componentDidMount() {
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
  constructor(props) {
    super(props);
    this.state={
      visible:false
    }
  }

  show = () => {
    this.setState({ visible: true });
  };

  close = () => {
    this.setState({ visible: false });
  };

  render() {
    const WrappedRegistrationForm = Form.create()(BasicForm);
    this.props.Add && this.props.Add(this);
    return (
      <div>
        <Modal
          title={this.props.title || "新建项目"}
          destroyOnClose={true}
          okText="添加"
          cancelText="取消"
          onOk={() => {
            this.addModal && this.addModal.handleSubmit();
          }}
          onCancel={this.close}
          visible={this.state.visible}
        >
          <WrappedRegistrationForm
            {...this.props}
            onCancel={this.close}
            onRef={ref => {this.addModal=ref}}
          />
        </Modal>
      </div>
    );
  }
}

export default connect()(AddProject);
