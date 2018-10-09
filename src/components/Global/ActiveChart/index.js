import React, { Component } from 'react';
import { MiniArea } from '../../Charts/index';
import NumberInfo from '../NumberInfo';

import styles from './index.less';

function fixedZero(val) {
  return val * 1 < 10 ? `0${val}` : val;
}

function getActiveData() {
  const activeData = [];
  for (let i = 0; i < 24; i += 1) {
    activeData.push({
      x: `${fixedZero(i)}:00`,
      y: Math.floor(Math.random() * 200) + i * 50,
    });
  }
  return activeData;
}

export default class ActiveChart extends Component {
  state = {
    activeData: getActiveData(),
  };

  componentDidMount() {
    this.loopData();
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
    cancelAnimationFrame(this.requestRef);
  }

  loopData = () => {
    this.requestRef = requestAnimationFrame(() => {
      this.timer = setTimeout(() => {
        this.setState(
          {
            activeData: getActiveData(),
          },
          () => {
            this.loopData();
          }
        );
      }, 1000);
    });
  };

  render() {
    const { activeData = [] } = this.state;

    return (
      <div className={styles.activeChart}>
        <NumberInfo subTitle="流量评估"
                    total="流量正常"
        />
        <div style={{ marginTop: 32 }}>
          <MiniArea
            animate={false}
            borderWidth={2}
            data={activeData}
            height={84}
            line
            scale={{
              y: {
                tickCount: 3,
              }
            }}
            yAxis={{
              tickLine: false,
              label: false,
              title: false,
              line: false,
            }}
          />
        </div>
        {activeData && (
          <div className={styles.activeChartGrid}>
            <p>峰值 : {[...activeData].sort()[activeData.length - 1].y + 200}万次</p>
            <p>平均 : {[...activeData].sort()[Math.floor(activeData.length / 2)].y} 万次</p>
          </div>
        )}
        {activeData && (
          <div className={styles.activeChartLegend}>
            <span>00:00</span>
            <span>{activeData[Math.floor(activeData.length / 2)].x}</span>
            <span>{activeData[activeData.length - 1].x}</span>
          </div>
        )}
      </div>
    );
  }
}
