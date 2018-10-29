import React, { Component } from 'react';
import { Form, Row, Col, Button, Select, DatePicker } from 'antd';
import styles from './index.less';

const Option = Select.Option;
const FormItem = Form.Item;
class Search extends Component {
  constructor(props) {
    super(props);
    this.state={
      values: {},
    }
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
    return (
      <div className={styles['search-container']}>
        <Form onSubmit={this.handleSearch}>
          <Row gutter={24}>
            <Col span={6}>
              <FormItem
                className={styles['ant-form-items']}
                label="操作资源"
              >
                {
                  getFieldDecorator('res', {
                    initialValue: '0',
                  })(
                    <Select>
                      <Option value="0">无限制</Option>
                      <Option value="1">可访问</Option>
                      <Option value="2">不可访问</Option>
                    </Select>,
                  )
                }
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem
                className={styles['ant-form-items']}
                label="操作动作"
              >
                {
                  getFieldDecorator('status', {
                    initialValue: '4',
                  })(
                    <Select>
                      <Option value="0">删除</Option>
                      <Option value="1">编辑</Option>
                      <Option value="2">新增</Option>
                      <Option value="3">修改</Option>
                      <Option value="4">所有</Option>
                    </Select>,
                  )
                }
              </FormItem>
            </Col>
            <Col span={9}>
              <FormItem
                className={styles['ant-form-items']}
                label="时间"
              >
                {getFieldDecorator('beginDate')(
                  <DatePicker.RangePicker />
                )}
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
