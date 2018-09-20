//基本布局 header content sidebar
import React from 'react';
import {Redirect, Switch, Route} from 'dva/router';
import DocumentTitle from 'react-document-title';
import {getRoutes} from '../utils/utils';
import Header from "../components/Common/Header"
import {connect} from "dva"

@connect((data) => {
  return data;
})
class DefaultLayout extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {routerData, match} = this.props;

    const layout = (
      <div>
        <Header {...this.props} />
        <Switch>
          {getRoutes(match.path, routerData).map(item => (
            <Route path={item.path} component={item.component} key={item.key}/>
          ))}
          <Redirect exact from="*" to='/data'/>
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
