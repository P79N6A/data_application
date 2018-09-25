/**
 * @author tangquankun
 * @description 数据采集布局页面
 */
import React, {Component} from 'react';
import { Redirect, Switch, Route } from 'dva/router';
import { Layout } from 'antd';
import { getRoutes } from 'utils/utils';
import HzMenu from 'components/Common/Menu'
const { Content } = Layout;
class DataCollect extends Component {
  render() {
    const { routerData, match } = this.props;
    return (
      <div style={{flex: 1}}>
        <Content style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
          <HzMenu {...this.props}></HzMenu>
          <Switch>
            {getRoutes(match.path, routerData).map((item) => {
              return (<Route component={item.component}
                  key={item.key}
                  path={item.path}
                      />)
            })}
            <Redirect exact
                from="/collect"
                to="/collect/resources"
            />
          </Switch>
        </Content>
      </div>
    );
  }
}

export default DataCollect;
