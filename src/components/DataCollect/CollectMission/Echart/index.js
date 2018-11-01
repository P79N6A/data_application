import React, {Component} from 'react';
import styles from './index.less';
import Bar from './Bar'
import Line from './Line'
import Pie from './Pie'
import BarState from './BarState'

class Echart extends Component {
  render() {
    return (
      <div className={styles['container']}>
        <div className={styles['left']}>
          <div className={styles['l-top']}>
              <Pie />
          </div>
          <div className={styles['l-bottom']}>
            <Line />
          </div>
        </div>
        <div className={styles['right']}>
          <div className={styles['r-top']}>
            <Bar />
          </div>
          <div className={styles['r-bottom']}>
            <BarState />
          </div>
        </div>
      </div>
    )
  }
}

export default Echart;
