import React, {Component} from 'react';

import Tree from '../../Common/Tree';
import Echart from './Echart';
import styles from './index.less';

const treeData = [{
  title: '内部数据',
  key: '0',
}, {
  title: '外部数据',
  key: '1',
}];

class CollectMission extends Component {
  render() {
    return (
      <div className={styles.fr}>
        <div className={styles.orgTree}>
          <Tree treeData={treeData} />
        </div>
        <div className={styles.contentTable}>
          <Echart />
        </div>
      </div>
    );
  }
}

export default CollectMission;
