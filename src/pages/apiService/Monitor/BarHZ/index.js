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
      yAxis: {
        data: xAxis,
        name:'服务类型',
        nameTextStyle:{
          color:'#00f',
        },
        axisLabel:{
          // inside:true,
          color:'#000',
          width:'100px',
          rotate:45,
        },
      },
      xAxis: {
        nameLocation:'center',
        name:'使用次数/次',
        nameTextStyle:{
          color:'#00f',
          align:'center',
          padding:[10, 0, 0, 0],
        },
      },
      series: [
        {
        name: '总量',
        type: 'bar',
        data: yAxis,
        label:{
          normal: {
            show: true,
            color:'#f00',
            // textBorderColor: '#333',
            // textBorderWidth: 2,
            position:'right',
          },
        },
      },
      ],
    });
  }

  render() {
    return (
      <div
        id="bar-hz"
        style={{ width: '100%', height: '300px' }}
      />
    );
  }
}

BarHZ.defaultProps = {
  xAxis: ['纠纷解决', '临时证明', '快递检测', '户籍查询', '校园安全'],
  yAxis: [20150, 32050, 36256, 42310, 56236],
};
export default BarHZ;
