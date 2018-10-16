import React, { Component } from 'react';
import { Form, Row, Col, Button, Select, DatePicker } from 'antd';
import PropTypes from 'prop-types';
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
        // 处理时间
        let { beginDate, endDate } = values
        let times = {
          beginDate: beginDate ? beginDate.format('YYYY-MM-DD HH:mm:ss') : null,
          endDate: endDate ? endDate.format('YYYY-MM-DD HH:mm:ss') : null
        }
        let pageParam = {
          pageIndex: 1,
          pageSize: 10,
          orderFiled: 'approve_date',
          orderRule: 'desc'
        }
        this.props.search({...values, ...times, pageParam});
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const config = {
      rules: [{ type: 'object'}]
    }
    return (
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
                    {/* <Option value="">全部</Option> */}
                    <Option value="0">审批中</Option>
                    <Option value="1">已审批</Option>
                    <Option value="2">驳回</Option>
                  </Select>,
                )
              }
            </FormItem>
          </Col>
          <Col span={6}>
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
          <Col span={6}>
            <FormItem className={styles['ant-form-items']}
                label="结束时间"
            >
              {
                getFieldDecorator('endDate', config)(
                  <DatePicker format="YYYY-MM-DD HH:mm:ss"
                      showTime
                  />
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
    );
  }
}
ApprovalSearch.propTypes = {
  search: PropTypes.func.isRequired
}
export default Form.create()(ApprovalSearch);
