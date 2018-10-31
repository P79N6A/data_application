import React, { PureComponent } from 'react'
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/pie';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

class BarState extends PureComponent{
  componentDidMount() {
    setTimeout(() => {
        const myChart = echarts.init(document.getElementById('BarState'));
        // 基于准备好的dom，初始化echarts实例
        // 绘制图表
        myChart.setOption({
          title : {
              text: '任务状态',
              x:'center',
          },
          tooltip : {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)',
          },
          legend: {
              orient: 'vertical',
              left: 'left',
              data: ['成功','等待调度','失败','正在运行'],
          },
          series : [
              {
                  name: '任务状态',
                  type: 'pie',
                  radius : '55%',
                  center: ['50%', '60%'],
                  data:[
                      {value:19335, name:'成功'},
                      {value:9310, name:'等待调度'},
                      {value:1620, name:'失败'},
                      {value:8300, name:'正在运行'},
                  ],
                  itemStyle: {
                      normal: {
                          label: {
                            //   position: 'inner',
                              formatter: '{b}: {c} ({d}%)',
                          },
                      },
                      emphasis: {
                          shadowBlur: 10,
                          shadowOffsetX: 0,
                          shadowColor: 'rgba(0, 0, 0, 0.5)',
                      },
                  },
              },
          ],
        });
    })
  }

    render() {
      return(
        <div style={{width: '100%', height: '100%'}}>
          <div id="BarState" style={{width: '100%', height: '100%'}} />
        </div>
      )
    }
}
export default BarState
