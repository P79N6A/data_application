import React, { PureComponent } from 'react'
import style from './index.less'
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
class HZbar extends PureComponent{
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'));
    // 绘制图表
    myChart.setOption({
        tooltip: {},
        color: ['#1E90FF'],
        xAxis: {
            data: ['2018-9-26']
        },
        yAxis: {},
        series: [{
            name: '数据量',
            type: 'bar',
            data: [166963]
        }]
    });
}
  render() {
    return(
      <div>
          <div className={style['container']}>
              <span>数据量变化(MB)及使用情况</span>
              <div id="main" className={style['bar']}>图表</div>
          </div>
      </div>
    )
  }
}
export default HZbar
