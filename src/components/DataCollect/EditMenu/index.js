import React, {Component} from 'react';
import {Form, Input, Modal} from "antd";

import styles from './index.less';


const FormItem = Form.Item;
const {TextArea} = Input;
const formItemLayout = {
  labelCol: {span: 4},
  wrapperCol: {span: 8},
};


class menuForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <Form className={styles.form_c}>
        <FormItem label="数据库类型" {...formItemLayout} >
          {getFieldDecorator('type', {initialValue: "MySQL"})(
            <Input />
          )}
        </FormItem>
        <FormItem
          style={{position: 'relative'}}
          label="时间"
          {...formItemLayout}
        >
          {getFieldDecorator('time', {
            initialValue:"2018-10-27 11:11"
          })(
            <Input style={{width: 350, maxWidth: 350}}/>
          )}
        </FormItem>
        <FormItem
          style={{position: 'relative', height: 100}}
          label="描述"
          {...formItemLayout}
        >
          {getFieldDecorator('description', {
            initialValue:"开发人员数据库"
          })(
            <TextArea style={{width: 350, maxWidth: 350}} rows={4}/>
          )}
        </FormItem>
      </Form>
    )
  }
}

class EditMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }

  onForm = (ref) => {
    this.child = ref;
  };

  show = () => {
    this.setState({
      visible: true,
    });
  };

  _onCancel = () => {
    this.setState({
      visible: false,
    });
  };



  render() {
    const WrappedRegistrationForm = Form.create()(menuForm);
    return (
      <Modal
        title={this.props.title || `编辑菜单`}
        destroyOnClose={true}
        onCancel={this._onCancel}
        visible={this.state.visible}
        onOk={this._onCancel}
      >
        <WrappedRegistrationForm
          onRef={this.onForm}
        />
      </Modal>
    );
  }
}

export default EditMenu;
