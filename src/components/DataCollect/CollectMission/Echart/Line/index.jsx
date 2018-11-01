import React, { PureComponent } from 'react'
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import 'echarts/lib/chart/line';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';

class Line extends PureComponent {
  componentDidMount() {
    setTimeout(() => {
      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(document.getElementById('line-line'));


      // const data1 = [11656, 12913, 13523, 18612, 17334, 18534, 17312]
      const xAxis = ["09月20", "09月21", "09月22", "09月23", "09月24", "09月25", "09月26"]
      const option = {
        // Make gradient line here
        title: {
          // left: 'center',
          text: '来源趋势图',
          textStyle: {
            color: '#ec1c24'
          }
        },
        legend: {
          data:['公安','社区','学校','园区','医院'],
          // show: true,
          // data: [{name: '公安'}]
        },
        tooltip: {
          trigger: 'axis',
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          data: xAxis,
          type: 'category',
          boundaryGap: false,
        },
        yAxis: {
          type: 'value',
        },
        series: [{
          type: 'line',
          // showSymbol: false,
          name: '公安',
          data: this.initData(10000, 10000),
        }, {
          type: 'line',
          // showSymbol: false,
          name: '社区',
          data: this.initData(8000, 10000),
        }, {
          type: 'line',
          // showSymbol: false,
          name: '学校',
          data: this.initData(7500, 10000),
        }, {
          type: 'line',
          // showSymbol: false,
          name: '园区',
          data: this.initData(6500, 10000),
        }, {
          type: 'line',
          // showSymbol: false,
          name: '医院',
          data: this.initData(),
        }],
      };
      myChart.setOption(option)
    })
  }

  initData = (num1, num2) => {
    const arr = []
    // eslint-disable-next-line
    for(let i = 0; i < 7; i++) {
     arr.push(Math.ceil(Math.random()*num1+num2))
    }
    return arr
  }
  
  render() {
    return (
      <div id="line-line" style={{ width: '100%', height: '100%' }} />
    )
  }
}
export default Line
