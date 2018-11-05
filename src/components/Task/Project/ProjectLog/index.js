import React, { PureComponent } from 'react';
import { Collapse } from 'antd';

import style from './index.less';

const Panel = Collapse.Panel;

class ProjectLog extends PureComponent {
  constructor() {
    super();
  }

  _renderContent = (data) => {
    if (data) {
      return (
        <Collapse>
          {
            data.map((item) => {
              return (
                <Panel>
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
          <h2>没有日志</h2>
          <p>该项目没有日志</p>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        {this._renderContent([1, 2, 3])}
      </div>
    );
  }
}

export default ProjectLog;
