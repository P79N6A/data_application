import React, { Component } from 'react';
import {Modal} from 'antd';
import styles from './index.less';

// 此组件统一弹框样式
class BaseModal extends Component {
  render() {
    const {
      modalVisible, handleModalCancel,children,
      handleModalOk, modalTitle='', width='520px',
    }=this.props;
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
export default BaseModal;
