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

    const data = [
      `服务编号：${modalContent.intefaceId}`,
      `服务名：${modalContent.serviceName}`,
      `服务分类：${modalContent.catalogName}`,
      `服务路径：${modalContent.servicePath}`,
      `请求类型：${modalContent.serviceMethodType}`,
      `最后更新：${modalContent.lastUpdate}`
    ];
    const columns=[
      {
        title:'序号',
        dataIndex:'paramInd',
        key:'paramInd'
      },
      {
        title:'参数名',
        dataIndex:'paramName',
        key:'paramName'
      },
      {
        title:'参数类型',
        dataIndex:'paramType',
        key:'paramType'
      },
      {
        title:'能否为空',
        dataIndex:'paramIsnull',
        key:'paramIsnull'
      },
      {
        title:'备注',
        dataIndex:'paramRemark',
        key:'paramRemark'
      }
    ];

    return (
      <BaseModal {...this.props}>
        <Collapse defaultActiveKey={['1']}>
          <Panel header="接口列表"
              key="1"
          >
            <InterfaceList
                dataSource={data}
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
