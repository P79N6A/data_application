import React, { Component } from 'react';
import { Form, Row, Col, Button, Select, Input, DatePicker } from 'antd';
import styles from './index.less';

// eslint-disable-next-line prefer-destructuring
const Option = Select.Option;
const FormItem = Form.Item;
class Search extends Component {
  constructor(props) {
    super(props);
    this.state={
      // eslint-disable-next-line react/no-unused-state
      values: {},
    }
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(e) {
    e.preventDefault();
    // eslint-disable-next-line react/destructuring-assignment
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          // eslint-disable-next-line react/no-unused-state
          values: {...values},
        })
      }
    });
  }

  render() {
    // eslint-disable-next-line react/destructuring-assignment
    const { getFieldDecorator } = this.props.form;
    const config = {
      rules: [{ type: 'object'}],
    }
    return (
      // eslint-disable-next-line react/jsx-filename-extension
      <div>
        <Form onSubmit={this.handleSearch}>
          <Row gutter={24}>
            <Col span={7}>
              <FormItem
                className={styles['ant-form-items']}
                label="查看方式"
              >
                {
                  getFieldDecorator('status', {
                    initialValue: '0',
                  })(
                    <Select
                      style={{ width: 140 }}
                    >
                      <Option value="0">所有资源查看</Option>
                      <Option value="1">按数据主管部门查看</Option>
                      <Option value="2">按来源业务域查看</Option>
                    </Select>,
                  )
                }
              </FormItem>
            </Col>
            <Col span={7}>
              <FormItem
                className={styles['ant-form-items']}
                label="开始时间"
              >
                {getFieldDecorator('beginDate', config)(
                  <DatePicker
                    format="YYYY-MM-DD HH:mm:ss"
                    showTime
                  />
                )}
              </FormItem>
            </Col>
            <Col span={5}>
              <FormItem
                className={styles['ant-form-items']}
                label="数据表名"
              >
                {
                  getFieldDecorator('name', {
                  })(
                    <Input />
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
        </Form>
      </div>
    );
  }
}
export default Form.create()(Search);
