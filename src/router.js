import React from 'react';
import {routerRedux, Route, Switch} from 'dva/router';
import {LocaleProvider} from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import {getRouterData} from './common/router';

const {ConnectedRouter} = routerRedux;

function RouterConfig({history, app}) {
  const routerData = getRouterData(app);
  const DefaultLayout = routerData['/'].component;//基础布局
  return (
    <LocaleProvider locale={zhCN}>


      <ConnectedRouter history={history}>
        <Switch>
          <Route render={props => <DefaultLayout {...props} />} path="/"/>
        </Switch>
      </ConnectedRouter>
    </LocaleProvider>
  );
}

export default RouterConfig;
