import React, { Fragment } from 'react';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { Button, Row, Col, Icon, Steps, Card } from 'antd';
import Result from '@/components/Result';
import PageHeaderWrapper from '@/components/Global/PageHeaderWrapper';

const { Step } = Steps;

const desc1 = (
  <div
    style={{
      fontSize: 12,
      color: 'rgba(0, 0, 0, 0.45)',
      position: 'relative',
      left: 42,
      textAlign: 'left',
    }}
  >
    <div style={{ margin: '8px 0 4px' }}>
      <FormattedMessage
        defaultMessage="Qu Lili"
        id="app.result.success.step1-operator"
      />
      <Icon
        style={{ marginLeft: 8 }}
        type="dingding-o"
      />
    </div>
    <div>2016-12-12 12:32</div>
  </div>
);

const desc2 = (
  <div style={{ fontSize: 12, position: 'relative', left: 42 }}>
    <div style={{ margin: '8px 0 4px' }}>
      <FormattedMessage
        defaultMessage="Zhou Maomao"
        id="app.result.success.step2-operator"
      />
      <Icon
        style={{ color: '#00A0E9', marginLeft: 8 }}
        type="dingding-o"
      />
    </div>
    <div>
      <a href="">
        <FormattedMessage
          defaultMessage="Urge"
          id="app.result.success.step2-extra"
        />
      </a>
    </div>
  </div>
);

const extra = (
  <Fragment>
    <div
      style={{
        fontSize: 16,
        color: 'rgba(0, 0, 0, 0.85)',
        fontWeight: '500',
        marginBottom: 20,
      }}
    >
      <FormattedMessage
        defaultMessage="Project Name"
        id="app.result.success.operate-title"
      />
    </div>
    <Row style={{ marginBottom: 16 }}>
      <Col
        lg={12}
        md={12}
        sm={12}
        xl={6}
        xs={24}
      >
        <span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>
          <FormattedMessage
            defaultMessage="Project ID："
            id="app.result.success.operate-id"
          />
        </span>
        23421
      </Col>
      <Col
        lg={12}
        md={12}
        sm={12}
        xl={6}
        xs={24}
      >
        <span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>
          <FormattedMessage
            defaultMessage="Principal："
            id="app.result.success.principal"
          />
        </span>
        <FormattedMessage
          defaultMessage="Qu Lili"
          id="app.result.success.step1-operator"
        />
      </Col>
      <Col
        lg={24}
        md={24}
        sm={24}
        xl={12}
        xs={24}
      >
        <span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>
          <FormattedMessage
            defaultMessage="Effective time："
            id="app.result.success.operate-time"
          />
        </span>
        2016-12-12 ~ 2017-12-12
      </Col>
    </Row>
    <Steps
      current={1}
      progressDot
      style={{ marginLeft: -42, width: 'calc(100% + 84px)' }}
    >
      <Step
        description={desc1}
        title={
          <span style={{ fontSize: 14 }}>
            <FormattedMessage
              defaultMessage="Create project"
              id="app.result.success.step1-title"
            />
          </span>
        }
      />
      <Step
        description={desc2}
        title={
          <span style={{ fontSize: 14 }}>
            <FormattedMessage
              defaultMessage="Departmental preliminary review"
              id="app.result.success.step2-title"
            />
          </span>
        }
      />
      <Step
        title={
          <span style={{ fontSize: 14 }}>
            <FormattedMessage
              defaultMessage="Financial review"
              id="app.result.success.step3-title"
            />
          </span>
        }
      />
      <Step
        title={
          <span style={{ fontSize: 14 }}>
            <FormattedMessage
              defaultMessage="Finish"
              id="app.result.success.step4-title"
            />
          </span>
        }
      />
    </Steps>
  </Fragment>
);

const actions = (
  <Fragment>
    <Button type="primary">
      <FormattedMessage
        defaultMessage="Back to list"
        id="app.result.success.btn-return"
      />
    </Button>
    <Button>
      <FormattedMessage
        defaultMessage="View project"
        id="app.result.success.btn-project"
      />
    </Button>
    <Button>
      <FormattedMessage
        defaultMessage="Print"
        id="app.result.success.btn-print"
      />
    </Button>
  </Fragment>
);

export default () => (
  <PageHeaderWrapper>
    <Card bordered={false}>
      <Result
        actions={actions}
        description={formatMessage({ id: 'app.result.success.description' })}
        extra={extra}
        style={{ marginTop: 48, marginBottom: 16 }}
        title={formatMessage({ id: 'app.result.success.title' })}
        type="success"
      />
    </Card>
  </PageHeaderWrapper>
);
