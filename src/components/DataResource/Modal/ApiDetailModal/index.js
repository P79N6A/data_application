import React, { Component } from 'react';
import {Modal, Collapse, List, Table} from 'antd';
import styles from './index.less';
import BaseModal from '../BaseModal';
import {addColumnKey} from '@/utils/utils';

const {Panel} =Collapse;

class ApiDetailModal extends Component {
  constructor(props) {
    super(props);
    this.state={
    }
  }

  render() {
    let { modalContent={}} =this.props;
    let { paramInfoResDTOS=[]}=modalContent;
    // 数据源加入序号
    paramInfoResDTOS=addColumnKey(paramInfoResDTOS);

    const data = [
      `服务编号：${modalContent.intefaceId}`,
      `服务名：${modalContent.serviceName}`,
      `服务分类：${modalContent.catalogName}`,
      `服务路径：${modalContent.servicePath}`,
      `请求类型：${modalContent.serviceMethodType}`,
      `最后更新：${new Date(modalContent.lastUpdate).toLocaleDateString()}`
    ];
    const columns=[
      {
        title:'序号',
        dataIndex:'serial',
        key:'serial'
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
              <Panel header="服务详情"
                  key="1"
              >
                <List
                    bordered
                    dataSource={data}
                    renderItem={item => (<List.Item>{item}</List.Item>)}
                />
              </Panel>
              <Panel header="接口参数"
                  key="2"
              >
                <Table
                    bordered
                    columns={columns}
                    dataSource={paramInfoResDTOS}
                    pagination={false}
                    size="small"
                />
              </Panel>
            </Collapse>
        </BaseModal>
    );
  }
}

export default ApiDetailModal;
