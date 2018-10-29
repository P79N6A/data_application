import React, { Component } from 'react';
import { Form, Row, Col, Button, Select } from 'antd';
import styles from './index.less';
import { connect } from 'dva';
import { OK_CODE } from '@/config/code'

const Option = Select.Option;
const FormItem = Form.Item;
@connect(({global}) => ({
  global,
}))
class InterfaceSearch extends Component {
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
        this.props.searchFilterFn(values)
      }
    });
  }

  add = () => {
    const SelectedRowKeys = this.props.getSelectedRowKeys()
    const interfaceIds = SelectedRowKeys.join(',')
    this.props.dispatch({
      type: 'apply/add',
      payload: {
        applyDesc: '接口使用申请',
        applyType: '1',
        interfaceIds,
      },
      callback: (res) => {
        if (res.code === OK_CODE) {
          this.props.clearSelecteRowKeys(SelectedRowKeys)
          // 操作成功
          this.props.searchFilterFn(this.state.values)
        }
      },
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form onSubmit={this.handleSearch}>
          <Row gutter={24}>
            <Col span={6}>
              <FormItem
                className={styles['ant-form-items']}
                label="服务分组"
              >
                {
                  getFieldDecorator('catalogId', {
                    initialValue: '0',
                  })(
                    <Select
                      style={{ width: 200 }}
                    >
                      {this.props.global.catalog.map(item => {
                        return (<Option key={item.id} value={item.id}>{item.catalogName}</Option>)
                      })}
                     
                    </Select>,
                  )
                }
              </FormItem>
            </Col>
            <Col span={5}>
              <FormItem
                className={styles['ant-form-items']}
                label="状态"
              >
                {
                  getFieldDecorator('status', {
                    initialValue: '0',
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
              <Button
                htmlType="submit"
                type="primary"
              >
                搜索
              </Button>
            </Col>
          </Row>
          <Row style={{display: (this.props.getSelectedRowKeys().length) > 0 ? 'block':'none'}}>
            <Col span={2}>
              <Button
                htmlType="submit"
                onClick={this.add}
                type="primary"
              >
                  去审批
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}
export default Form.create()(InterfaceSearch);
