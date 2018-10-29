import React, { Component } from 'react';
import { Form, Row, Col, Button, Select, Input, DatePicker } from 'antd';
import styles from './index.less';

const Option = Select.Option;
const FormItem = Form.Item;
class Search extends Component {
  constructor(props) {
    super(props);
    this.state={
      values: {},
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          values: {...values},
        })
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const config = {
      rules: [{ type: 'object'}],
    };
    return (
      <div>
        <Form onSubmit={this.handleSearch}>
          <Row gutter={24}>
            <Col span={6}>
              <FormItem
                className={styles['ant-form-items']}
                label="任务名称"
              >
                {
                  getFieldDecorator('name')(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col span={5}>
              <FormItem
                className={styles['ant-form-items']}
                label="状态"
              >
                {getFieldDecorator('status')(
                  <Select
                    style={{ width: 140 }}
                  >
                    <Option value="0">准备中</Option>
                    <Option value="1">进行中</Option>
                    <Option value="2">失败</Option>
                    <Option value="3">完成</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={5}>
              <FormItem
                className={styles['ant-form-items']}
                label="创建者"
              >
                {
                  getFieldDecorator('user', {
                  })(
                    <Input />
                  )
                }
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem
                className={styles['ant-form-items']}
                label="数据库类型"
              >
                {
                  getFieldDecorator('type')(
                    <Select
                      style={{ width: 140 }}
                    >
                      <Option value="0">Oracle</Option>
                      <Option value="1">MySQL</Option>
                      <Option value="2">PostgreSQL</Option>
                    </Select>
                  )
                }
              </FormItem>
            </Col>
            <Col span={2}>
              <Button
                htmlType="submit"
                type="primary"
              >
                搜索
              </Button>
            </Col>
          </Row>
          <Row>
            <Col span={2}>
              <Button
                htmlType="submit"
                onClick={this.add}
                type="primary"
              >
                  新增
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}
export default Form.create()(Search);
