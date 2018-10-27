import React, { PureComponent } from 'react'
import { Row, Col } from 'antd';
import Item from './item'
import HZbar from './Bar'
const first = [
  {
    title: '创建时间',
    value: '2018-6-18'
  },
  {
    title: '创建者',
    value: 'admin'
  },
  {
    title: '累计访问量',
    value: '846'
  }
]
const second = [
  {
    title: '最近更新时间',
    value: '2018-6-25'
  },
  {
    title: '包含数据表',
    value: '9张'
  },
  {
    title: '总数据量',
    value: '16656.MB'
  }
]
class BaseInfo extends PureComponent{
  render() {
    return(
      <div>
        <Row>
          {first.map(item => {
            return(
              <Col span={8} key={item.title}>
                <Item info={item}></Item>
              </Col>
            )
          })}
        </Row>
        <Row style={{marginTop: '15px'}}>
          {second.map(item => {
            return(
              <Col span={8} key={item.title}>
                <Item info={item}></Item>
              </Col>
            )
          })}
        </Row>
        <Row style={{marginTop: '15px'}}>
          <Col span={24}>
            <HZbar></HZbar>
          </Col>
        </Row>
      </div>
    )
  }
}
export default BaseInfo
