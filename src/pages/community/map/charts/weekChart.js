import React, { Component } from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import styles from './weekChart.less';

class WeekChart extends Component {
  componentDidMount() {
    const myChart = echarts.init(document.getElementById('weekChart'));

    const option = {
      title: {
        text: '一周感知数据总量：4500',
      },
      xAxis: {
        type: 'category',
        data: ['一栋', '二栋', '三栋', '四栋', '五栋', '六栋', '七栋', '八栋'],
      },
      yAxis: {
        type: 'value',
      },
      series: [{
        data: [800, 200, 500, 800, 700, 300, 600, 500],
        type: 'bar',
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
                {offset: 0, color: '#00f'},
                {offset: 0.5, color: '#188df0'},
                {offset: 1, color: '#188df0'},
              ]
            ),
          },
          emphasis: {
            color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
                {offset: 0, color: '#2378f7'},
                {offset: 0.7, color: '#2378f7'},
                {offset: 1, color: '#83bff6'},
              ]
            ),
          },
        },
      }],
    };
    myChart.setOption(option)

  }

  render() {
    return (
      <div
        id="weekChart"
        className={styles.weekChart}
        style={{ width: '100%', height: '250px' }}
      />
    );
  }
}

WeekChart.defaultProps = {
};
export default WeekChart;
