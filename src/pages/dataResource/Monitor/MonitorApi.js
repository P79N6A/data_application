// import ApiChart from '../../../components/Echarts/ApiChart';
import React from 'react';
import { Row, Col, Card, Tooltip } from 'antd';
import { Gauge } from '@/components/Charts';
import styles from './Monitor.less';
import LineHZ from './LineHZ';
import BarHZ from './BarHZ';

class MonitorApi extends React.Component {
  render() {
    return (
      <Row gutter={10}
          style={{ height: '600px' }}
      >
        <Col
            span={16}
            style={{ height: '100%' }}
        >
          <Card bordered={false}
              className={styles['antd-card-color']}
              title="接口访问情况"
            // style={{ height: '100%' }}
          >
            <LineHZ style={{ height: '500px' }}/>
          </Card>
        </Col>
        <Col span={8}
            style={{ height: '100%' }}
        >
          <Card bordered={false}
              className={styles['antd-card-color']}
              style={{ marginBottom: 10, height: 300 }}
              title="接口服务类型"
          >
            {/*<ActiveChart/>*/}
            <BarHZ/>
          </Card>
          <Card
              // bodyStyle={{ textAlign: 'center' }}
              // bordered={false}
              className={styles['antd-card-color']}
              style={{ height: 290 }}
              title="服务稳定性"
          >
            <Gauge height={180}
                percent={87}
                title="成功访问"
            />
          </Card>
        </Col>
      </Row>
    );
  }
}

export default MonitorApi;
