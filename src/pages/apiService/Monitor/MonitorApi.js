// import ApiChart from '../../../components/Echarts/ApiChart';
import React from 'react';
import { Row, Col, Card, Tooltip } from 'antd';
import classnames from 'classnames';
import  Gauge  from './Gauge';
import styles from './Monitor.less';
import LineHZ from './LineHZ';
import BarHZ from './BarHZ';

class MonitorApi extends React.Component {
  render() {
    return (
      <div>
        <Row
          gutter={10}
          style={{ height: 600 }}
        >
          <Col
            span={16}
            style={{ height: '100%' }}
          >
            <Card
              bordered={false}
              className={styles['antd-card-color']}
              title="服务访问情况"
              // style={{ height: '100%' }}
            >
              <LineHZ />
            </Card>
          </Col>
          <Col
            span={8}
            style={{ height: '100%' }}
          >
            <Card
              bordered={false}
              className={styles['antd-card-color']}
              style={{ marginBottom: 10, height: 300 }}
              title="服务类型"
            >
              <BarHZ />
            </Card>
            <Card
              // bodyStyle={{ textAlign: 'center' }}
              // bordered={false}
              className={classnames(styles['card-c'])}
              style={{ height: 290, padding:0 }}
              title="服务稳定性"
            >
              <Gauge />

            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default MonitorApi;
