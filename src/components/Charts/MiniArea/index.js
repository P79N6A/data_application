import React from 'react';
import { Chart, Axis, Tooltip, Geom } from 'bizcharts';
import autoHeight from '../autoHeight';
import styles from '../index.less';

@autoHeight()
class MiniArea extends React.PureComponent {
  render() {
    const {
      height,
      data = [],
      forceFit = true,
      color = 'rgba(24, 144, 255, 0.2)',
      borderColor = '#1089ff',
      scale = {},
      borderWidth = 2,
      line,
      xAxis,
      yAxis,
      animate = true,
    } = this.props;

    const padding = [36, 5, 30, 5];

    const scaleProps = {
      x: {
        type: 'cat',
        range: [0, 1],
        ...scale.x,
      },
      y: {
        min: 0,
        ...scale.y,
      }
    };

    const tooltip = [
      'x*y',
      (x, y) => ({
        name: x,
        value: y,
      })
    ];

    const chartHeight = height + 54;

    return (
      <div className={styles.miniChart}
           style={{ height }}
      >
        <div className={styles.chartContent}>
          {height > 0 && (
            <Chart
              animate={animate}
              data={data}
              forceFit={forceFit}
              height={chartHeight}
              padding={padding}
              scale={scaleProps}
            >
              <Axis
                grid={false}
                key="axis-x"
                label={false}
                line={false}
                name="x"
                tickLine={false}
                {...xAxis}
              />
              <Axis
                grid={false}
                key="axis-y"
                label={false}
                line={false}
                name="y"
                tickLine={false}
                {...yAxis}
              />
              <Tooltip crosshairs={false}
                       showTitle={false}
              />
              <Geom
                color={color}
                position="x*y"
                shape="smooth"
                style={{
                  fillOpacity: 1,
                }}
                tooltip={tooltip}
                type="area"
              />
              {line ? (
                <Geom
                  color={borderColor}
                  position="x*y"
                  shape="smooth"
                  size={borderWidth}
                  tooltip={false}
                  type="line"
                />
              ) : (
                <span style={{ display: 'none' }} />
              )}
            </Chart>
          )}
        </div>
      </div>
    );
  }
}

export default MiniArea;
