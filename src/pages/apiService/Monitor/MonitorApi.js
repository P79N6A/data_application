// import ApiChart from '../../../components/Echarts/ApiChart';
import React from 'react';
import { Row, Col, Card, Tooltip } from 'antd';
import classnames from 'classnames';
import  Gauge  from './Gauge';
import styles from './Monitor.less';
import LineHZ from './LineHZ';
import BarHZ from './BarHZ';
import PieStatus from './PieStatus'
import PieUser from './PieUser'

class MonitorApi extends React.Component {
  render() {
    const cardStyle={
      bordered:true,
      hoverable:true,
    }
    return (
      <div>
        <Row
          gutter={10}
          style={{ height: 700 }}
        >
          <Col
            span={16}
            style={{ height: '100%' }}
          >
            <Row style={{height:350}}>
              <Card
                {...cardStyle}
                className={styles['antd-card-color']}
                title="最近一周服务使用趋势"
                bodyStyle={{padding:'0 10px', position:'relative', top:'-20px'}}
                // style={{ height: '100%' }}
              >
                <LineHZ />
              </Card>
            </Row>
            <Row style={{height:350 }}>
              <Card
                {...cardStyle}
                className={styles['antd-card-color']}
                title="接口状态分布"
                bodyStyle={{padding:'0 10px'}}
                style={{ float:'left' , padding:'0', width:'50%'}}
              >
                <PieStatus />
              </Card>
              <Card
                {...cardStyle}
                className={styles['antd-card-color']}
                title="接口使用者分布"
                bodyStyle={{padding:'0 10px'}}
                style={{ float:'right' , padding:'0 ', width:'50%'}}
              >
                <PieUser />
              </Card>
            </Row>
          </Col>
          <Col
            span={8}
            style={{ height: '100%' }}
          >
            <Card
              hoverable
              bordered={true}
              className={styles['antd-card-color']}
              style={{ marginBottom: '0', height: 350 }}
              bodyStyle={{padding:'0 10px'}}
              title="热门服务TOP5"
            >
              <BarHZ />
            </Card>
            <Card
              // bodyStyle={{ textAlign: 'center' }}
              {...cardStyle}
              className={classnames(styles['card-c'])}
              style={{ height: 308, padding:0 }}
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
