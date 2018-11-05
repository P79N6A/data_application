import React, {PureComponent} from 'react';

import ETLdata from '@/components/Task/ETLdata';
import style from "../Task.less";

class TaskETLdata extends PureComponent {

  render() {
    return (
      <div className={style.taskWrapper}>
        <ETLdata />
      </div>
    )
  }
}

export default TaskETLdata;
