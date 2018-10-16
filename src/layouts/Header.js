import React, { PureComponent } from 'react';
import { Layout, message } from 'antd';
import Animate from 'rc-animate';
import { connect } from 'dva';
import router from 'umi/router';
import GlobalHeader from '@/components/Global/GlobalHeader';
import TopNavHeader from '@/components/Global/TopNavHeader';
import styles from './Header.less';
import Authorized from '@/utils/Authorized';

const { Header } = Layout;

class HeaderView extends PureComponent {
  state = {
    visible: true
  };

  static getDerivedStateFromProps(props, state) {
    if (!props.autoHideHeader && !state.visible) {
      return {
        visible: true
      };
    }
    return null;
  }

  componentDidMount() {
    document.addEventListener('scroll', this.handScroll, { passive: true });
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handScroll);
  }

  getHeadWidth = () => {
    const { isMobile, collapsed, setting } = this.props;
    const { fixedHeader, layout } = setting;
    if (isMobile || !fixedHeader || layout === 'topmenu') {
      return '100%';
    }
    return collapsed ? 'calc(100% - 80px)' : 'calc(100% - 256px)';
  };

  handleNoticeClear = type => {
    message.success(`清空了${type}`);
    const { dispatch } = this.props;
    dispatch({
      type: 'global/clearNotices',
      payload: type
    });
  };

  handleMenuClick = ({ key }) => {
    const { dispatch } = this.props;
    if (key === 'userCenter') {
      router.push('/account/center');
      return;
    }
    if (key === 'triggerError') {
      router.push('/exception/trigger');
      return;
    }
    if (key === 'userinfo') {
      router.push('/account/settings/base');
      return;
    }
    if (key === 'logout') {
      dispatch({
        type: 'user/logout'
      });
    }
  };

  handleNoticeVisibleChange = visible => {
    if (visible) {
      const { dispatch } = this.props;
      dispatch({
        type: 'global/fetchNotices'
      });
    }
  };

  handScroll = () => {
    const { autoHideHeader } = this.props;
    const { visible } = this.state;
    if (!autoHideHeader) {
      return;
    }
    const scrollTop = document.body.scrollTop + document.documentElement.scrollTop;
    if (!this.ticking) {
      requestAnimationFrame(() => {
        if (this.oldScrollTop > scrollTop) {
          this.setState({
            visible: true
          });
          this.scrollTop = scrollTop;
          return;
        }
        if (scrollTop > 300 && visible) {
          this.setState({
            visible: false
          });
        }
        if (scrollTop < 300 && !visible) {
          this.setState({
            visible: true
          });
        }
        this.oldScrollTop = scrollTop;
        this.ticking = false;
      });
    }
    this.ticking = false;
  };

  render() {
    const { isMobile, handleMenuCollapse, setting } = this.props;
    const { navTheme, layout, fixedHeader } = setting;
    const { visible } = this.state;
    const isTop = layout === 'topmenu';
    const width = this.getHeadWidth();

    const HeaderDom = visible ? (
      // 菜单可见
      <Header className={fixedHeader ? styles.fixedHeader : ''}
          style={{ padding: 0, width }}
      >
        {isTop && !isMobile ? (
          //顶部菜单模式或者移动设备
          <TopNavHeader
              Authorized={Authorized}
              mode="horizontal"
              onCollapse={handleMenuCollapse}
              onMenuClick={this.handleMenuClick}
              onNoticeClear={this.handleNoticeClear}
              onNoticeVisibleChange={this.handleNoticeVisibleChange}
              theme={navTheme}
              {...this.props}
          />
        ) : (
          //普通模式菜单
          <GlobalHeader
              onCollapse={handleMenuCollapse}
              onMenuClick={this.handleMenuClick}
              onNoticeClear={this.handleNoticeClear}
              onNoticeVisibleChange={this.handleNoticeVisibleChange}
              {...this.props}
          />
        )}
      </Header>
    ) : null;
    return (
      <Animate component=""
          transitionName="fade"
      >
        {HeaderDom}
      </Animate>
    );
  }
}

function map({ user, global, setting, loading }) {
  return {
    currentUser: user.currentUser,
    collapsed: global.collapsed,
    fetchingNotices: loading.effects['global/fetchNotices'],
    notices: global.notices,
    setting
  }
}
export default connect(map)(HeaderView);
