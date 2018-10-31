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
    setTimeout(() => {
      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(document.getElementById('pie-pie'));
      // 绘制图表
      myChart.setOption({
          tooltip: {},
          title: {
            text: '来源top5',
          },
          color: ['#3398DB'],
          yAxis: {
              data: ['旅游', '购物', '餐饮', '出行', '快递'],
          },
          xAxis: {},
          series: [{
              name: '采集量',
              type: 'bar',
              data: [14696, 15456,16345,16472,18347],
          }],
      });
    })
  }

    render() {
      return(
        <div id="pie-pie" style={{width: '100%', height: '100%'}} />
      )
    }
}
export default Bar
