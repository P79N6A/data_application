/**
 * @author tangquankun
 * @description 数据采集布局页面
 */
import React, {Component} from 'react';
import { Link, Redirect, Switch, Route } from 'dva/router';
import DocumentTitle from 'react-document-title';
import { Layout, Menu } from 'antd';
import { getRoutes } from 'utils/utils';
import HzMenu from 'components/Common/Menu'
const { Content } = Layout;
class DataCollect extends Component {
  render() {
    const { routerData, match, location, } = this.props;
    console.log(getRoutes(match.path, routerData))
    return (
      <div>
        <Content>
          <HzMenu {...this.props}></HzMenu>
          <Switch>
            {getRoutes(match.path, routerData).map((item, index) => {
              return (<Route path={item.path} component={item.component} key={item.key} />)
            })}
            <Redirect exact from='/collect' to='/collect/list'/>
          </Switch>
        </Content>
      </div>
    );
  }
}

export default DataCollect;
