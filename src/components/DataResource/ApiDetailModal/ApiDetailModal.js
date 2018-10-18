import React, { Component } from 'react';
import {Modal} from 'antd';

class ApiDetailModal extends Component {
  constructor(props) {
    super(props);
    this.state={
    }
  }


  render() {
    let {modalVisible, handleModalCancel, handleModalOk, modalTitle}=this.props;
    return (
        <Modal
            onCancel={handleModalCancel}
            onOk={handleModalOk}
            title={modalTitle}
            visible={modalVisible}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
    );
  }
}

export default ApiDetailModal;
