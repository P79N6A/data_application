import React, { Component } from 'react';
import ApprovalSearch from './ApprovalSearch'
import  ApprovalTable from './ApprovalTable'
class Approval extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
    <div>
      <ApprovalSearch />
      <ApprovalTable />
    </div>
    )
  }
}
export default Approval;
