import React from 'react';
import { Avatar, List } from 'antd';
import classNames from 'classnames';
import styles from './NoticeList.less';

export default function NoticeList({
  data = [],
  onClick,
  onClear,
  title,
  locale,
  emptyText,
  emptyImage,
                                     showClear = true,
}) {
  if (data.length === 0) {
    return (
      <div className={styles.notFound}>
        {emptyImage ? <img alt="not found"
                           src={emptyImage}
        /> : null}
        <div>{emptyText || locale.emptyText}</div>
      </div>
    );
  }
  return (
    <div>
      <List className={styles.list}>
        {data.map((item, i) => {
          const itemCls = classNames(styles.item, {
            [styles.read]: item.read,
          });
          // eslint-disable-next-line no-nested-ternary
          const leftIcon = item.avatar ? (
            typeof item.avatar === 'string' ? (
              <Avatar className={styles.avatar}
                      src={item.avatar}
              />
            ) : (
              item.avatar
            )
          ) : null;

          return (
            <List.Item className={itemCls}
                       key={item.key || i}
                       onClick={() => onClick(item)}
            >
              <List.Item.Meta
                avatar={<span className={styles.iconElement}>{leftIcon}</span>}
                className={styles.meta}
                description={
                  <div>
                    <div className={styles.description}
                         title={item.description}
                    >
                      {item.description}
                    </div>
                    <div className={styles.datetime}>{item.datetime}</div>
                  </div>
                }
                title={
                  <div className={styles.title}>
                    {item.title}
                    <div className={styles.extra}>{item.extra}</div>
                  </div>
                }
              />
            </List.Item>
          );
        })}
      </List>
      {showClear ? (
        <div className={styles.clear}
             onClick={onClear}
        >
          {locale.clear}
          {title}
        </div>
      ) : null}
    </div>
  );
}
