import React, { PureComponent } from 'react'
import style from './index.less'
class Item extends PureComponent{
  constructor(props) {
    super(props)
  }
  render() {
    const {info} = this.props
    return(
      <div>
          <div className={style['container']}>
              <span>{info.title}</span>
              <span>{info.value}</span>
          </div>
      </div>
    )
  }
}
export default Item
