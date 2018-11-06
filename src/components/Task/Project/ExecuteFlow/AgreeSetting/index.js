import { Divider, Radio, Select } from 'antd';
import React, { Component } from 'react';

import styles from '../index.less';

const RadioGroup = Radio.Group;
const { Option } = Select;
const RedioList = [
    {
      key:'1',
      value: '1',
      title: '跳过执行',
      cont: '不启动已经运行中的流程.',
  
    }, {
      key:'2',
      value: '2',
      title: '一致执行',
      cont: '强制执行流程. 之前的执行不会被影响.',
    },
  ];

class AgreeSetting extends Component {

    render() {
        return (
            <div>
                <p className={styles.contTitle}>一致性执行选项</p>
                <p>流程运行中有以下选项可以设置.</p>
                <Divider />
                <RadioGroup defaultValue = "1">
                    {
                        RedioList.map((item) => {
                            return (
                                <div>
                                    <Radio value={item.value} key = {item.key}>{item.title}</Radio>
                                    <p>{item.cont}</p>
                                </div>
                            );
                        })

                    }
                    <Radio value='3' key = "3" style={{ display: 'block' }}>排序执行</Radio>
                    <Select defaultValue="1" style={{ width: 180, marginTop: 15 }}>
                        <Option value='1' key="1">level1</Option>
                        <Option value='2' key="2">level2</Option>
                    </Select>
                    <p>管道执行流程，使当前执行流程不会被覆盖.</p>
                    <ul className={styles.listStyleSet}>
                        <li>级别 1: 阻止作业A直到前一个流程作业A完成.</li>
                        <li>级别 2: 阻止作业A直到前一个流程作业A的子作业完成.</li>
                    </ul>
                </RadioGroup>
            </div>
        );
    }
}

export default AgreeSetting;
