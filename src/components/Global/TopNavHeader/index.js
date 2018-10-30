import React, { PureComponent } from 'react';
import Link from 'umi/link';
import RightContent from '../GlobalHeader/RightContent';
import BaseMenu from '../SiderMenu/BaseMenu';
import styles from './index.less';

export default class TopNavHeader extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      maxWidth: (props.contentWidth === 'Fixed' ? 1200 : window.innerWidth) - 330 - 165 - 4 - 36,
    };
  }

  static getDerivedStateFromProps(props) {
    return {
      maxWidth: (props.contentWidth === 'Fixed' ? 1200 : window.innerWidth) - 330 - 165 - 4 - 36,
    };
  }

  render() {
    const { theme, contentWidth, logo } = this.props;
    const { maxWidth } = this.state;
    return (
      <div className={`${styles.head} ${theme === 'light' ? styles.light : ''}`}>
        <div
          className={`${styles.main} ${contentWidth === 'Fixed' ? styles.wide : ''}`}
          ref={ref => {
            this.maim = ref;
          }}
        >
          <div className={styles.left}>
            <div
              className={styles.logo}
              id="logo"
              key="logo"
            >
              <Link to="/">
                <img
                  alt="logo"
                  src={logo}
                />
                <h1>大数据管控平台</h1>
              </Link>
            </div>
            <div
              style={{
                maxWidth,
              }}
            >
              <BaseMenu
                {...this.props}
                style={{ border: 'none', height: 64 }}
              />
            </div>
          </div>
          <RightContent {...this.props} />
        </div>
      </div>
    );
  }
}
