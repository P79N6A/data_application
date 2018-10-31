import React, {PureComponent} from 'react';
import { Collapse, Tabs } from 'antd';

import Header from '../Header';
import { Tab } from '../../Login';

const TabPane = Tabs.TabPane;
const Panel =Collapse.Panel;



class Project extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          type: "person",
          title: "任务1",
          value: "上刀山下火海"
        },
        {
          type: "person",
          title: "任务2",
          value: "吃饺子"
        },
        {
          type: "person",
          title: "任务3",
          value: "玩勺子"
        }
      ]
    }
  }

  _handleCallback = (key) => {
    console.log(key);
  };

  _renderContent = (data) => {
    const customStyle = {
      width:500,
    };

    const customPanelStyle = {
      background: '#f7f7f7',
      marginBottom: 24,
      overflow: 'hidden',
    };

    return (
      <Collapse  bordered={false} style={customStyle} >
        {data.map((item, index) => {
          return(
            <Panel header={item.title} key={index} style={customPanelStyle} >
              {item.value}
            </Panel>
          )
        })}
      </Collapse>
    )
  };

  render() {
    return (
      <>
        <Header title="项目管理" />
        <div>
          <Tabs defaultActiveKey="person" onChange={this._handleCallback}>
            <TabPane tab="个人" key="person" >
              {this._renderContent(this.state.data)}
            </TabPane>
            <TabPane tab="工作组" key="group" >
              工作组
            </TabPane>
            <TabPane tab="所有" key="all" >
              所有
            </TabPane>
          </Tabs>
          <div>

          </div>
        </div>
      </>
    )
  }
}

export default Project;
