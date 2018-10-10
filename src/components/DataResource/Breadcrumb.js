import React, { Component } from 'react';
import { formatMessage } from 'umi/locale';
import pathToRegexp from 'path-to-regexp';
import { urlToList } from '../_utils/pathTools';


class Breadcrumb extends Component {
  /**
   * 将参数转化为面包屑
   * Convert parameters into breadcrumbs
   */
  conversionBreadcrumbList = () => {
    const { breadcrumbList, breadcrumbSeparator } = this.props;
    const { routes, params, routerLocation, breadcrumbNameMap } = this.getBreadcrumbProps();
    debugger;
    if (breadcrumbList && breadcrumbList.length) {
      return this.conversionFromProps();
    }
    // 如果传入 routes 和 params 属性
    if (routes && params) {
      return (
        <Breadcrumb
          className={styles.breadcrumb}
          itemRender={this.itemRender}
          params={params}
          routes={routes.filter(route => route.breadcrumbName)}
          separator={breadcrumbSeparator}
        />
      );
    }
    // 根据 location 生成 面包屑
    if (routerLocation && routerLocation.pathname) {
      return this.conversionFromLocation(routerLocation, breadcrumbNameMap);
    }
    return null;
  };

  render() {
    return (
      <span>
        <a href="#">主页 </a> / <a href="#"> 服务管理</a>
      </span>
    );
  }
}

export default Breadcrumb;
