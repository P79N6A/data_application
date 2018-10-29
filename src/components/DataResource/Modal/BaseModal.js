import React, { Component } from 'react';
import {Modal} from 'antd';
import PropTypes from 'prop-types';
import styles from './BaseModal.less';

// 此组件统一弹框样式
class BaseModal extends Component {
  render() {
    const {
      modalVisible, handleModalCancel,children,
      handleModalOk, modalTitle='', width='520px',
    }=this.props;
    console.log(width)
    return (
      <Modal
        className={styles['detail-modal']}
        onCancel={handleModalCancel}
        onOk={handleModalOk}
        width={width}
        title={modalTitle || '详情面板'}
        visible={modalVisible}
      >
        {children}
      </Modal>
    );
  }
}

BaseModal.propTypes = {
  modalVisible: PropTypes.bool,
  handleModalCancel: PropTypes.func,
  handleModalOk: PropTypes.func,
  modalTitle: PropTypes.string,
}

export default BaseModal;
