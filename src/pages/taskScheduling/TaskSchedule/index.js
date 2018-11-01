import React, {PureComponent} from 'react';

import Schedule from '@/components/Task/Schedule';
import style from "../Task.less";

class TaskSchedule extends PureComponent {

  render() {
    return (
      <div className={style.taskWrapper}>
        <Schedule />
      </div>
    )
  }
}

export default TaskSchedule;
