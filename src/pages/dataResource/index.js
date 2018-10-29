/**
 * @author tangquankun
 * @description 数据采集布局页面
 */
import React, { Component } from 'react';
import { Redirect, Switch, Route } from 'dva/router';
import { Layout } from 'antd';
import { getRoutes } from '../../utils/utils';
import HzMenu from '../../components/Common/Menu';

const { Content } = Layout;

class DataCollect extends Component {
  render() {
    const { routerData, match } = this.props;
    console.log(getRoutes(match.path, routerData));
    return (
      <div>
        <Content>
          <HzMenu {...this.props} />
          <Switch>
            {getRoutes(match.path, routerData).map(item => (
              <Route
                component={item.component}
                key={item.key}
                path={item.path}
              />
            ))}
            <Redirect
              exact
              from="/collect"
              to="/collect/list"
            />
          </Switch>
        </Content>
      </div>
    );
  }
}

export default DataCollect;
