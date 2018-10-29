import React, { Component } from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

class BarHZ extends Component {
  componentDidMount() {
    const myChart = echarts.init(document.getElementById('bar-hz'));
    const { xAxis, yAxis } = this.props;
    myChart.setOption({
      // title: { text: '服务分组' },
      tooltip: {},
      xAxis: {
        data: xAxis,
      },
      yAxis: {},
      series: [{
        name: '总量',
        type: 'bar',
        data: yAxis,
      }],
    });
  }

  render() {
    return (
      <div
        id="bar-hz"
        style={{ width: '100%', height: '250px' }}
      />
    );
  }
}

BarHZ.defaultProps = {
  xAxis: ['顺风车安全', '危险物识别', '监控识别', '图形识别', '快递检测'],
  yAxis: [5, 20, 36, 10, 10],
};
export default BarHZ;
