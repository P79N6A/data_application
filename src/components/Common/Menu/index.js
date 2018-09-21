/**
 * @author tangquankun
 * @description 所有二级路由的导航栏
 */
import React, {Component} from 'react';
import { Menu } from 'antd';
import { getRoutes } from 'utils/utils';
import {Link} from 'dva/router';
class HzMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current: getRoutes(props.match.path, props.routerData)[0].path
    }
  }
  hanleClick = (e) => {
    this.setState({
      current: e.key
    })
  }
  render() {
    const { routerData, match, location, } = this.props;
    return (
      <Menu mode="horizontal" defaultSelectedKeys={[this.state.current]}>
        { getRoutes(match.path, routerData).map((item, index) => {
          return (
          <Menu.Item key={item.path}>
            <Link to={item.path}>
              <span>{item.name}</span>
            </Link>
           </Menu.Item>
          )
        })}
      </Menu>
    )
  }
}
export default HzMenu