import React, { PureComponent } from 'react';
import { Button, Col, Row } from 'antd';
import {connect} from 'dva';

const buttonStyle={
  marginLeft:"5px"
};

class FlowHeader extends PureComponent {
  constructor(props) {
    super(props);
  }

  handleButton = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  componentDidMount() {
    this.props.onRef && this.props.onRef(this);
  }



  render() {
    return (
      <>
        <Row gutter={12}>
          <Col span={17} >
            <strong>{this.props.title || 'null'}</strong>
          </Col>
          <Col >
            <Button onClick={this.props.showExcFlow} size='small' style={buttonStyle}>执行流程</Button>
            <Button onClick={this.handleButton} size='small' style={buttonStyle}>执行情况</Button>
            <Button onClick={this.handleButton} size='small' style={buttonStyle}>流程概要</Button>
          </Col>
        </Row>
      </>
    );
  }
}

function mapStateToProps({ project }) {
  return project;
}

export default connect(mapStateToProps)(FlowHeader);

