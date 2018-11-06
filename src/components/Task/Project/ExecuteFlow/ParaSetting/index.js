import { Divider } from 'antd';
import React, { Component } from 'react';

import styles from '../index.less';

class ParaSetting extends Component {

    render() {
        return (
            <div>
                <p className={styles.contTitle}>流程参数覆盖</p>
                <Divider/>
            </div>
        );
    }
}

export default ParaSetting;
