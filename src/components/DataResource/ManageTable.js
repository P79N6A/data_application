import { Table } from 'antd';
import React from 'react';

class ManageTable extends React.Component {
  render() {
    return (
      <div>
        <Table columns={this.props.columns}
               dataSource={this.props.tableList}
        />
      </div>
    );
  }
}

export default ManageTable;
