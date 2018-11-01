import React, { Component } from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/gauge';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';



class Guage extends Component {
  constructor(props) {
    super(props);
    this.state={timer:null}
    this.chartRef=React.createRef()
  }


  componentDidMount(){
    const myChart=echarts.init(document.getElementById('monitorGua'))

    const option = {
      tooltip : {
        formatter: '{a} <br/>{b} : {c}%',
      },
      toolbox: {
        feature: {
          restore: {},
          saveAsImage: {},
        },
      },
      series: [
        {
          name: '访问指标',
          type: 'gauge',
          detail: {formatter:'{value}%'},
          data: [{value: 80, name: '稳定性: 优'}],
          title : {
            // 其余属性默认使用全局文本样式，详见TEXTSTYLE
            fontWeight: 'bolder',
            fontSize: 16,
            fontStyle: 'italic',
            offsetCenter:[-5, 0],
          },
        },
      ],
    };
    myChart.setOption(option);
    this.timer=setInterval(() => {
      option.series[0].data[0].value = (85+Math.random() * 6).toFixed(2) - 0;
      myChart.setOption(option, true);
    },2000);
  }

  componentWillUnmount(){
    clearInterval(this.timer);
  }

  render() {

    return (
      <div
        id="monitorGua"
        ref={this.chartRef}
        style={{height:250}}
      />
    );
  }
}

export default Guage;
