import React, { Component } from 'react';
import {Modal} from 'antd';
import styles from './BaseModal.less';
import PropTypes from 'prop-types';
//此处统一弹框样式

class BaseModal extends Component {
  constructor(props) {
    super(props);
    this.state={
    }
  }

  render() {
    let {
      modalVisible, handleModalCancel,children,
      handleModalOk, modalTitle
    }=this.props;

    return (
      <Modal
          className={styles['detail-modal']}
          onCancel={handleModalCancel}
          onOk={handleModalOk}
          title={modalTitle}
          visible={modalVisible}
      >
        {children}
      </Modal>
    );
  }
}

BaseModal.propTypes = {
  children: PropTypes.object
}

export default BaseModal;
