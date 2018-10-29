import React, { Component } from 'react';
import { TreeSelect } from 'antd';

const TreeNode = TreeSelect.TreeNode;

class DefaultTreeSelect extends Component {
  constructor(props) {
    super(props);
    this.renderTreeNode = this.renderTreeNode.bind(this);
  }


  // 递归获取节点
  renderTreeNode(data) {
    return data.map((v) => {
      return (
        <TreeNode
          key={v.value}
          title={v.title}
          value={v.value}
        >
          {v.children ? this.renderTreeNode(v.children) : null}
        </TreeNode>
      );
    });
  }

  render() {

    const data = [
      {
        title: '重庆市', value: 'cq', children: [
          {
            title: '学校', value: 'sc', children: [
              { title: '学校1', value: 's1' },
              { title: '学校2', value: 's2' },
            ],
          },
          {
            title: '政府机构', value: 'cg', children: [
              { title: '机构1', value: 'c1' },
              { title: '机构2', value: 'c2' },
            ],
          },
        ],
      },
    ];

    const {
      allowClear = true,
      dropDownStyle = { maxHeight: 400, overflow: 'auto' },
      onChange,
      placeholder = '请选择',
      showSearch = true,
      style = { width: 300 },
      treeDefaultExpandAll = true,
      value = '',
      dataSource = data,
    } = { ...this.props };
    return (
      <div>
        <TreeSelect
          allowClear={allowClear}
          dropdownStyle={dropDownStyle}
          onChange={onChange}
          placeholder={placeholder}
          showSearch={showSearch}
          style={style}
          treeDefaultExpandAll={treeDefaultExpandAll}
          value={value}
        >
          {this.renderTreeNode(dataSource)}
        </TreeSelect>,
      </div>
    );
  }
}

export default DefaultTreeSelect;
