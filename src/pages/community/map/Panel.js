import React, { Component } from 'react';
import { Collapse } from 'antd';
import styles from './Panel.less';

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
        <span className={styles['collapse-btn']} onClick={this.toggleCollapse} >
          <span className={'span'}>{isCollapse?'>>':'<<'}</span>
        </span>
        <Collapse onChange={callback}
            style={{margin:'0 0 0 40px'}}
        >
          <Panel header="This is panel header 1"
              key="1"
          >
            <Collapse defaultActiveKey="1">
              <Panel header="This is panel nest panel"
                  key="1"
              >
                <p>{text}</p>
              </Panel>
            </Collapse>
          </Panel>
          <Panel header="This is panel header 2"
              key="2"
          >
            <p>{text}</p>
          </Panel>
          <Panel header="This is panel header 3"
              key="3"
          >
            <p>{text}</p>
          </Panel>
        </Collapse>
      </div>
    );
  }
}

export default RightPanel;

