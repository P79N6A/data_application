//基本布局 header content sidebar
import React from 'react';
import {Redirect, Switch, Route} from 'dva/router';
import DocumentTitle from 'react-document-title';
import {getRoutes} from '../utils/utils';
import Header from '../components/Common/Header'
import {connect} from 'dva'

@connect((data) => {
  return data;
})
class DefaultLayout extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {routerData, match} = this.props;
    const style = {
      display: 'flex',
      height: '100%',
      flexDirection: 'column'
    }
    const layout = (
      <div style={style}>
        <Header {...this.props} />
        <Switch>
          <Redirect exact from="/resource" to="/resource/list"/>
          {getRoutes(match.path, routerData).map(item => (
            <Route component={item.component} key={item.key} path={item.path}/>
          ))}
        </Switch>
      </div>
    );

    return (
      <DocumentTitle title="智慧安防应用">
        {layout}
      </DocumentTitle>
    );
  }
}

export default DefaultLayout;
