import React, { PureComponent } from 'react';
import { Button, message } from 'antd';
import { connect } from 'dva';

import style from './index.less';
import Table from '../../../Common/Table/1.0';

const columns = [
  {
    title: '时间',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: '用户',
    dataIndex: 'user',
    key: 'user',
  },
  {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '消息',
    dataIndex: 'info',
    key: 'info',
  },
];

class ProjectLog extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      logArr: [],
    };
  }

  _handlePromise = () => {
    return this.props.dispatch({
      type: 'project/getProjectLog',
      payload: {}
    });
  };

  getLogData = () => {
    this.props.dispatch({
      type: 'project/getProjectLog'
    }).then((res) => {
      if (res.isSuccess) {
        this.setState({ logArr: res.data });
        message.success(res.msg);
      }
      else {
        message.error(res.msg);
      }
    })
  };

  // _handlePromise = () => {
  //   let data=[];
  //   for(let i=0;i<20;i++){
  //     data.push({
  //       key:i,
  //       time:"2018-10-31 "+i+":00:00",
  //       user:'老'+i,
  //       type:i*i,
  //       info:"random: "+i
  //     })
  //   }
  //   return new Promise((resolve)=> {
  //     setTimeout(() => {
  //       resolve({
  //         res:{
  //           data:data,
  //         },
  //         isSuccess:true,
  //       })
  //     }, 1000 * 0.3);
  //   });
  // };

  _renderContent = (data) => {
    if (data) {
      return (
        <Table
          antdTableProps={{
            rowSelection: null,
            bordered: true,
          }}
          HeaderExtend={(props) => {
            return (
              <>
                <span>日志</span>
                <Button onClick={()=>props.searchFilterFn()} style={{ marginLeft: '90vh' }}>刷新</Button>
              </>
            );
          }}
          showQuickJumper={false}
          showSizeChanger={false}
          getFn={this._handlePromise}
          columnsArr={columns}
          hasSearch={false}
        />
      );
    }
    else {
      return (
        <div className={style.noContent}>
          <h2>没有日志</h2>
          <p>该项目没有日志</p>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        {this._renderContent([1, 2, 3])}
      </div>
    );
  }
}

export default connect()(ProjectLog);
