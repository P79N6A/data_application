/* eslint-disable no-debugger */
import React from 'react';
import { Layout } from 'antd';
import DocumentTitle from 'react-document-title';
import isEqual from 'lodash/isEqual';
import memoizeOne from 'memoize-one';
import { connect } from 'dva';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import pathToRegexp from 'path-to-regexp';
import { enquireScreen, unenquireScreen } from 'enquire-js';
import { formatMessage } from 'umi/locale';
import SiderMenu from '@/components/Global/SiderMenu';
import LeftSider from './LeftSider'
import Authorized from '@/utils/Authorized';
import SettingDrawer from '@/components/Global/SettingDrawer';
import Redirect from 'umi/redirect';
import logo from '../assets/logo.png';
import Footer from './Footer';
import Header from './Header';
import Context from './MenuContext';
import Exception403 from '../pages/Exception/403';

const { Content } = Layout;

// 将路由转换为侧边菜单
function formatter(data, parentPath = '', parentAuthority, parentName) {
  const res = data.map(item => {
    let locale = 'menu';
    if (parentName && item.name) {
      locale = `${parentName}.${item.name}`;
    } else if (item.name) {
      locale = `menu.${item.name}`;
    } else if (parentName) {
      locale = parentName;
    }
    const result = {
      ...item,
      locale,
      authority: item.authority || parentAuthority,
    };
    if (item.routes) {
      const children = formatter(item.routes, `${parentPath}${item.path}/`, item.authority, locale);
      // 释放内存
      result.children = children;
    }
    delete result.routes;
    if (result.path && (result.path.includes('result') || result.path.includes('exception'))) {
      return;
    }
    return result;
  });
  return res.filter((v) => (v));
}

const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
    maxWidth: 1599,
  },
  'screen-xxl': {
    minWidth: 1600,
  },
};

class BasicLayout extends React.PureComponent {
  constructor(props) {
    super(props);
    this.getPageTitle = memoizeOne(this.getPageTitle);
    this.getBreadcrumbNameMap = memoizeOne(this.getBreadcrumbNameMap, isEqual);
    this.breadcrumbNameMap = this.getBreadcrumbNameMap();
    this.matchParamsPath = memoizeOne(this.matchParamsPath, isEqual);
  }

  state = {
    rendering: true,
    isMobile: false,
    err: false,
    errState: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/fetchCurrent',
    });
    dispatch({
      type: 'setting/getSetting',
    });

    dispatch({
      type:'global/getCatalog',
    });
    // 下次渲染时改变，提高性能
    this.renderRef = requestAnimationFrame(() => {
      this.setState({
        rendering: false,
      });
    });
    this.enquireHandler = enquireScreen(mobile => {
      const { isMobile } = this.state;
      if (isMobile !== mobile) {
        this.setState({
          isMobile: mobile,
        });
      }
    });
  }

  componentDidUpdate(preProps) {
    // After changing to phone mode,
    // if collapsed is true, you need to click twice to display
    this.breadcrumbNameMap = this.getBreadcrumbNameMap();
    const { isMobile } = this.state;
    const { collapsed } = this.props;
    // this.handleMenuCollapse(false)
    if (isMobile && !preProps.isMobile && !collapsed) {
      this.handleMenuCollapse(false);
    }
  }

  componentDidCatch(err, info) {
    // console.log('+++++++++++++++++++++++++++++++++++++++++++++');
    this.setState({ err: true, errState: { err, info } });
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.renderRef);
    unenquireScreen(this.enquireHandler);
  }

  getContext() {
    const { location } = this.props;
    return {
      location,
      breadcrumbNameMap: this.breadcrumbNameMap,
    };
  }

  getMenuData() {
    const {
      route: { routes },
    } = this.props;

    return formatter(routes);
  }

  /**
   * 获取面包屑映射
   * @param {Object} menuData 菜单配置
   */
  getBreadcrumbNameMap() {
    const routerMap = {};
    const mergeMenuAndRouter = data => {
      data.forEach(menuItem => {
        if (menuItem.children) {
          mergeMenuAndRouter(menuItem.children);
        }
        // Reduce memory usage
        routerMap[menuItem.path] = menuItem;
      });
    };
    mergeMenuAndRouter(this.getMenuData());
    return routerMap;
  }

  matchParamsPath = pathname => {
    const pathKey = Object.keys(this.breadcrumbNameMap).find(key =>
      pathToRegexp(key).test(pathname)
    );
    return this.breadcrumbNameMap[pathKey];
  };

  getPageTitle = pathname => {
    const currRouterData = this.matchParamsPath(pathname);

    if (!currRouterData) {
      return '紫光华智';
    }
    const message = formatMessage({
      id: currRouterData.locale || currRouterData.name,
      defaultMessage: currRouterData.name,
    });
    return `${message} - 紫光华智`;
  };

  // getLayoutStyle = () => {
  //   const { isMobile } = this.state;
  //   const { fixSiderbar, collapsed, layout } = this.props;
  //   if (fixSiderbar && layout !== 'topmenu' && !isMobile) {
  //     return {
  //       paddingLeft: collapsed ? '80px' : '256px',
  //     };
  //   }
  //   return null;
  // };

  getContentStyle = () => {
    const { fixedHeader } = this.props;
    return {
      margin: '10px 10px 0',
      paddingTop: fixedHeader ? 60 : 0,
      overflowY: 'scroll'
    };
  };

  // 收起菜单
  handleMenuCollapse = collapsed => {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: collapsed,
    });
  };

  renderSettingDrawer() {
    const { rendering } = this.state;
    if ((rendering || process.env.NODE_ENV === 'production') && APP_TYPE !== 'site') {
      return null;
    }
    return <SettingDrawer />;
  }

  render() {
    const {
      navTheme,
      layout: PropsLayout,
      children,
      location: { pathname },
    } = this.props;
    const { isMobile } = this.state;
    const isTop = PropsLayout === 'topmenu';
    const menuData = this.getMenuData();
    const routerConfig = this.matchParamsPath(pathname);
    const layout = (
      <Layout style={{width:'100%', height: '100%'}}>
        <Header
          handleMenuCollapse={this.handleMenuCollapse}
          isMobile={isMobile}
          logo={logo}
          menuData={menuData}
          {...this.props}
          style={{width:'100%'}}
        />
        <Layout
          style={{flexDirection: 'row'}}
        >
          {isTop && !isMobile ? null : (
            <LeftSider
              Authorized={Authorized}
              isMobile={isMobile}
              logo={logo}
              menuData={menuData}
              onCollapse={this.handleMenuCollapse}
              theme={navTheme}
              {...this.props}
            />
          )}
          <Content>
            <Authorized
              authority={routerConfig.authority}
              noMatch={<Exception403 />}
            >
              {children}
            </Authorized>
          </Content>
          {/* <Footer/> */}
        </Layout>
      </Layout>
    );

    if (this.state.err) {
      return <Redirect to="/exception/404" />;
    }
    return (
      <React.Fragment>
        <DocumentTitle title={this.getPageTitle(pathname)}>
          <ContainerQuery style={{overflow:'hidden'}} query={query}>
            {params => (
              <Context.Provider value={this.getContext()}>
                <div className={classNames(params)}>{layout}</div>
              </Context.Provider>
            )}
          </ContainerQuery>
        </DocumentTitle>
        {/*{this.renderSettingDrawer()}*/}
      </React.Fragment>
    );
  }
}

export default connect(({ global, setting }) => ({
  collapsed: global.collapsed,
  layout: setting.layout,
  ...setting,
}))(BasicLayout);
