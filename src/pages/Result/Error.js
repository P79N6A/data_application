import React, { Fragment } from 'react';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { Button, Icon, Card } from 'antd';
import Result from '@/components/Result';
import PageHeaderWrapper from '@/components/Global/PageHeaderWrapper';

const extra = (
  <Fragment>
    <div
      style={{
        fontSize: 16,
        color: 'rgba(0, 0, 0, 0.85)',
        fontWeight: '500',
        marginBottom: 16,
      }}
    >
      <FormattedMessage
        defaultMessage="The content you submitted has the following error:"
        id="app.result.error.hint-title"
      />
    </div>
    <div style={{ marginBottom: 16 }}>
      <Icon
        style={{ color: '#f5222d', marginRight: 8 }}
        type="close-circle-o"
      />
      <FormattedMessage
        defaultMessage="Your account has been frozen"
        id="app.result.error.hint-text1"
      />
      <a style={{ marginLeft: 16 }}>
        <FormattedMessage
          defaultMessage="Thaw immediately"
          id="app.result.error.hint-btn1"
        />
        <Icon type="right" />
      </a>
    </div>
    <div>
      <Icon
        style={{ color: '#f5222d', marginRight: 8 }}
        type="close-circle-o"
      />
      <FormattedMessage
        defaultMessage="Your account is not yet eligible to apply"
        id="app.result.error.hint-text2"
      />
      <a style={{ marginLeft: 16 }}>
        <FormattedMessage
          defaultMessage="Upgrade immediately"
          id="app.result.error.hint-btn2"
        />
        <Icon type="right" />
      </a>
    </div>
  </Fragment>
);

const actions = (
  <Button type="primary">
    <FormattedMessage
      defaultMessage="Return to modify"
      id="app.result.error.btn-text"
    />
  </Button>
);

export default () => (
  <PageHeaderWrapper>
    <Card bordered={false}>
      <Result
        actions={actions}
        description={formatMessage({ id: 'app.result.error.description' })}
        extra={extra}
        style={{ marginTop: 48, marginBottom: 16 }}
        title={formatMessage({ id: 'app.result.error.title' })}
        type="error"
      />
    </Card>
  </PageHeaderWrapper>
);
