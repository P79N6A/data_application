import React, { Component } from 'react';
import {Button} from 'antd';

import Table from "../../components/Common/Table/1.0";
import Tree from "../../components/Common/Tree";
import styles from "./index.less";

class CollectData extends Component {

  constructor(props) {
    super(props);
    this.state={
      columns:[
        {
          title: "数据库类型",
          dataIndex: 'type',
          key: "type"
        },{
          title: "时间",
          dataIndex: 'time',
          key: 'time'
        },{
          title: "描述",
          dataIndex: 'description',
          key: "description"
        }
      ],
      headerMoreFnArr : [
        {
          key: "add",
          render: () => {
            return <Button>添加</Button>
          }
        }
      ]
    }
  }

  _handlePromise = () => {
    return new Promise((resolve, reject)=> {
        setTimeout(() => {
          let data =[];
          for(let i=0; i<100 ; i++){
            data.push({
              type:"MySql",
              time:"2018-10-27 11:" + i%60,
              description:"员工资料数据库",
              key:"i"
            })
          }
          resolve({
            res:{
              data:data
            },
            isSuccess:true
          })
        }, 1000 * 0.1)
    });
  };

  render() {
    return (
      <div className={styles.fr}>
        <div className={styles.orgTree}>
        <Tree />
        </div>
        <div className={styles.contentTable}>
          <h1>数据库采集</h1>
            <Table
              recordIDName="010101"
              headerMoreFnArr={this.state.headerMoreFnArr}
              getFn={() => this._handlePromise()}
              updateFn={() => this._handlePromise()}
              deleteFn={() => this._handlePromise()}
              columnsArr={this.state.columns}
              app_id="1"
              hasSearch
            />
        </div>
      </div>
    );
  }
}

export default CollectData;
