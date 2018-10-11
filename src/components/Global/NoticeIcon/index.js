import React, { PureComponent } from 'react';
import { Popover, Icon, Tabs, Badge, Spin } from 'antd';
import classNames from 'classnames';
import List from './NoticeList';
import styles from './index.less';

const { TabPane } = Tabs;

export default class NoticeIcon extends PureComponent {
  static Tab = TabPane;

  static defaultProps = {
    onItemClick: () => {},
    onPopupVisibleChange: () => {},
    onTabChange: () => {},
    onClear: () => {},
    loading: false,
    locale: {
      emptyText: '暂无数据',
      clear: '清空',
    },
    emptyImage: 'https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg',
  };

  onItemClick = (item, tabProps) => {
    const { onItemClick } = this.props;
    onItemClick(item, tabProps);
  };

  onTabChange = tabType => {
    const { onTabChange } = this.props;
    onTabChange(tabType);
  };

  getNotificationBox() {
    const { children, loading, locale, onClear } = this.props;
    if (!children) {
      return null;
    }
    const panes = React.Children.map(children, child => {
      const title =
        child.props.list && child.props.list.length > 0
          ? `${child.props.title} (${child.props.list.length})`
          : child.props.title;
      return (
        <TabPane key={child.props.title}
                 tab={title}
        >
          <List
            {...child.props}
            data={child.props.list}
            locale={locale}
            onClear={() => onClear(child.props.title)}
            onClick={item => this.onItemClick(item, child.props)}
            title={child.props.title}
          />
        </TabPane>
      );
    });
    return (
      <Spin delay={0}
            spinning={loading}
      >
        <Tabs className={styles.tabs}
              onChange={this.onTabChange}
        >
          {panes}
        </Tabs>
      </Spin>
    );
  }

  render() {
    const { className, count, popupAlign, popupVisible, onPopupVisibleChange, bell } = this.props;
    const noticeButtonClass = classNames(className, styles.noticeButton);
    const notificationBox = this.getNotificationBox();
    const NoticeBellIcon = bell || <Icon className={styles.icon}
                                         type="bell"
    />;
    const trigger = (
      <span className={noticeButtonClass}>
        <Badge className={styles.badge}
               count={count}
               style={{ boxShadow: 'none' }}
        >
          {NoticeBellIcon}
        </Badge>
      </span>
    );
    if (!notificationBox) {
      return trigger;
    }
    const popoverProps = {};
    if ('popupVisible' in this.props) {
      popoverProps.visible = popupVisible;
    }
    return (
      <Popover
        arrowPointAtCenter
        content={notificationBox}
        onVisibleChange={onPopupVisibleChange}
        placement="bottomRight"
        popupAlign={popupAlign}
        popupClassName={styles.popover}
        trigger="click"
        {...popoverProps}
      >
        {trigger}
      </Popover>
    );
  }
}
