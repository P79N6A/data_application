import React, { PureComponent } from 'react'
import { Button } from 'antd'
import style from './index.less'
import BaseModal from '@/components/DataResource/Modal/BaseModal'
import Detail from './Detail'

class Catalogs extends PureComponent{
  constructor(props) {
    super(props)
    this.state={
      modal:{
        modalTitle:'服务主题详情',
        modalVisible:false,
        modalContent:{},
        width: '1200px',
      },
    }
  }

  detail = () => {
    this.setState({
      modal:{
        modalVisible:true,
        children: <Detail />,
        width: '800px',
        modalTitle:'服务主题详情',
      },
    })
  }

  // 点击隐藏详情
  handleCancel = () => {
    this.setState({
      modal:{
        modalVisible:false,
      },
    })
  }

  render() {
    const {catalog} = this.props
    const {modal={}}=this.state;
    return (
      <div>
        <BaseModal
          {...modal}
          handleModalCancel={this.handleCancel}
        />
        <div style={{width: '100%', height: '100%'}}>
          <div className={style.container}>
            <img src={catalog.image} className={style.image} />
            <h1>{catalog.name}</h1>
            <div className={style.items}>
              <span>创建时间</span>
              <span>{catalog.time}</span>
            </div>
            <div className={style.items}>
              <span>资源类型</span>
              <span>{catalog.type}</span>
            </div>
            <div className={style.items}>
              <span>业务域</span>
              <span>{catalog.buses}</span>
            </div>
            <div className={style['cat-buton']}>
              <Button type="primary" onClick={this.detail}>详情</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Catalogs
