import React, { Component } from 'react';
import { Chart, Tooltip, Geom, Coord, Axis } from 'bizcharts';
import { Row, Col } from 'antd';
import autoHeight from '../autoHeight';
import styles from './index.less';

/* eslint react/no-danger:0 */
export default
@autoHeight()
class Radar extends Component {
  state = {
    legendData: [],
  };

  componentDidMount() {
    this.getLegendData();
  }

  componentDidUpdate(preProps) {
    const { data } = this.props;
    if (data !== preProps.data) {
      this.getLegendData();
    }
  }

  getG2Instance = chart => {
    this.chart = chart;
  };

  // for custom lengend view
  getLegendData = () => {
    if (!this.chart) return;
    const geom = this.chart.getAllGeoms()[0]; // 获取所有的图形
    if (!geom) return;
    const items = geom.get('dataArray') || []; // 获取图形对应的

    const legendData = items.map(item => {
      // eslint-disable-next-line
      const origins = item.map(t => t._origin);
      const result = {
        name: origins[0].name,
        color: item[0].color,
        checked: true,
        value: origins.reduce((p, n) => p + n.value, 0),
      };

      return result;
    });

    this.setState({
      legendData,
    });
  };

  handleRef = n => {
    this.node = n;
  };

  handleLegendClick = (item, i) => {
    const newItem = item;
    newItem.checked = !newItem.checked;

    const { legendData } = this.state;
    legendData[i] = newItem;

    const filteredLegendData = legendData.filter(l => l.checked).map(l => l.name);

    if (this.chart) {
      this.chart.filter('name', val => filteredLegendData.indexOf(val) > -1);
      this.chart.repaint();
    }

    this.setState({
      legendData,
    });
  };

  render() {
    const defaultColors = [
      '#1890FF',
      '#FACC14',
      '#2FC25B',
      '#8543E0',
      '#F04864',
      '#13C2C2',
      '#fa8c16',
      '#a0d911',
    ];

    const {
      data = [],
      height = 0,
      title,
      hasLegend = false,
      forceFit = true,
      tickCount = 4,
      padding = [35, 30, 16, 30],
      animate = true,
      colors = defaultColors,
    } = this.props;

    const { legendData } = this.state;

    const scale = {
      value: {
        min: 0,
        tickCount,
      }
    };

    const chartHeight = height - (hasLegend ? 80 : 22);

    return (
      <div className={styles.radar}
           style={{ height }}
      >
        {title && <h4>{title}</h4>}
        <Chart
          animate={animate}
          data={data}
          forceFit={forceFit}
          height={chartHeight}
          onGetG2Instance={this.getG2Instance}
          padding={padding}
          scale={scale}
        >
          <Tooltip />
          <Coord type="polar" />
          <Axis
            grid={{
              lineStyle: {
                lineDash: null,
              },
              hideFirstLine: false,
            }}
            line={null}
            name="label"
            tickLine={null}
          />
          <Axis
            grid={{
              type: 'polygon',
              lineStyle: {
                lineDash: null,
              }
            }}
            name="value"
          />
          <Geom color={['name', colors]}
                position="label*value"
                size={1}
                type="line"
          />
          <Geom
            color={['name', colors]}
            position="label*value"
            shape="circle"
            size={3}
            type="point"
          />
        </Chart>
        {hasLegend && (
          <Row className={styles.legend}>
            {legendData.map((item, i) => (
              <Col
                key={item.name}
                onClick={() => this.handleLegendClick(item, i)}
                span={24 / legendData.length}
              >
                <div className={styles.legendItem}>
                  <p>
                    <span
                      className={styles.dot}
                      style={{
                        backgroundColor: !item.checked ? '#aaa' : item.color,
                      }}
                    />
                    <span>{item.name}</span>
                  </p>
                  <h6>{item.value}</h6>
                </div>
              </Col>
            ))}
          </Row>
        )}
      </div>
    );
  }
}
