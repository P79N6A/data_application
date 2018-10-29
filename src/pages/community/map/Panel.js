import React, { Component } from 'react';
import { Collapse } from 'antd';
import styles from './Panel.less';
import WeekChart from './charts/weekChart';
import WeekLine from './charts/weekLine';
import People from './panels/people';

const Panel = Collapse.Panel;

function callback(key) {
  console.log(key);
}

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

class RightPanel extends Component {
  constructor(props) {
    super(props);
    this.toggleCollapse = this.toggleCollapse.bind(this);
    this.contentRef=React.createRef();
    this.state={isCollapse:false}
  }

  // 右侧面板切换
  toggleCollapse(){
    let {isCollapse}=this.state;
    let style=this.contentRef.current.style;
    if (isCollapse) {
      style.right='0'
      this.setState({isCollapse:!isCollapse});
    }else{
      style.right='-370px'
      this.setState({isCollapse:!isCollapse});
    }
  }


  render() {
    const {isCollapse}=this.state;

    return (
      <div className={styles['ant-collapse-content']}
          ref={this.contentRef}
      >
        <span className={styles['collapse-btn']}
            onClick={this.toggleCollapse}
        >
          <span style={{transform:'scale(1,3)'}}
              className={'span'}
          >{isCollapse?'＜':'＞'}</span>
        </span>
        <Collapse onChange={callback}
            style={{margin:'0 0 0 30px'}}
            defaultActiveKey={'1'}
        >
          <Panel header="数据总览"
              key="1"
              className={styles['data-all']}
          >
            <WeekChart />
            <WeekLine />
          </Panel>
          <Panel header="实有人口"
              key="2"
          >
            <People />
          </Panel>
          <Panel header="实有房屋"
              key="3"
          >
            <p>待开发</p>
          </Panel>
          <Panel header="实有单位"
              key="4"
          >
            <p>待开发</p>
          </Panel>
        </Collapse>
      </div>
    );
  }
}

export default RightPanel;

