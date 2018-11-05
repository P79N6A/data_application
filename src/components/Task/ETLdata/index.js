import React, {PureComponent} from 'react';

import Header from '../Header';
import Table from "@/components/Common/Table/1.0";
import Search from "../Search";

class ETLdata extends PureComponent {
  constructor() {
    super();
    this.state={
      columns:[
        {
          title: "ID",
          dataIndex: 'id',
          key: "id",
        },{
          title: "连接名称",
          dataIndex: 'name',
          key: 'name',
        },{
          title: "数据库类型",
          dataIndex: 'type',
          key: 'type',
        },{
          title: "描述信息",
          dataIndex: 'description',
          key: "description",
        },{
          title: "创建用户",
          dataIndex: 'user',
          key: "user",
        },{
          title: "创建日期",
          dataIndex: 'time',
          key: "time",
        }
      ],
      moreFnArr : [
        {
          key: "edit",
          title: "编辑"
        },
      ]
    }
  }

  _handlePromise = () => {
    let data = [];
    let d = new Date().toLocaleTimeString();
    for(let i=1;i<100;i++){
      data.push({
        id:i,
        name:i,
        description:"全市扫黄打黑第"+i+"阶段",
        user:"周队长",
        time:d
      })
    }
    return new Promise((resolve)=> {
      setTimeout(() => {
        resolve({
          res:{
            data:data
          },
          isSuccess:true,
        })
      }, 1000 * 0.3);
    });
  };

  render() {
    return (
      <>
        <Header title="数据源管理" />
        <div>
          <Table
            antdTableProps={{
              rowSelection:null,
              bordered:true,
            }}
            HeaderExtend={Search}
            showQuickJumper={false}
            showSizeChanger={false}
            getFn={() => this._handlePromise()}
            //updateFn={() => this._handlePromise()}
            columnsArr={this.state.columns}
            hasSearch={false}
            moreFnArr={this.state.moreFnArr}
          />
        </div>
      </>
    )
  }
}

export default ETLdata;
