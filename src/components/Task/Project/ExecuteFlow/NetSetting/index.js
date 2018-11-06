import { Divider, Checkbox, Input} from 'antd';
import React, { Component } from 'react';

import styles from '../index.less';

const { TextArea } = Input;

class NetSetting extends Component {

    render() {
        return (
            <div>
                <p className={styles.contTitle}>故障通知</p>
                <p>在作业首次出现错误或流程以失败结束时发送通知.</p>
                <Divider />
                <button>出现错误</button>
                <button>流程错误</button>
                <p className={styles.contTitle}>故障邮箱</p>
                <Checkbox>覆盖流程设置邮箱</Checkbox>
                <p style={{ fontWeight: 'bord' }}>失败时向这些地址发送通知.逗号、空格或分号分隔不同的地址.</p>
                <TextArea rows={4} disabled={'disabled'} />
                <p className={styles.contTitle}>成功邮箱</p>
                <Checkbox>覆盖流程设置邮箱</Checkbox>
                <p style={{ fontWeight: 'bord' }}>成功时向这些地址发送通知.逗号、空格或分号分隔不同的地址.</p>
                <TextArea rows={4} disabled={'disabled'} />
            </div>
        );
    }
}

export default NetSetting;
