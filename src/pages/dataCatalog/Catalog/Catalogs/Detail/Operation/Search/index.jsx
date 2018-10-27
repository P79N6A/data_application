import React, { Component } from 'react';
import { Form, Row, Col, Button, Select, Input, DatePicker } from 'antd';
import styles from './index.less';
const Option = Select.Option;
const FormItem = Form.Item;
class Search extends Component {
  constructor(props) {
    super(props);
    this.state={
      values: {}
    }
    this.handleSearch = this.handleSearch.bind(this);
  }
  handleSearch(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          values: {...values}
        })
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const config = {
      rules: [{ type: 'object'}]
    }
    return (
      <div>
        <Form onSubmit={this.handleSearch}>
          <Row gutter={24}>
            <Col span={7}>
              <FormItem className={styles['ant-form-items']}
                  label="操作动作"
              >
                {
                  getFieldDecorator('status', {
                    initialValue: '0'
                  })(
                    <Select
                        style={{ width: 140 }}
                    >
                      <Option value="0">删除</Option>
                      <Option value="1">编辑</Option>
                      <Option value="2">新增</Option>
                      <Option value="3">修改</Option>
                    </Select>,
                  )
                }
              </FormItem>
            </Col>
            <Col span={7}>
              <FormItem className={styles['ant-form-items']}
                  label="开始时间"
              >
                {getFieldDecorator('beginDate', config)(
                  <DatePicker format="YYYY-MM-DD HH:mm:ss"
                      showTime
                  />
                )}
              </FormItem>
            </Col>
            <Col span={5}>
              <FormItem className={styles['ant-form-items']}
                  label="主题名"
              >
                {
                  getFieldDecorator('name', {
                  })(
                    <Input/>
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
          <Row>
            <Col span={2}>
                <Button htmlType="submit"
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
