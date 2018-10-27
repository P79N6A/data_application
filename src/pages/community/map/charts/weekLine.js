import React, { Component } from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

class BarHZ extends Component {
  componentDidMount() {
    let myChart = echarts.init(document.getElementById('line-hz'));
    const { xAxis, yAxis } = this.props;
    myChart.setOption({
      title: {
        text: '一周数据趋势'
      },
      // title: { text: '接口使用情况' },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: xAxis
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        stack: '总量',
        type: 'line',
        data: yAxis
      }]
    });
  }

  render() {
    return (
      <div id="line-hz"
          style={{ width: '100%', height: '200px' }}
      ></div>
    );
  }
}

BarHZ.defaultProps = {
  xAxis: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
  yAxis: [800, 790, 750, 800, 900, 800, 600]
};
export default BarHZ;
