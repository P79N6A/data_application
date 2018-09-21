import React, {Component} from 'react';
import ManageTable from "../../components/DataResource/ManageTable"
import styles from './resourceManage.less';
import {connect} from "dva";


class ResourceManage extends Component {
  constructor(props) {
    super(props);
    this.doUpdate = this.doUpdate.bind(this);
    this.state = {
      tableList: null,
    }
  }


  componentDidMount() {
    this.props.dispatch({
      type: "resource/getTableList",
      payload: {},
      callback: (res) => {
        this.doUpdate("tableList", res.data.datalist);
      },
    })
  }

  doUpdate(state, data) {
    this.setState({[state]: data});
  }
  render() {
    return (
      <div className={styles["manage-table"]}>
        <div className={"table-header"}>
          <span>当前查看: 资源目录列表</span>
        </div>
        <ManageTable {...this.props} {...this.state} />
      </div>
    );
  }
}

export default connect((data) => (data.resource))(ResourceManage);
