import React, { Component } from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import {getCurrentDate} from '../../../../utils/utils';


class BarHZ extends Component {
  componentDidMount() {
    const myChart = echarts.init(document.getElementById('line-hz'));
    const { xAxis, yAxis } = this.props;

    myChart.setOption({
      title: {
        text: '一周使用次数总计 : 291, 058 次',
        textStyle:{
          color:'#f00',
          fontWeight:'normal',
          fontSize:18,
        },
        left:'30%',
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: xAxis,
      },
      yAxis: {
        type: 'value',
        name:'使用次数/次',
        nameTextStyle:{
          color:'#00f',
        },
      },
      series: [
        {
        stack: '总量',
        type: 'line',
        data: yAxis,
          label: {
            normal: {
              show: true,
              position: 'top',
            },
          },
      },
      ],
    });
  }

  render() {
    return (
      <div
        id="line-hz"
        style={{ width: '100%', height: '300px' }}
      />
    );
  }
}

let currentWeek=[];
for (let i = 6; i >=0; i-=1) {
  currentWeek.push(getCurrentDate(i))
}

BarHZ.defaultProps = {
  xAxis: currentWeek,
  yAxis: [50860, 36862, 36050, 41256, 35610, 30200, 60220],
};
export default BarHZ;
