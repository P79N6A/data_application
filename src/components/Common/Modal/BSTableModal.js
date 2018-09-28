import React, { Component } from 'react';
import { Modal, Table } from 'antd';

function BSTableModal(props) {
  return class TableModal extends Component {
    render() {
      return (
        <Modal {...props}>
          <Table columns={props.columns}/>
        </Modal>
      );
    }
  };
}

export default BSTableModal;
