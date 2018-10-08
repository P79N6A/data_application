import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Tooltip } from 'antd';
import { Pie, WaterWave, Gauge, TagCloud } from '@/components/Charts';
import NumberInfo from '@/components/NumberInfo';
import ActiveChart from '@/components/ActiveChart';
import numeral from 'numeral';
import GridContent from '@/components/PageHeaderWrapper/GridContent';

import Authorized from '@/utils/Authorized';
import styles from './Monitor.less';

const { Secured } = Authorized;

const targetTime = new Date().getTime() + 3900000;

// use permission as a parameter
const havePermissionAsync = new Promise(resolve => {
  // Call resolve on behalf of passed
  setTimeout(() => resolve(), 300);
});

@Secured(havePermissionAsync)
@connect(({ monitor, loading }) => ({
  monitor,
  loading: loading.models.monitor,
}))
class Monitor extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'monitor/fetchTags',
    });
  }

  render() {
    const { monitor, loading } = this.props;
    const { tags } = monitor;

    return (
      <GridContent>
        <Row gutter={24}>
          <Col lg={24}
               md={24}
               sm={24}
               style={{ marginBottom: 24 }}
               xl={18}
               xs={24}
          >
            <Card bordered={false}
                  title="接口资源地图"
            >
              <Row>
                <Col md={6}
                     sm={12}
                     xs={24}
                >
                  <NumberInfo
                    subTitle="今日访问总量"
                    suffix="次"
                    total={numeral(124543233).format('0,0')}
                  />
                </Col>
                <Col md={6}
                     sm={12}
                     xs={24}
                >
                  <NumberInfo subTitle="市区服务覆盖率"
                              total="2%"
                  />
                </Col>
                <Col md={6}
                     sm={12}
                     xs={24}
                >
                  <NumberInfo
                    subTitle="已入驻的社区数量"
                    suffix="个"
                    total={numeral(25).format('0,0')}
                  />
                </Col>
                <Col md={6}
                     sm={12}
                     xs={24}
                >
                  <NumberInfo
                    subTitle="每秒访问量"
                    suffix="次"
                    total={numeral(234).format('0,0')}
                  />
                </Col>
              </Row>
              <div className={styles.mapChart}>
                <Tooltip title="等待后期实现">
                  <img
                    alt="map"
                    src="https://gw.alipayobjects.com/zos/rmsportal/HBWnDEUXCnGnGrRfrpKa.png"
                  />
                </Tooltip>
              </div>
            </Card>
          </Col>
          <Col lg={24}
               md={24}
               sm={24}
               xl={6}
               xs={24}
          >
            <Card bordered={false}
                  style={{ marginBottom: 24 }}
                  title="最近一天访问量"
            >
              <ActiveChart/>
            </Card>
            <Card
              bodyStyle={{ textAlign: 'center' }}
              bordered={false}
              style={{ marginBottom: 24 }}
              title="服务稳定性"
            >
              <Gauge height={180}
                     percent={87}
                     title="成功访问"
              />
            </Card>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col lg={24}
               sm={24}
               xl={12}
               xs={24}
          >
            <Card bordered={false}
                  className={styles.pieCard}
                  title="各机构占比"
            >
              <Row style={{ padding: '16px 0' }}>
                <Col span={8}>
                  <Pie
                    animate={false}
                    height={128}
                    lineWidth={2}
                    percent={28}
                    subTitle="学校"
                    total="28%"
                  />
                </Col>
                <Col span={8}>
                  <Pie
                    animate={false}
                    color="#5DDECF"
                    height={128}
                    lineWidth={2}
                    percent={22}
                    subTitle="政府机构"
                    total="50%"
                  />
                </Col>
                <Col span={8}>
                  <Pie
                    animate={false}
                    color="#2FC25B"
                    height={128}
                    lineWidth={2}
                    percent={32}
                    subTitle="企业"
                    total="22%"
                  />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col lg={12}
               sm={24}
               xl={6}
               xs={24}
          >
            <Card
              bodyStyle={{ overflow: 'hidden' }}
              bordered={false}
              loading={loading}
              title="热门访问"
            >
              <TagCloud data={tags}
                        height={161}
              />
            </Card>
          </Col>
          <Col lg={12}
               sm={24}
               xl={6}
               xs={24}
          >
            <Card
              bodyStyle={{ textAlign: 'center', fontSize: 0 }}
              bordered={false}
              title="资源剩余"
            >
              <WaterWave height={161}
                         percent={34}
                         title="资源利用率"
              />
            </Card>
          </Col>
        </Row>
      </GridContent>
    );
  }
}

export default Monitor;
