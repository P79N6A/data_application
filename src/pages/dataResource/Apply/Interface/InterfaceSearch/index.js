import React, { Component } from 'react';
import { Form, Row, Col, Button, Select } from 'antd';
import styles from './index.less';
const Option = Select.Option;
const FormItem = Form.Item;
class InterfaceSearch extends Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
  }
  handleSearch(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values)
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form onSubmit={this.handleSearch}>
          <Row gutter={24}>
            <Col span={5}>
              <FormItem className={styles['ant-form-items']}
                  label="申请类型"
              >
                {
                  getFieldDecorator('applyType', {
                    initialValue: '0'
                  })(
                    <Select
                        style={{ width: 140 }}
                    >
                      <Option value="0">接口发布</Option>
                      <Option value="1">接口使用</Option>
                    </Select>,
                  )
                }
              </FormItem>
            </Col>
            <Col span={5}>
              <FormItem className={styles['ant-form-items']}
                  label="状态"
              >
                {
                  getFieldDecorator('status', {
                    initialValue: '0'
                  })(
                    <Select
                        style={{ width: 140 }}
                    >
                      <Option value="0">未使用</Option>
                      <Option value="1">已使用</Option>
                    </Select>,
                  )
                }
              </FormItem>
            </Col>
            <Col span={2}>
              <Button htmlType="submit"
                  type="primary"
              >
                搜索
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}
export default Form.create()(InterfaceSearch);
