import React, { Component } from 'react';
import echarts from 'echarts/lib/echarts';
// 引入饼图
import 'echarts/lib/chart/pie';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';


class ApiChart extends Component {
  componentDidMount() {
    const apiChart = echarts.init(document.querySelector('#apiChart'));
    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)',
      },
      legend: {
        orient: 'vertical',
        x: 'left',
        data: ['未启用', '已启用', '发布中', '邮件营销', '联盟广告', '视频广告', '百度', '谷歌', '必应', '其他'],
      },
      series: [
        {
          name: '接口状态',
          type: 'pie',
          selectedMode: 'single',
          radius: [0, '30%'],

          label: {
            normal: {
              position: 'inner',
            },
          },
          labelLine: {
            normal: {
              show: false,
            },
          },
          data: [
            { value: 8, name: '未启用', selected: true },
            { value: 20, name: '已启用' },
            { value: 5, name: '发布中' },
          ],
        },

        {
          name: '服务分组',
          type: 'pie',
          radius: ['40%', '55%'],
          label: {
            normal: {
              formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
              backgroundColor: '#eee',
              borderColor: '#aaa',
              borderWidth: 1,
              borderRadius: 4,

              rich: {
                a: {
                  color: '#999',
                  lineHeight: 22,
                  align: 'center',
                },
                hr: {
                  borderColor: '#aaa',
                  width: '100%',
                  borderWidth: 0.5,
                  height: 0,
                },
                b: {
                  fontSize: 16,
                  lineHeight: 33,
                },
                per: {
                  color: '#eee',
                  backgroundColor: '#334455',
                  padding: [2, 4],
                  borderRadius: 2,
                },
              },
            },
          },
          data: [
            { value: 3, name: '危险物识别' },
            { value: 10, name: '监控识别' },
            { value: 8, name: '图像识别' },
            { value: 7, name: '快递检测' },
            { value: 5, name: '顺风车安全' },
          ],
        },
      ],
    };
    apiChart.setOption(option);
  }

  render() {
    return (
      <div
        id="apiChart"
        style={{ width: '100%', height: '500px' }}
      />
    );
  }
}

export default ApiChart;
