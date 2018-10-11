import React, { Component } from 'react';
import { Form, Input, Row, Col, Button, Select } from 'antd';
import PropTypes from 'prop-types';
import styles from './index.less';

const Option = Select.Option;
const FormItem = Form.Item;

class ApplySearch extends Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.Search(values);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch}>
        <Row gutter={24}>
          <Col span={6}>
            <FormItem className={styles['ant-form-items']}
                      label="服务类型"
            >
              {
                getFieldDecorator('services')(
                  <Select placeholder="请输入服务类型"
                          style={{ width: 140 }}
                  >
                    <Option value="0">视频监控</Option>
                    <Option value="1">人脸识别</Option>
                  </Select>,
                )
              }
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem className={styles['ant-form-items']}
                      label="申请人"
            >
              {getFieldDecorator('username')(
                <Input autoComplete="off"
                       placeholder="请输入用户名"
                />,
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem className={styles['ant-form-items']}
                      label="接口名"
            >
              {
                getFieldDecorator('interface')(
                  <Input autoComplete="off"
                         placeholder="请输入接口名"
                  />,
                )
              }
            </FormItem>
          </Col>
          <Col span={6}>
            <Button htmlType="submit"
                    type="primary"
            >
              搜索
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

ApplySearch.propTypes = {
  Search: PropTypes.func.isRequired,
};
export default Form.create()(ApplySearch);
