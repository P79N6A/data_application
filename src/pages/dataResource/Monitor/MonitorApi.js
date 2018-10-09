import ApiChart from '../../../components/Echarts/ApiChart';
import React, { PureComponent } from 'react';
import { Row, Col, Card, Tooltip } from 'antd';
import { Pie, WaterWave, Gauge, TagCloud } from '@/components/Charts';
import ActiveChart from '@/components/Global/ActiveChart';
import GridContent from '@/components/Global/PageHeaderWrapper/GridContent';
import styles from './Monitor.less';

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
                title="接口访问详情"
                style={{ height: '100%' }}
          >
            <ApiChart/>
          </Card>
        </Col>
        <Col span={8}
             style={{ height: '100%' }}
        >
          <Card bordered={false}
                className={styles['antd-card-color']}
            // style={{ marginBottom: 24 }}
                title="最近一天访问量"
          >
            <ActiveChart/>
          </Card>
          <Card
            bodyStyle={{ textAlign: 'center' }}
            bordered={false}
            className={styles['antd-card-color']}
            // style={{ marginBottom: 24 }}
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
