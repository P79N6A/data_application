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

  toggleCollapse(){
    let {isCollapse}=this.state;
    let style=this.contentRef.current.style;
    if (isCollapse) {
      style.right='0'
      this.setState({isCollapse:!isCollapse});
    }else{
      style.right='-360px'
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
          <span className={'span'}>{isCollapse?'>>':'<<'}</span>
        </span>
        {/*<WeekChart />*/}
        <Collapse onChange={callback}
            style={{margin:'0 0 0 30px'}}
        >
          <Panel header="数据总览"
              key="1"
              className={styles['data-all']}
          >
            {/*<Collapse defaultActiveKey="1">
              <Panel header="This is panel nest panel"
                  key="1"
              >
                <p>{text}</p>
              </Panel>
            </Collapse>*/}
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
            <p>{text}</p>
          </Panel>
          <Panel header="实有单位"
              key="4"
          >
            <p>{text}</p>
          </Panel>
        </Collapse>
      </div>
    );
  }
}

export default RightPanel;

