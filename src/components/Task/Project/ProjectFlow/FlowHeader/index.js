import React, { PureComponent } from 'react';
import { Button, Col, Row } from 'antd';


const buttonStyle={
  height:"30px",
  width:"88px",
  marginLeft:"5px"
};

class FlowHeader extends PureComponent {
  constructor(props) {
    super(props);
  }

  handleButton = (e) => {
    e.stopPropagation();
  };

  render() {
    return (
      <>
        <Row gutter={12}>
          <Col span={16} >
            <strong>{this.props.title || 'null'}</strong>
          </Col>
          <Col >
            <Button onClick={this.handleButton} style={buttonStyle}>执行流程</Button>
            <Button onClick={this.handleButton} style={buttonStyle}>执行情况</Button>
            <Button onClick={this.handleButton} style={buttonStyle}>流程概要</Button>
          </Col>
        </Row>
      </>
    );
  }
}

export default FlowHeader;
