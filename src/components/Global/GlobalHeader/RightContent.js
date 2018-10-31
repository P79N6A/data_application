import React, { PureComponent } from 'react';
import { FormattedMessage, setLocale, getLocale } from 'umi/locale';
import { Spin, Tag, Menu, Icon, Dropdown, Avatar, Tooltip, Button } from 'antd';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import Redirect from 'umi/redirect';
import NoticeIcon from '../NoticeIcon';
import HeaderSearch from '../HeaderSearch/index';
import styles from './index.less';
import avatar from '../../../assets/avatar.png'

export default class GlobalHeaderRight extends PureComponent {
  getNoticeData() {
    const { notices = [] } = this.props;
    if (notices.length === 0) {
      return {};
    }
    const newNotices = notices.map(notice => {
      const newNotice = { ...notice };
      if (newNotice.datetime) {
        newNotice.datetime = moment(notice.datetime).fromNow();
      }
      if (newNotice.id) {
        newNotice.key = newNotice.id;
      }
      if (newNotice.extra && newNotice.status) {
        const color = {
          todo: '',
          processing: 'blue',
          urgent: 'red',
          doing: 'gold',
        }[newNotice.status];
        newNotice.extra = (
          <Tag
            color={color}
            style={{ marginRight: 0 }}
          >
            {newNotice.extra}
          </Tag>
        );
      }
      return newNotice;
    });
    return groupBy(newNotices, 'type');
  }

  changLang = () => {
    const locale = getLocale();
    if (!locale || locale === 'zh-CN') {
      setLocale('en-US');
    } else {
      setLocale('zh-CN');
    }
  };

  render() {
    const {
      currentUser,
      fetchingNotices,
      onNoticeVisibleChange,
      onMenuClick,
      onNoticeClear,
      theme,
    } = this.props;
    const menu = (
      <Menu
        className={styles.menu}
        onClick={onMenuClick}
        selectedKeys={[]}
      >
        <Menu.Item key="userCenter">
          <Icon type="user" />
          <FormattedMessage
            defaultMessage="account center"
            id="menu.account.center"
          />
        </Menu.Item>
        <Menu.Item key="userinfo">
          <Icon type="setting" />
          <FormattedMessage
            defaultMessage="account settings"
            id="menu.account.settings"
          />
        </Menu.Item>
        <Menu.Item key="triggerError">
          <Icon type="close-circle" />
          <FormattedMessage
            defaultMessage="Trigger Error"
            id="menu.account.trigger"
          />
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout">
          <Icon type="logout" />
          <FormattedMessage
            defaultMessage="logout"
            id="menu.account.logout"
          />
        </Menu.Item>
      </Menu>
    );
    const noticeData = this.getNoticeData();
    let className = styles.right;
    if (theme === 'dark') {
      className = `${styles.right}  ${styles.dark}`;
    }
    return (
      <div className={className}>
        {/*<HeaderSearch
          className={`${styles.action} ${styles.search}`}
          dataSource={['搜索提示一', '搜索提示二', '搜索提示三']}
          onPressEnter={value => {
            console.log('enter', value); // eslint-disable-line
          }}
          onSearch={value => {
            console.log('input', value); // eslint-disable-line
          }}
          placeholder="站内搜索"
        />*/}
        <NoticeIcon
          className={styles.action}
          count={currentUser.notifyCount}
          loading={fetchingNotices}
          onClear={onNoticeClear}
          onItemClick={(item, tabProps) => {
            console.log(item, tabProps); // eslint-disable-line
          }}
          onPopupVisibleChange={onNoticeVisibleChange}
          popupAlign={{ offset: [20, -16] }}
        >
          <NoticeIcon.Tab
            emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
            emptyText="你已查看所有通知"
            list={noticeData['通知']}
            title="通知"
          />
          <NoticeIcon.Tab
            emptyImage="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
            emptyText="您已读完所有消息"
            list={noticeData['消息']}
            title="消息"
          />
          <NoticeIcon.Tab
            emptyImage="https://gw.alipayobjects.com/zos/rmsportal/HsIsxMZiWKrNUavQUXqx.svg"
            emptyText="你已完成所有待办"
            list={noticeData['待办']}
            title="待办"
          />
        </NoticeIcon>
        {currentUser.userName ? (
          <Dropdown overlay={menu}>
            <span className={`${styles.action} ${styles.account}`}>
              <Avatar
                alt="avatar"
                className={styles.avatar}
                size="small"
                src={avatar}
              />
              <span className={styles.name}>{currentUser.userName?currentUser.userName:'admin'}</span>
            </span>
          </Dropdown>
        ) : (
          <Spin size="small" />
        )}
      </div>
    );
  }
}
