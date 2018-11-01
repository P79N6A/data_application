import React, { PureComponent } from 'react'
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/line';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

class Line extends PureComponent{
  componentDidMount() {
    setTimeout(() => {
      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(document.getElementById('line-line'));


      const data = [["2018-06-05",11656],["2018-06-06",12913],["2018-06-07",13523],["2018-06-08",18612],["2018-06-09",17334],["2018-06-10",18534],["2018-06-11",17312],["2018-06-12",11168],["2018-06-13",17892],["2018-06-14",12130],["2018-06-15",18245],["2018-06-16",19139],["2018-06-17",20115],["2018-06-18",15111],["2018-06-19",19309],["2018-06-20",13206],["2018-06-21",17137],["2018-06-22",19128],["2018-06-23",19085],["2018-06-24",16994],["2018-06-25",20171],["2018-06-26",19106],["2018-06-27",19784],["2018-06-28",16493],["2018-06-29",19485],["2018-06-30",13073],["2018-07-01",19783],["2018-07-02",12125],["2018-07-03",15707],["2018-07-04",15682],["2018-07-05",14244],["2018-07-06",17872],["2018-07-07",19106],["2018-07-08",10710],["2018-07-09",16666],["2018-07-10",17891],["2018-07-11",16792],["2018-07-12",11213],["2018-07-13",10778],["2018-07-14",19131],["2018-07-15",11541],["2018-07-16",17064],["2018-07-17",19769],["2018-07-18",19788],["2018-07-19",18777],["2018-07-20",19783],["2018-07-21",19111],["2018-07-22",19757],["2018-07-23",17855],["2018-07-24",19760]];

      const dateList = data.map((item) => {
        return item[0];
      });
      const valueList = data.map((item) => {
        return item[1];
      });
      
      const option = {
      
          // Make gradient line here
          visualMap: [{
              show: false,
              type: 'continuous',
              seriesIndex: 0,
              min: 0,
              max: 400,
          }],    
          title: [{
              left: 'center',
              text: '来源趋势图',
          }],
          tooltip: {
              trigger: 'axis',
          },
          xAxis: [{
              data: dateList,
          }],
          yAxis: [{
              splitLine: {show: false},
          }],
          // grid: [{
          //     bottom: '60%',
          // }],
          series: [{
              type: 'line',
              showSymbol: false,
              data: valueList,
          }],
      };
      myChart.setOption(option)
      // 绘制图表
      // myChart.setOption({
      //     tooltip: {},
      //     title: {
      //       text: '数据量',
      //       subtext: '单位: (万)',
      //     },
      //     xAxis: {
      //         data: ['10月', '周二', '周三', '周四', '周五', '周六', '周日'],
      //     },
      //     yAxis: {},
      //     series: [{
      //         name: '采集量',
      //         type: 'line',
      //         data: [166963, 124563,183456,153478,112457,198742, 134721],
      //     }],
      // });
    })
  }

    render() {
      return(
        <div id="line-line" style={{width: '100%', height: '100%'}} />
      )
    }
}
export default Line
