import React, { PureComponent } from 'react';
import { Col, Collapse, Row, Tabs } from 'antd';

import Header from '../Header';
import style from './index.less';

const Panel = Collapse.Panel;
const TabPane = Tabs.TabPane;

class Project extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          type: 'person',
          title: '任务1',
          value: '上刀山下火海',
        },
        {
          type: 'person',
          title: '任务2',
          value: '吃饺子',
        },
        {
          type: 'person',
          title: '任务3',
          value: '玩勺子',
        },
      ],
    };
  }

  _handleCallback = (key) => {
    console.log(key);
  };

  _renderContent = (data) => {
    const customStyle = {
      width: '90%',
    };
    const customPanelStyle = {
      background: '#f7f7f7',
      paddingBottom: 24,
      overflow: 'hidden',
    };

    return (
      <Row type="flex" justify="start">
        <Col span={2}>

        </Col>
        <Col span={10}>
          <Collapse bordered={false} style={customStyle}>
            {data.map((item, index) => {
              return (
                <Panel header={item.title} key={index} style={customPanelStyle}>
                  {item.value}
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
              {this._renderContent(this.state.data)}
            </TabPane>
            <TabPane tab="工作组" key="group">
              工作组
            </TabPane>
            <TabPane tab="所有" key="all">
              所有
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
