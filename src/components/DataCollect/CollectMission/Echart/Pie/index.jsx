import React, { PureComponent } from 'react'
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/pie';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

class Pie extends PureComponent{
  componentDidMount() {
    setTimeout(() => {
        const myChart = echarts.init(document.getElementById('bar-bar'));
        // 基于准备好的dom，初始化echarts实例
        // 绘制图表
        myChart.setOption({
          title : {
              text: '采集来源',
              subtext: '单位: (万)',
              x:'center',
          },
          tooltip : {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)',
          },
          legend: {
              orient: 'vertical',
              left: 'left',
              data: ['公安','学校','医院','园区','社区'],
          },
          series : [
              {
                  name: '来源',
                  type: 'pie',
                  radius : '55%',
                  center: ['50%', '60%'],
                  data:[
                      {value:335, name:'公安'},
                      {value:310, name:'学校'},
                      {value:234, name:'医院'},
                      {value:135, name:'园区'},
                      {value:1548, name:'社区'},
                  ],
                  itemStyle: {
                      normal: {
                          label: {
                              position: 'inner',
                              formatter: '{b}: {c} ({d}%)'
                          }
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
            <div id="bar-bar" style={{width: '100%', height: '100%'}} />
        </div>
      )
    }
}
export default Pie
