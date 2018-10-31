import React, { PureComponent } from 'react'
import { Layout } from 'antd';
const { Sider } = Layout;
class LeftSider extends PureComponent {
  render() {
    return(
      <Sider>        
        <div>
          测试
        </div>
      </Sider>
    )
  }   
}
export default LeftSider
