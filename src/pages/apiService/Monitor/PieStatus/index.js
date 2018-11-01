import React, { PureComponent } from 'react'
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/pie';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend'

class PieStatus extends PureComponent{
  componentDidMount() {
    setTimeout(() => {
      const myChart = echarts.init(document.getElementById('barStatus'));
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
          data: ['使用中','已停用','审批中','未发布'],
        },
        series : [
          {
            name: '接口状态',
            type: 'pie',
            radius : '70%',
            center: ['50%', '60%'],
            data:[
              {value:435, name:'使用中'},
              {value:50, name:'已停用'},
              {value:134, name:'审批中'},
              {value:135, name:'未发布'},
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
        <div id="barStatus" style={{width: '100%', height: '100%'}} />
      </div>
    )
  }
}
export default PieStatus
