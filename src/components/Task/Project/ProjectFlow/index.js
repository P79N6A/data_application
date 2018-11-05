import React, { PureComponent } from 'react';
import { Collapse } from 'antd';

import style from './index.less';

const Panel = Collapse.Panel;

class ProjectFlow extends PureComponent {
  constructor() {
    super();
  }

  _renderContent = (data) => {
    if(data) {
      data.map((item) => {
        <Collapse>
          <Panel>

          </Panel>
        </Collapse>
      });
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
        {this._renderContent(null)}
      </div>
    );
  }
}

export default ProjectFlow;
