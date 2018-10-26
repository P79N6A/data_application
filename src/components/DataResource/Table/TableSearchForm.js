import React, { Component } from 'react';
import styles from '../../../pages/apiService/ListManage/TableList/TableList.less';
import {
  Row, Col, Form, Input, Select, Icon,
  Button,  DatePicker
} from 'antd';

const FormItem = Form.Item;
const { Option } = Select;
const {RangPicker}=DatePicker;

function TableSearchForm(props) {
  let {getFieldDecorator, handleFormReset, toggleForm, handleSearch}=props;
  return (
    <Form className={styles['search-form']}
        layout="inline"
        onSubmit={handleSearch}
    >
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={8}
            sm={24}
        >
          <FormItem key="interfaceName"
              label="接口名称"
          >
            {getFieldDecorator('interfaceName', {
              initialValue: ''
            })(<Input style={{ width: '100%' }}/>)}
          </FormItem>,

        </Col>
        <Col md={8}
            sm={24}
        >
          <FormItem key="status"
              label="接口状态"
          >
            {getFieldDecorator('status', {
              initialValue: ''
            })(
              <Select style={{ width: '100%' }}>
                <Option value={null}>所有状态</Option>
                <Option value="2">已发布</Option>
                <Option value="1">审批中</Option>
                <Option value="0">无效</Option>
              </Select>,
            )}
          </FormItem>,
        </Col>
        <Col md={8}
            sm={24}
        >
            <span className={styles.submitButtons}>
              <Button htmlType="submit"
                  type="primary"
              >
                查询
              </Button>
              <Button onClick={handleFormReset}
                  style={{ marginLeft: 8 }}
              >
                重置
              </Button>
              <a onClick={toggleForm}
                  style={{ marginLeft: 8 }}
              >
                展开 <Icon type="down"/>
              </a>
            </span>
        </Col>
      </Row>
    </Form>
  );
}

function AdvanceTableSearchForm(props) {
  let {getFieldDecorator, handleFormReset, toggleForm, handleSearch}=props;
  return (
    <Form className={styles['search-form']}
        layout="inline"
        onSubmit={handleSearch}
    >
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={8}
            sm={24}
        >
          <FormItem key="interfaceName"
              label="接口名称"
          >
            {getFieldDecorator('interfaceName', {
              initialValue: ''
            })(<Input style={{ width: '100%' }}/>)}
          </FormItem>,

        </Col>
        <Col md={8}
            sm={24}
        >
          <FormItem key="status"
              label="接口状态"
          >
            {getFieldDecorator('status', {
              initialValue: ''
            })(
              <Select placeholder="请选择"
                  style={{ width: '100%' }}
              >
                <Option value={null}>所有状态</Option>
                <Option value="published">已发布</Option>
                <Option value="onProve">审批中</Option>
                <Option value="stop">无效</Option>
              </Select>,
            )}
          </FormItem>,
        </Col>
        <Col md={8}
            sm={24}
        >
          <FormItem label="服务名">
            {getFieldDecorator('interfaceName')(<Input style={{ width: '100%' }}/>)}
          </FormItem>
        </Col>
      </Row>
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={8}
            sm={24}
        >
          <FormItem label="请求类型">
            {getFieldDecorator('requestType')(
              <Select placeholder="请选择"
                  style={{ width: '100%' }}
              >
                <Option value="GET">GET</Option>
                <Option value="POST">POST</Option>
              </Select>,
            )}
          </FormItem>
        </Col>
        <Col md={8}
            sm={24}
        >
          <FormItem label="发布时间">
            {getFieldDecorator('publishTime')(
              <DatePicker.RangePicker
                  format="YYYY-MM-DD HH:mm:ss"
                  showTime
                  style={{ width: '100%' }}
              />,
            )}
          </FormItem>
        </Col>
        <Col md={8}
            sm={24}
        >
          <div style={{ overflow: 'hidden' }}>
            <div style={{ float: 'left', marginBottom: 24 }}>
              <Button htmlType="submit"
                  type="primary"
              >
                查询
              </Button>
              <Button onClick={handleFormReset}
                  style={{ marginLeft: 8 }}
              >
                重置
              </Button>
              <a onClick={toggleForm}
                  style={{ marginLeft: 8 }}
              >
                收起 <Icon type="up"/>
              </a>
            </div>
          </div>
        </Col>
      </Row>
    </Form>
  );
}

// 可展开搜索表单
function ExpandableSearchForm(props) {
    const {  expandForm, ...res } = props;
    if (!expandForm){
      return TableSearchForm({...res})
    } else {
      return AdvanceTableSearchForm({...res});
    }
}

export {TableSearchForm, AdvanceTableSearchForm, ExpandableSearchForm}

