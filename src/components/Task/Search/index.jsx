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
                label="数据库选择"
              >
                {getFieldDecorator('type')(
                  <Select
                    style={{ width: 140 }}
                  >
                    <Option value="0">Oracle</Option>
                    <Option value="1">MySQL</Option>
                    <Option value="2">PostgreSQL</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                className={styles['ant-form-items']}
                label="数据源名称"
              >
                {
                  getFieldDecorator('name')(
                    <Input
                      style={{ width: 140 }}
                    />
                  )
                }
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem
                className={styles['ant-form-items']}
                label="IP地址"
              >
                {
                  getFieldDecorator('IP')(
                    <Input
                      style={{ width: 140 }}
                    />
                  )
                }
              </FormItem>
            </Col>
            <Col span={4}>
              <Button
                htmlType="submit"
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
export default Form.create()(Search);
