import {Table} from 'antd';
import React from 'react'



class ManageTable extends React.Component {
  componentDidMount() {

    console.log(this.props)
  }
  render() {
    return (
      <div>
        <Table columns={this.props.state.columns} dataSource={this.props.state.tableList}/>
      </div>
    );
  }
}

export default ManageTable;
