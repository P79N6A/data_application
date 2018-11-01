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
      // myChart.setOption({
      //     tooltip: {},
      //     title: {
      //       text: '来源top5',
      //       textStyle: {
      //         color: '#ec1c24'
      //       }
      //     },
      //     color: ['#3398DB'],
      //     yAxis: {
      //         data: ['园区', '社区', '学校', '医院', '公安'],
      //     },
      //     xAxis: {},
      //     series: [{
      //         name: '采集量',
      //         type: 'bar',
      //         data: [14696, 15456,16345,16472,18347],
      //         label: {
      //           normal: {
      //             show: true,
      //             position: 'insideRight'
      //           }
      //         },
      //     }],
      // });
      const data1 = [{ name: '人员信息', value: 4941 }, { name: '学生信息', value: 4970 }, { name: '刷卡记录', value: 4100 }, { name: '刷卡记录', value: 4302 }, { name: '技侦', value: 8302 }]
      const data2 = [{ name: '车辆出入', value: 3041 }, { name: '老师信息', value: 4500 }, { name: '车辆出入', value: 4100 }, { name: '车辆出入', value: 4302 }]
      const data3 = [{ name: '到访记录', value: 2041 }, { name: '车辆出入', value: 4410 }, { name: '人员登记', value: 4100 }, { name: '人员登记', value: 4302 }, { name: '刑侦', value: 9602 }]
      const data4 = [{ name: '监控信息', value: 6141 }, { name: '人员登记', value: 4300 }, { name: '人员出入', value: 4100 }, { name: '人员出入', value: 4302 }]
      const data5 = [{ name: '治安信息', value: 4341 }, { name: '采购信息', value: 4670 }, { name: '患者信息', value: 4100 }, { name: '设施登记', value: 4302 }, { name: '消防', value: 6302 }]
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow',      // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function (params) {
            return params.reduce((prev, { data: { name, value } }) => `${prev}${name}: ${value} <br/>`, '');
          }
        },
        title: {
          text: '来源top5',
          textStyle: {
            color: '#ec1c24'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'category',
          data: ['社区', '学校', '医院', '园区', '公安']
        },
        series: [
          {
            name: '公安',
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'insideRight'
              }
            },
            data: data1
          },
          {
            name: '学校',
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'insideRight'
              }
            },
            data: data2
          },
          {
            name: '医院',
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'insideRight'
              }
            },
            data: data3
          },
          {
            name: '园区',
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'insideRight'
              }
            },
            data: data4
          },
          {
            name: '社区',
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'insideRight'
              }
            },
            data: data5
          }

        ]
      };
      myChart.setOption(option)
    })
  }

  render() {
    return (
      <div id="pie-pie" style={{ width: '100%', height: '100%' }} />
    )
  }
}
export default Bar
