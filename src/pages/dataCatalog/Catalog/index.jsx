import React, { PureComponent } from 'react'
import { Pagination } from 'antd';
import Catalogs from './Catalogs'
import style from './index.less'
import Search from './Search'
import TreeComponent from '@/components/Common/Tree'

const datas = [
  {
    name: '政府办事主题',
    image: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2573135318,1530599430&fm=26&gp=0.jpg',
    time: '2018-6-18',
    type: '资源库',
    buses: '安防',
  },
  {
    name: '校园服务主题',
    image: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2573135318,1530599430&fm=26&gp=0.jpg',
    time: '2018-6-18',
    type: '资源库',
    buses: '安防',
  },
  {
    name: '产业园区主题',
    image: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2573135318,1530599430&fm=26&gp=0.jpg',
    time: '2018-6-18',
    type: '资源库',
    buses: '安防',
  }, 
  {
    name: '签约单位主题',
    image: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2573135318,1530599430&fm=26&gp=0.jpg',
    time: '2018-6-18',
    type: '资源库',
    buses: '安防',
  },
  {
    name: '社区警务主题',
    image: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2573135318,1530599430&fm=26&gp=0.jpg',
    time: '2018-6-18',
    type: '资源库',
    buses: '安防',
  },
  {
    name: '综治服务主题',
    image: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2573135318,1530599430&fm=26&gp=0.jpg',
    time: '2018-6-18',
    type: '资源库',
    buses: '安防',
  },
  {
    name: '滴滴服务主题',
    image: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2573135318,1530599430&fm=26&gp=0.jpg',
    time: '2018-6-18',
    type: '资源库',
    buses: '安防',
  },
  {
    name: '信贷服务主题',
    image: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2573135318,1530599430&fm=26&gp=0.jpg',
    time: '2018-6-18',
    type: '资源库',
    buses: '安防',
  },
]
const pagination = {
  total: 8,
  defaultCurrent: 1,
  pageSize: 10,
  showQuickJumper: true,
  pageSizeOptions: ['10', '20', '30', '40'],
  showSizeChanger: true,
  showTotal: (total) => {
    return `共${total}条`
  },
}
class Catalog extends PureComponent{
  render() {
    return (
      <div className={style.container}>
        <div className={style.tree}>
          <TreeComponent />
        </div>
        <div className={style.lists}>
          <div className={style.search}><Search /></div>
          <div className={style.items}>
            {
              datas.map((item, index) => {
                return (
                  <div key={index} className={style.item}>
                    <Catalogs catalog={item} />
                  </div>
                )
              })
            }
          </div>
          <div className={style.pagination}>
            <Pagination {...pagination} />
          </div>
        </div>
      </div>
    )
  }
}
export default Catalog
