import React, { PureComponent } from 'react'
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

class Bar extends PureComponent{
  componentDidMount() {
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(document.getElementById('pie-pie'));
    // 绘制图表
    myChart.setOption({
        tooltip: {},
        title: {
          text: '采集量',
        },
        color: ['#3398DB'],
        xAxis: {
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        },
        yAxis: {},
        series: [{
            name: '采集量',
            type: 'bar',
            data: [166963, 124563,183456,134721,153478,112457,198742],
        }],
    });
  }

    render() {
      return(
        <div id="pie-pie" style={{width: '100%', height: '100%'}} />
      )
    }
}
export default Bar
