import React, { PureComponent } from 'react'
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import 'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

class Bar extends PureComponent {
  componentDidMount() {
    setTimeout(() => {
      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(document.getElementById('pie-pie'));
      // // 绘制图表
      myChart.setOption({
          tooltip: {},
          title: {
            text: '来源top5',
            textStyle: {
              color: '#ec1c24'
            }
          },
          color: ['#3398DB'],
          yAxis: {
              data: ['园区', '社区', '学校', '医院', '公安'],
          },
          xAxis: {},
          series: [{
              name: '采集量',
              type: 'bar',
              data: [14696, 15456,16345,16472,18347],
              label: {
                normal: {
                  show: true,
                  position: 'insideRight'
                }
              },
          }],
      });
      // const data1 = [{name: '消防', value: 941}, {name: '消防', value: 970}, {name: '消防', value: 10}, {name: '消防', value: 302}, {name: '消防', value: 302}]
      // const data2 = [{name: '消防', value: 302}, {name: '消防', value: 0}, {name: '消防', value: 0}, {name: '消防', value: 301}, {name: '消防', value: 302}]
      // const data3 = [{name: '消防', value: 302}, {name: '消防', value: 0}, {name: '消防', value: 0}, {name: '消防', value: 302}, {name: '消防', value: 302}]
      // const data4 = [{name: '消防', value: 302}, {name: '消防', value: 0}, {name: '消防', value: 0}, {name: '消防', value: 145}, {name: '消防', value: 302}]
      // const data5 = [{name: '消防', value: 302}, {name: '消防', value: 0}, {name: '消防', value: 0}, {name: '消防', value: 302}, {name: '消防', value: 302}]
      // const option = {
      //   tooltip: {
      //     trigger: 'axis',
      //     axisPointer: {            // 坐标轴指示器，坐标轴触发有效
      //       type: 'shadow',      // 默认为直线，可选为：'line' | 'shadow'
      //     },
      //     formatter: function(params) {
      //       console.log(1)
      //     }
      //   },
      //   title: {
      //     text: '来源top5',
      //   },
      //   grid: {
      //     left: '3%',
      //     right: '4%',
      //     bottom: '3%',
      //     containLabel: true
      //   },
      //   xAxis: {
      //     type: 'value'
      //   },
      //   yAxis: {
      //     type: 'category',
      //     data: ['社区', '学校', '医院', '园区', '公安']
      //   },
      //   series: [
      //     {
      //       name: '公安',
      //       type: 'bar',
      //       stack: '总量',
      //       label: {
      //         normal: {
      //           show: true,
      //           position: 'insideRight'
      //         }
      //       },
      //       data: data1
      //     },
      //     {
      //       name: '学校',
      //       type: 'bar',
      //       stack: '总量',
      //       label: {
      //         normal: {
      //           show: true,
      //           position: 'insideRight'
      //         }
      //       },
      //       data: data2
      //     },
      //     {
      //       name: '医院',
      //       type: 'bar',
      //       stack: '总量',
      //       label: {
      //         normal: {
      //           show: true,
      //           position: 'insideRight'
      //         }
      //       },
      //       data: data3
      //     },
      //     {
      //       name: '园区',
      //       type: 'bar',
      //       stack: '总量',
      //       label: {
      //         normal: {
      //           show: true,
      //           position: 'insideRight'
      //         }
      //       },
      //       data: data4
      //     },
      //     {
      //       name: '社区',
      //       type: 'bar',
      //       stack: '总量',
      //       label: {
      //         normal: {
      //           show: true,
      //           position: 'insideRight'
      //         }
      //       },
      //       data: data5
      //     }

      //   ]
      // };
      // myChart.setOption(option)
    })
  }

  render() {
    return (
      <div id="pie-pie" style={{ width: '100%', height: '100%' }} />
    )
  }
}
export default Bar
