/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Input, Select, Radio } from 'antd';
import styles from './CustomForm.less';

const RadioGroup = Radio.Group;
const Option = Select.Option;

class CustomForm extends Component {
  render() {
    return (
      <React.Fragment>
        <form>
          <div className={styles['param-name']}>
            <Input addonBefore="参数名称"/>
          </div>
          <div className={styles['param-type']}>
            <span style={{ display: '' }}>参数类型 : </span>
            <span>
              <Select addonBefore="参数类型" key="type">
                <Option value="string">string</Option>
              </Select>
            </span>
          </div>
          <div className={styles['param-isnull']}>
            <span style={{ display: 'inline-block' }}>是否为空 : </span>
            <RadioGroup>
              <Radio value={1}>是</Radio>
              <Radio value={2}>否</Radio>
            </RadioGroup>
          </div>
          <div className={styles['param-desc']}>
            <Input addonBefore="备注"/>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default CustomForm;
