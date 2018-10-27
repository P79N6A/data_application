import { Card, Col, Row } from 'antd';
import React, { Component } from 'react';

class People extends Component {
  render() {
    return (
      <div style={{ background: '#ECECEC', padding: '30px' }}>
        <Row gutter={16}>
          <Col span={8}>
            <Card title="常住人口"
                bordered
            >5600</Card>
          </Col>
          <Col span={8}>
            <Card title="暂住人口"
                bordered
            >2500</Card>
          </Col>
          <Col span={8}>
            <Card title="流动人口"
                bordered
            >3600</Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default People;
