import React, { Component } from 'react';

import Table from "../Common/Table/1.0";
import Tree from "../Common/Tree";
import Search from "./Search";
import EditMenu from "./EditMenu";
import styles from "./index.less";

class CollectData extends Component {

  constructor(props) {
    super(props);
    this.state={
      columns:[
        {
          title: "任务名称",
          dataIndex: 'name',
          key: "name",
        },{
          title: "状态",
          dataIndex: 'status',
          key: 'status',
          width:"150",
        },{
          title: "创建时间",
          dataIndex: 'time',
          key: 'time',
        },{
          title: "创建者",
          dataIndex: 'user',
          key: "user",
          width:"150",
        },{
          title: "数据库类型",
          dataIndex: 'type',
          key: "type",
        },
      ],
      moreFnArr : [
        {
            key: "edit",
            title: "编辑",
            view: EditMenu,
        },
      ],
    }
  }

  _handlePromise = () => {
    return new Promise((resolve)=> {
        setTimeout(() => {
          resolve({
            res:{
              data:[{
                key:"1",
                name: "获取华智人员数据",
                status: "完成",
                time: "2018-10-27 15:39:20",
                user: "张一山",
                type: "MySQL",
              },{
                key:"2",
                name: "修改华智人员数据",
                status: "完成",
                time: "2018-10-27 15:39:30",
                user: "张一山",
                type: "MySQL",
              },{
                key:"3",
                name: "添加华三人员数据",
                status: "准备中",
                time: "2018-10-27 15:39:20",
                user: "张一山",
                type: "PostgreSQL",
              },{
                key:"4",
                name: "添加华三人员数据",
                status: "失败",
                time: "2018-10-27 15:39:20",
                user: "张一山",
                type: "PostgreSQL",
              }],
            },
            isSuccess:true,
          })
        }, 1000 * 0.3);
    });
  };

  render() {
    return (
      <div className={styles.fr}>
        <div className={styles.orgTree}>
          <Tree defaultExpandAll />
        </div>
        <div className={styles.contentTable}>
          <h1>数据库采集</h1>
          <Table
            antdTableProps={{
                rowSelection:null,
                bordered:true,
              }}
            HeaderExtend={Search}
            showQuickJumper={false}
            showSizeChanger={false}
            getFn={() => this._handlePromise()}
            updateFn={() => this._handlePromise()}
            columnsArr={this.state.columns}
            hasSearch={false}
            moreFnArr={this.state.moreFnArr}
          />
        </div>
      </div>
    );
  }
}

export default CollectData;
