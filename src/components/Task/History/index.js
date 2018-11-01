import React, {PureComponent} from 'react';

import Header from '../Header';
import Table from "@/components/Common/Table/1.0";

class History extends PureComponent {
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
          title: "流程",
          dataIndex: 'flow',
          key: 'flow',
        },{
          title: "用户",
          dataIndex: 'user',
          key: "user",
          width:"150",
        },{
          title: "开始时间",
          dataIndex: 'start_time',
          key: "start_time",
        },{
          title: "结束时间",
          dataIndex: 'end_time',
          key: "end_time",
        },{
          title: "耗时",
          dataIndex: 'cost_time',
          key: "cost_time",
        },{
          title: "状态",
          dataIndex: 'status',
          key: "status",
        }
      ],
      // moreFnArr : [
      //   {
      //     key: "edit",
      //     title: "编辑",
      //     view: EditMenu,
      //   },
      // ]
    }
  }

  _handlePromise = () => {
    let data = [];
    let d = new Date().toLocaleTimeString();
    for(let i=1;i<100;i++){
      data.push({
        id:i,
        project:"全市扫黄打黑",
        flow:"第"+i+"阶段",
        user:"周队长",
        start_time:d,
        end_time:d,
        cost_time:i+"s",
        status:"success"
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
        <Header title="历史日志" Search Adv/>
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

export default History;
