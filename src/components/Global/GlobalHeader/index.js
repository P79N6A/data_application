import React, { PureComponent } from 'react';
import { Icon } from 'antd';
import Link from 'umi/link';
import Debounce from 'lodash-decorators/debounce';
import styles from './index.less';
import RightContent from './RightContent';
import HeaderMenu from './HeaderMenu';

export default class GlobalHeader extends PureComponent {
  componentWillUnmount() {
    this.triggerResizeEvent.cancel();
  }

  /* eslint-disable*/
  @Debounce(600)
  triggerResizeEvent() {
    // eslint-disable-line
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }

  toggle = () => {
    const { collapsed, onCollapse } = this.props;
    onCollapse(!collapsed);
    this.triggerResizeEvent();
  };

  render() {
    const {collapsed, isMobile, logo } = this.props;
    return (
      <div className={styles.header}>
        {isMobile && (
          <Link to="/" className={styles.logo} key="logo">
            <img src={logo} alt="logo" width="32"/>
          </Link>
        )}
        <div className={styles.logo}
             id="logo"
        >
          <Link to="/">
            <img alt="logo"
                 src={logo}
            />
            <h1>大数据管控平台</h1>
          </Link>
          {/*<Icon
            className={styles.trigger}
            style={{position:'absolute'}}
            type={collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={this.toggle}
          />*/}
        </div>

        <HeaderMenu {...this.props} />
        <RightContent {...this.props} />
      </div>
    );
  }
}
