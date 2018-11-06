import { Divider, Select } from 'antd';
import React, { Component } from 'react';

import styles from '../index.less';

const { Option } = Select;
const selectList = [
    {
      key: '1',
      value: '1',
      cont: '完成当前运行作业',
    }, {
      key: '2',
      value: '2',
      cont: '取消所有作业',
    }, {
      key: '3',
      value: '3',
      cont: '尽可能完成作业',
    },
  ];

class FailOption extends Component {

    render() {
        return (
            <div>
                <p className={styles.contTitle}>失败选项</p>
                <p>当一个流程失败时，选择需要执行的操作</p>
                <Divider />
                <ul className={styles.listStyleSet}>
                    <li><span style={{ fontWeight: 'bord' }}>完成当前运行作业</span> 只完成当前运行的作业.该操作不会启动任何新作业.</li>
                    <li><span style={{ fontWeight: 'bord' }}>取消所有作业</span> 立即结束所有的作业，同时修改流程状态为失败.</li>
                    <li><span style={{ fontWeight: 'bord' }}>尽可能完成作业</span> 该操作会尽可能的保持作业执行.</li>
                </ul>
                <Select defaultValue="1" style={{ width: 180, marginTop: 15 }}>
                    {
                        selectList.map((item) => {
                            return (
                                <Option value={item.value} key = {item.key}>{item.cont}</Option>
                            );
                        })
                    }
                </Select>
            </div>
        );
    }
}

export default FailOption;
