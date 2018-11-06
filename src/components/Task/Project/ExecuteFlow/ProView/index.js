import { Divider } from 'antd';
import React, { Component } from 'react';

import styles from '../index.less';

class ProView extends Component {

    render() {
        return (
            <div>
                <p className={styles.contTitle}>正在完善</p>
                <Divider/>
            </div>
        );
    }
}

export default ProView;
