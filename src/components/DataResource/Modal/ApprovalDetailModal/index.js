import React, { Component } from 'react';
import {Modal, Collapse, List, Table} from 'antd';
import styles from './index.less';
import BaseModal from '../BaseModal';
import InterfaceList from './interfaceList';
import InterfaceHistory from './interfaceHistory';

const {Panel} =Collapse;

class ApprovalDetailModal extends Component {
  constructor(props) {
    super(props);
    this.state={
    }
  }

  render() {
    let { modalContent={} } =this.props
    let { paramInfoResDTOS=[]}=modalContent;
    // 数据源加入序号
    paramInfoResDTOS=paramInfoResDTOS.map((v,i)=>{
      v['paramInd']=++i;
      return v;
    });

    return (
      <BaseModal {...this.props}>
        <Collapse defaultActiveKey={['1']}>
          <Panel header="接口列表"
              key="1"
          >
            <InterfaceList
                interfaceInfos={modalContent.interfaceInfos}
            />
          </Panel>

          <Panel header="审批记录"
              key="2"
          >
            <InterfaceHistory approveHistorys={modalContent.approveHistorys}/>
          </Panel>
        </Collapse>
      </BaseModal>
    );
  }
}

export default ApprovalDetailModal;
