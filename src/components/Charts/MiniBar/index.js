import React from 'react';
import { Chart, Tooltip, Geom } from 'bizcharts';
import autoHeight from '../autoHeight';
import styles from '../index.less';

@autoHeight()
class MiniBar extends React.Component {
  render() {
    const { height, forceFit = true, color = '#1890FF', data = [] } = this.props;

    const scale = {
      x: {
        type: 'cat',
      },
      y: {
        min: 0,
      },
    };

    const padding = [36, 5, 30, 5];

    const tooltip = [
      'x*y',
      (x, y) => ({
        name: x,
        value: y,
      }),
    ];

    // for tooltip not to be hide
    const chartHeight = height + 54;

    return (
      <div
        className={styles.miniChart}
        style={{ height }}
      >
        <div className={styles.chartContent}>
          <Chart
            data={data}
            forceFit={forceFit}
            height={chartHeight}
            padding={padding}
            scale={scale}
          >
            <Tooltip
              crosshairs={false}
              showTitle={false}
            />
            <Geom
              color={color}
              position="x*y"
              tooltip={tooltip}
              type="interval"
            />
          </Chart>
        </div>
      </div>
    );
  }
}
export default MiniBar;
