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
      style:{
        // border:'1px solid #f00',
      },
      headStyle:{color:'#f00', border:'1px solid #E0E0E0', fontWeight:800, fontSize:18},
      bodyStyle:{border:'1px solid #E0E0E0' ,padding:'0 5px'},
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
                title="最近一周接口使用趋势"
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
                style={{ float:'left' , padding:'0', width:'50%'}}
              >
                <PieStatus />
              </Card>
              <Card
                {...cardStyle}
                className={styles['antd-card-color']}
                title="接口使用者分布"
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
              {...cardStyle}
              className={styles['antd-card-color']}
              style={{ marginBottom: '0', height: 350 }}
              title="本周热门接口服务TOP5"
            >
              <BarHZ />
            </Card>
            <Card
              // bodyStyle={{ textAlign: 'center' }}
              {...cardStyle}
              className={classnames(styles['card-c'])}
              style={{ height: 308, padding:0 }}
              title="最近一小时访问成功率"
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
