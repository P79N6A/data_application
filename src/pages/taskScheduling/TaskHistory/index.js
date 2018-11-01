import React, {PureComponent} from 'react';

import History from '@/components/Task/History';
import style from "../Task.less";

class TaskHistory extends PureComponent {

  render() {
    return (
      <div className={style.taskWrapper}>
        <History />
      </div>
    )
  }
}

export default TaskHistory;
