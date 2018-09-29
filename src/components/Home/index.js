import React, { Component } from 'react';
import { Carousel } from 'antd';
import styles from './index.less';

class HomePagePure extends Component {
  render() {
    return (
      <div className={styles['content-box']}>
        <div className={styles['latest-news']}>
          <span>最新动态</span>

          <Carousel autoplay
                    className={styles.news}
          >
            <span>已对接业务域九个</span>
            <span>已对接商城5个</span>
            <span>连接小区999个</span>
          </Carousel>
        </div>
        <div className={styles['all-function']}>
          <span>系统功能概览</span>
          <div className={styles['function-content']}>功能</div>
        </div>
        <div className={styles['fast-entry']}>
          <span>快捷入口</span>
        </div>
      </div>
    );
  }
}

export default HomePagePure;
