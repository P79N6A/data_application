import React, {PureComponent} from 'react';

import Header from '../Header';
import Table from "@/components/Common/Table/1.0";

class Schedule extends PureComponent {
  constructor() {
    super();
    this.state={
      columns:[
        {
          title: "ID",
          dataIndex: 'id',
          key: "id",
        },{
          title: "项目",
          dataIndex: 'project',
          key: 'project',
        },{
          title: "用户",
          dataIndex: 'user',
          key: "user",
          width:150,
        },{
          title: "首次调度时间",
          dataIndex: 'first_time',
          key: "first_time",
          width:150
        },{
          title: "下次执行时间",
          dataIndex: 'next_time',
          key: "next_time",
          width:150
        },{
          title: "Cron表达式",
          dataIndex: 'cron',
          key: "cron",
          width:100
        },{
          title: "邮箱告警",
          dataIndex: 'mail_alert',
          key: "mail_alert",
          width:100
        }
      ],
      moreFnArr : [
        {
          key: "remove",
          title: "编辑"
        },{
          key: "sla",
          title: "告警"
        }
      ]
    }
  }

  _handlePromise = () => {
    let data = [];
    let d = new Date().toLocaleTimeString();
    for(let i=1;i<100;i++){
      data.push({
        id:i,
        project:"全市扫黄打黑",
        user:"周队长",
        first_time:d,
        next_time:d,
        cron:"0 0/5 * ? * *",
        mail_alert:"否"
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
        <Header title="调度计划" />
        <div>
          <Table
            antdTableProps={{
              rowSelection:null,
              bordered:true,
            }}
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

export default Schedule;
