import React, { Component } from 'react';
import { Menu } from 'antd';
import Link from 'umi/link';
import styles from './HeaderMenu.less';

class HeaderMenu extends Component {
  constructor(props) {
    super(props);
    this.state={selectedKeys:[]}
  }

  render() {
    return (
      <span className={styles['header-menu']}>
        <Link to={'/api/monitorApi'} > 数据资源</Link>
        <Link to={'/community'}>社区应用</Link>
      </span>
    );
  }
}

export default HeaderMenu;
