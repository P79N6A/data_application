import React, { Component } from 'react';
import {Modal, Collapse, List, Table} from 'antd';
import styles from './ApiDetailModal.less';

const {Panel} =Collapse;
function callback(key) {
  console.log(key);
}

class ApiDetailModal extends Component {
  constructor(props) {
    super(props);
    this.state={
    }
  }

  /*modalContent:
    catalogId: "1"
  catalogName: "重点单位"
  createBy: "e91fe704-1709-4be3-b244-a63f9d19b919"
  createDate: "2018-10-18T13:46:06.000+08:00"
  handleOption: ƒ ()
  interfaceDesc: "描述"
  interfaceId: "f8852bb5-b59c-434d-881d-7e77f0871d36"
  interfaceName: "接口000"
  lastUpdate: "2018-10-22T16:37:01.000+08:00"
  lastUpdateBy: "e91fe704-1709-4be3-b244-a63f9d19b919"
  paramInfoResDTOS: Array(1)
  0:
    interfaceId: "f8852bb5-b59c-434d-881d-7e77f0871d36"
  paramId: "673d0237-49c9-4cc0-9eb8-2e0393ba4c5b"
  paramIsnull: "是"
  paramName: "name"
  paramRemark: "备注"
  paramType: "string"
  __proto__: Object
  length: 1
  __proto__: Array(0)
  publishBy: "e91fe704-1709-4be3-b244-a63f9d19b919"
  publishDate: "2018-10-22T16:37:01.000+08:00"
  serviceMethodType: "GET"
  serviceName: "服务000"
  servicePath: "/888"
  status: "2"
  toggleModalVisible: ƒ ()*/

  render() {
    let {
      modalVisible, handleModalCancel,
      handleModalOk, modalTitle, modalContent={}
    }=this.props;
    let {paramInfoResDTOS=[]}=modalContent;
    paramInfoResDTOS=paramInfoResDTOS.map((v,i)=>{
      v['paramInd']=++i;
      return v;
    })
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
        <Modal
            className={styles['detail-modal']}
            onCancel={handleModalCancel}
            onOk={handleModalOk}
            title={modalTitle}
            visible={modalVisible}
        >
          <div>
            <Collapse defaultActiveKey={['1']}
                onChange={callback}
            >
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
                    dataSource={modalContent.paramInfoResDTOS}
                    pagination={false}
                    size="small"
                />
              </Panel>
            </Collapse>
          </div>
        </Modal>
    );
  }
}

export default ApiDetailModal;
