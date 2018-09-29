import React, { Fragment } from 'react';
import { Layout, Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';
import logo from '../assets/logo.png';

const { Footer } = Layout;
const FooterView = () => (
  <Footer style={{ padding: 0 }}>
    <GlobalFooter
      links={[
        {
          key: '首页',
          title: '首页',
          href: '/',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <img src={logo} alt="logo"/>,
          href: 'http://www.cqga.gov.cn/',
          blankTarget: true,
        },
        {
          key: '紫光华智',
          title: '紫光华智',
          href: 'http://www.unigroup.com.cn/',
          blankTarget: true,
        },
      ]}
      copyright={
        <Fragment>
          Copyright <Icon type="copyright"/> 2018 紫光华智智慧社区
        </Fragment>
      }
    />
  </Footer>
);
export default FooterView;
