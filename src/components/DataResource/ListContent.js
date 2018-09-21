import React, {Component} from 'react';
import styles from './ListContent.less'

class ListContent extends Component {
  render() {
    return (
      <div style={{padding: 24, background: '#fff', minHeight: 500}}>
        <div className={styles['content-flex-box']}>
          <div>电子底账发票资源库</div>
          <div>互联网采集资源库</div>
          <div>大屏展示资源库</div>
          <div>测试资源库</div>
        </div>
      </div>
    );
  }
}

export default ListContent;
