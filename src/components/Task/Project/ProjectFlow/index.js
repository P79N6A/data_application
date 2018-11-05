import React, { PureComponent } from 'react';
import { Collapse } from 'antd';

import style from './index.less';
import FlowHeader from './FlowHeader';

const Panel = Collapse.Panel;
const customStyle={
  background: '#f7f7f7',
  marginBottom: 24,
  borderRadius: 4,
  overflow: 'hidden'
};

class ProjectFlow extends PureComponent {
  constructor(props) {
    super(props);
  }

  _renderContent = (data) => {
    if (data) {
      return (
        <Collapse>
          {
            data.map((item) => {
              return (
                <Panel header={<FlowHeader title={item} />} key={item} style={customStyle}>
                  <p>{item}</p>
                </Panel>
              );
            })
          }
        </Collapse>
      );
    }
    else {
      return (
        <div className={style.noContent}>
          <h2>没有流程</h2>
          <p>该项目没有流程</p>
        </div>
      )
    }
  };

  render() {
    return (
      <div>
        {this._renderContent([1,2,3,4])}
      </div>
    );
  }
}

export default ProjectFlow;
