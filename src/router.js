import React from 'react';
import {routerRedux, Route, Switch} from 'dva/router';
import {LocaleProvider} from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import {getRouterData} from './common/router';
import Login from './components/Login'

const {ConnectedRouter} = routerRedux;

function RouterConfig({history, app}) {
  const routerData = getRouterData(app);
  const DefaultLayout = routerData['/'].component;//基础布局
  return (
    <LocaleProvider locale={zhCN}>


      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/login" render={props => <Login {...props} />}/>
          <Route path="/" render={props => <DefaultLayout {...props} />}/>
        </Switch>
      </ConnectedRouter>
    </LocaleProvider>
  );
}

export default RouterConfig;
