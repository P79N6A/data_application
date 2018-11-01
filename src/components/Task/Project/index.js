import React, { PureComponent } from 'react';
import {Card, Col, Collapse, Row, Tabs } from 'antd';

import Header from '../Header';
import style from './index.less';

const Panel = Collapse.Panel;
const TabPane = Tabs.TabPane;

class Project extends PureComponent {

  constructor(props) {
    super(props);
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
        ]
    };
  }

  _handleCallback = (key) => {
    console.log(key);
  };

  _renderContent = (preData) => {
    const customStyle = {
      width: '90%',
    };
    const customPanelStyle = {
      paddingBottom: 24,
      overflow: 'hidden',
    };

    return (
      <Row type="flex" justify="start">
        <Col span={2}>

        </Col>
        <Col span={20}>
          <Collapse bordered={false} style={customStyle}>
            {preData.map((item, index) => {
              return (
                <Panel header={item.title} key={index} style={customPanelStyle}>
                  <Card
                    title={item.title}
                    extra={<a href="#">More</a>}
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

  render() {
    return (
      <>
        <Header title="项目管理" Search Add/>
        <div>
          <Tabs
            defaultActiveKey="person"
            onChange={this._handleCallback}
            tabPosition="left"
          >
            <TabPane tab="个人" key="person">
              {this._renderContent(this.state.personData)}
            </TabPane>
            <TabPane tab="工作组" key="group">
              {this._renderContent(this.state.groupData)}
            </TabPane>
            <TabPane tab="所有" key="all">
              {this._renderContent(this.state.allData)}
            </TabPane>
          </Tabs>
          <div>

          </div>
        </div>
      </>
    );
  }
}

export default Project;
