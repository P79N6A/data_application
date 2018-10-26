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
    let myChart=echarts.init(document.getElementById('monitorGua'))

    let option = {
      tooltip : {
        formatter: '{a} <br/>{b} : {c}%'
      },
      toolbox: {
        feature: {
          restore: {},
          saveAsImage: {}
        }
      },
      series: [
        {
          name: '访问指标',
          type: 'gauge',
          detail: {formatter:'{value}%'},
          data: [{value: 50, name: '成功访问'}]
        }
      ]
    };
    myChart.setOption(option);
    this.timer=setInterval(function () {
      option.series[0].data[0].value = (85+Math.random() * 6).toFixed(2) - 0;
      myChart.setOption(option, true);
    },2000);
  }
  componentWillUnmount(){
    clearInterval(this.timer);
  }

  render() {

    return (
      <div id={'monitorGua'}
          ref={this.chartRef}
          style={{height:300}}
      >
      </div>
    );
  }
}

export default Guage;
