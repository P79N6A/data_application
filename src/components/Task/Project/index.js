import React, { PureComponent } from 'react';
import {Button, Card, Col, Collapse, Modal, Row, Tabs } from 'antd';
import {withRouter, Link} from 'dva/router';

import Header from '../Header';
import Addproject from './AddProject';
import style from './index.less';

const Panel = Collapse.Panel;
const TabPane = Tabs.TabPane;

class Project extends PureComponent {

  constructor() {
    super();
    this.state = {
      personData: [
          {
            title: '任务1',
            value: '上刀山下火海',
          },
          {
            title: '任务2',
            value: '吃饺子',
          },
          {
            title: '任务3',
            value: '吃饺子',
          },
          {
            title: '任务3',
            value: '吃饺子',
          },
          {
            title: '任务3',
            value: '吃饺子',
          },
          {
            title: '任务3',
            value: '吃饺子',
          }
        ],
      groupData: [
          {
            title: '任务4',
            value: '上刀山下火海',
          },
          {
            title: '任务5',
            value: '吃饺子',
          },
          {
            title: '任务6',
            value: '吃饺子',
          }
        ],
      allData:[
          {
            title: '任务4',
            value: '上刀山下火海',
          },
          {
            title: '任务5',
            value: '吃饺子',
          },
          {
            title: '任务6',
            value: '吃饺子',
          },
          {
            title: '任务1',
            value: '上刀山下火海',
          },
          {
            title: '任务2',
            value: '吃饺子',
          },
          {
            title: '任务3',
            value: '吃饺子',
          },
          {
            title: '任务3',
            value: '吃饺子',
          },
          {
            title: '任务3',
            value: '吃饺子',
          },
          {
            title: '任务3',
            value: '吃饺子',
          }
        ],
      visible:false
    };
  }

  _handleCallback = (key) => {
    console.log(key);
  };

  _handleFormUpdate = (child) => {
    console.log(child);
    this.addModal = child;
  };

  show = () => {
    this.setState({visible:true})
  };

  close = () => {
    this.setState({visible:false})
  };

  update = (data) => {
    data && this.state.personData.push(data);
  };

  _renderProjectData = (preData) => {
    const customStyle = {
      width: '90%',
    };
    const customPanelStyle = {
      paddingBottom: 24,
    };

    return (
      <Row type="flex" justify="start">
        <Col span={2} />
        <Col span={20}>
          <Collapse bordered={false} style={customStyle}>
            {preData && preData.map((item, index) => {
              const data = {project:item.title};
              const path = {pathname:"/task/project",query:data};
              return (
                <Panel header={item.title} key={index} style={customPanelStyle}>
                  <Card
                    title={item.title}
                    extra={<Link to={path}>More</Link>}
                  >
                    <p>{item.value}</p>
                  </Card>
                </Panel>
              );
            })}
          </Collapse>
        </Col>
      </Row>
    );
  };

  _renderContent = (param) => {
    const count = Object.keys(param).length;
    const projectName = count ? param["project"] : "";

    if( count ) {
      return (
        <>
          <Header title={projectName} Remove Upload Download/>
          <Button
            onClick={() => {
              this.props.history.goBack();
            }}
          >
            返回
          </Button>
        </>
      )
    }

    else {
      return (
        <>
          <Header title="项目管理" Search Add={this} />
          <div>
            <Tabs
              defaultActiveKey="person"
              onChange={this._handleCallback}
              tabPosition="left"
            >
              <TabPane tab="个人" key="person">
                {this._renderProjectData(this.state.personData)}
              </TabPane>
              <TabPane tab="工作组" key="group">
                {this._renderProjectData(this.state.groupData)}
              </TabPane>
              <TabPane tab="所有" key="all">
                {this._renderProjectData(this.state.allData)}
              </TabPane>
            </Tabs>
          </div>
        </>
      )
    }
  };


  render() {
    return (
      <div>
        {this._renderContent(this.props.location.query)}
        <div>
          <Modal
            title="新建项目"
            destroyOnClose={true}
            okText="添加"
            cancelText="取消"
            onOk={() => {
              this.addModal && this.addModal.handleSubmit();
            }}
            onCancel={this.close}
            visible={this.state.visible}
          >
            <Addproject
              onCancel={this.close}
              personData={this.state.personData}
              update={this.update}
              onRef={this._handleFormUpdate}
            />
          </Modal>
        </div>
      </div>
      )
  }
}

export default withRouter(Project);
