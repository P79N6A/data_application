import React, { Component } from 'react';
import { Tree} from 'antd';

import styles from "./index.less";

const treeData = [{
  title: '紫光集团',
  key: '0',
  children: [{
    title: '重庆华智',
    key: '00',
    children: [{
      title: '应用开发部',
      key: "000",
      children: [{
        title: '开发部',
        key: "0000",
        children: [{
          title: "社区大数据组",
          key:"00000"
        },{
          title: "APP组",
          key:"00001"
        },{
          title: "数仓组",
          key:"00002"
        },{
          title: "系统组",
          key:"00003"
        },{
          title: "园区应用组",
          key:"00004"
        },{
          title: "基础架构组",
          key:"00005"
        },{
          title: "视综平台组",
          key:"00006"
        }]
      },{
        title: "测试部",
        key:"0001"
      }]
    }]
  }],
}];

class TreeComponent extends Component {
  render() {
    return (
      <div className={styles.wrapTree}>
        <Tree
          defaultExpandAll={this.props.defaultExpandAll || false}
          treeData={this.props.treeData || treeData}
        >
        </Tree>
      </div>
    );
  }
}

export default TreeComponent;
