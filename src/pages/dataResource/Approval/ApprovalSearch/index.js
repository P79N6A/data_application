import React, { Component } from 'react';
import { Form, Input, Row, Col, Button, Select } from 'antd';
import styles from './index.less';
const Option = Select.Option;
const FormItem = Form.Item;
class ApprovalSearch extends Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
  }
  handleSearch(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch}>
        <Row gutter={24}>
          <Col span={6}>
            <FormItem className={styles['ant-form-items']} label="用户名">
              <Input placeholder="请输入用户名"/>
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem className={styles['ant-form-items']} label="接口名">
              <Input placeholder="请输入接口名"/>
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem className={styles['ant-form-items']} label="服务类型">
              <Select placeholder="请输入服务类型" style={{ width: 140 }}>
                <Option value="test2">test2</Option>
                <Option value="test3">test3</Option>
                <Option value="test1">test1</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span={6}>
            <Button htmlType="submit" type="primary">
              Search
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}
export default Form.create()(ApprovalSearch);
