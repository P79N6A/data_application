import React, { Component } from 'react';
import { Chart, Axis, Tooltip, Geom } from 'bizcharts';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import autoHeight from '../autoHeight';
import styles from '../index.less';

@autoHeight()
class Bar extends Component {
  state = {
    autoHideXLabels: false,
  };

  componentDidMount() {
    window.addEventListener('resize', this.resize, { passive: true });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  handleRoot = n => {
    this.root = n;
  };

  handleRef = n => {
    this.node = n;
  };

  @Bind()
  @Debounce(400)
  resize() {
    if (!this.node) {
      return;
    }
    const canvasWidth = this.node.parentNode.clientWidth;
    const { data = [], autoLabel = true } = this.props;
    if (!autoLabel) {
      return;
    }
    const minWidth = data.length * 30;
    const { autoHideXLabels } = this.state;

    if (canvasWidth <= minWidth) {
      if (!autoHideXLabels) {
        this.setState({
          autoHideXLabels: true,
        });
      }
    } else if (autoHideXLabels) {
      this.setState({
        autoHideXLabels: false,
      });
    }
  }

  render() {
    const {
      height,
      title,
      forceFit = true,
      data,
      color = 'rgba(24, 144, 255, 0.85)',
      padding,
    } = this.props;

    const { autoHideXLabels } = this.state;

    const scale = {
      x: {
        type: 'cat',
      },
      y: {
        min: 0,
      }
    };

    const tooltip = [
      'x*y',
      (x, y) => ({
        name: x,
        value: y,
      })
    ];

    return (
      <div className={styles.chart}
           ref={this.handleRoot}
           style={{ height }}
      >
        <div ref={this.handleRef}>
          {title && <h4 style={{ marginBottom: 20 }}>{title}</h4>}
          <Chart
            data={data}
            forceFit={forceFit}
            height={title ? height - 41 : height}
            padding={padding || 'auto'}
            scale={scale}
          >
            <Axis
              label={autoHideXLabels ? false : {}}
              name="x"
              tickLine={autoHideXLabels ? false : {}}
              title={false}
            />
            <Axis min={0}
                  name="y"
            />
            <Tooltip crosshairs={false}
                     showTitle={false}
            />
            <Geom color={color}
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

export default Bar;
