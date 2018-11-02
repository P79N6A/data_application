import React, { Component } from 'react';
import { Form, Row, Col, Button, Select, Input, DatePicker } from 'antd';
import styles from './index.less';

const { Option } = Select;
const FormItem = Form.Item;
class Search extends Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(e) {
    e.preventDefault();
    // eslint-disable-next-line react/destructuring-assignment
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values)
      }
    });
  }

  render() {
    // eslint-disable-next-line react/destructuring-assignment
    const { getFieldDecorator} = this.props.form;
    const config = {
      rules: [{ type: 'object'}],
    }
    return (
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
                label="主题名"
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
