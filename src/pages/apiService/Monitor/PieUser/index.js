import React, { PureComponent } from 'react'
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/pie';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend'

class PieUser extends PureComponent{
  componentDidMount() {
    setTimeout(() => {
      const myChart = echarts.init(document.getElementById('pieUser'));
      // 基于准备好的dom，初始化echarts实例
      // 绘制图表
      let option={
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          orient: 'vertical',
          left: 0,
          data: ['重庆大学','两江公安局','大坪医院','内部使用'],
        },
        series : [
          {
            name: '访问来源',
            type: 'pie',
            radius : ['45%', '70%'],
            center: ['50%', '60%'],
            data:[
              {value:335, name:'重庆大学'},
              {value:310, name:'两江公安局'},
              {value:234, name:'大坪医院'},
              {value:135, name:'内部使用'},
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
            label: {
              normal: {
                position: 'inner',
                formatter: "{b} : {d}%",
              },
            },
          },
        ],
      };
      myChart.setOption(option);
    })
  }

  render() {
    return(
      <div style={{width: '450px', height: '250px'}}>
        <div id="pieUser" style={{width: '100%', height: '100%'}} />
      </div>
    )
  }
}
export default PieUser
