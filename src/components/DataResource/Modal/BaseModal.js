import React, { Component } from 'react';
import {Modal} from 'antd';
import styles from './BaseModal.less';
import PropTypes from 'prop-types';

//此组件统一弹框样式
class BaseModal extends Component {
  render() {
    let {
      modalVisible, handleModalCancel,children,
      handleModalOk, modalTitle=''
    }=this.props;

    return (
      <Modal
          className={styles['detail-modal']}
          onCancel={handleModalCancel}
          onOk={handleModalOk}
          title={modalTitle?modalTitle: '详情面板'}
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
  modalTitle: PropTypes.string
}

export default BaseModal;
