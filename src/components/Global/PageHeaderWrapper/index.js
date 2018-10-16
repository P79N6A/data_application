import React from 'react';
import { FormattedMessage } from 'umi/locale';
import Link from 'umi/link';
import PageHeader from '@/components/Global/PageHeader';
import { connect } from 'dva';
import GridContent from './GridContent';
import styles from './index.less';
import MenuContext from '@/layouts/MenuContext';

const PageHeaderWrapper = ({ children, contentWidth, wrapperClassName, top, ...restProps }) => (
  <div className={wrapperClassName}
      style={{ margin: '-24px -24px 0' }}
  >
    {top}
    <MenuContext.Consumer>
      {value => (
        <PageHeader
            home={<FormattedMessage defaultMessage="Home"
                id="menu.home"
                  />}
            wide={contentWidth === 'Fixed'}
            {...value}
            key="pageheader"
            {...restProps}
            itemRender={item => {
            if (item.locale) {
              return <FormattedMessage defaultMessage={item.name}
                  id={item.locale}
                     />;
            }
            return item.name;
          }}
            linkElement={Link}
        />
      )}
    </MenuContext.Consumer>
    {children ? (
      <div className={styles.content}>
        <GridContent>{children}</GridContent>
      </div>
    ) : null}
  </div>
);

export default connect(({ setting }) => ({
  contentWidth: setting.contentWidth
}))(PageHeaderWrapper);
