import { Card, Col, Row } from 'antd';
import React, { Component } from 'react';
import styles from './people.less';

class People extends Component {

  render() {
    const colStyle={span:8,style:{padding:0}};
    const cardStyle={style:{borderRight:'2px solid #000'}}
    return (
      <div
        style={{ background: '#ECECEC', padding: '0' }}
        className={styles['row-content']}
      >
        <Row
          gutter={16}
          style={{margin:0}}
        >
          <Col {...colStyle}>
            <Card
              title="常住人口"
              {...cardStyle}
            >5600
            </Card>
          </Col>
          <Col {...colStyle}>
            <Card
              title="暂住人口"
              {...cardStyle}
            >2500
            </Card>
          </Col>
          <Col {...colStyle}>
            <Card
              title="流动人口"
              {...cardStyle}
            >3600
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default People;
