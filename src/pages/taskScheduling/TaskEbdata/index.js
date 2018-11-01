import React, {PureComponent} from 'react';

import Ebdata from '@/components/Task/Ebdata';
import style from "../Task.less";

class TaskEbdata extends PureComponent {

  render() {
    return (
      <div className={style.taskWrapper}>
        <Ebdata />
      </div>
    )
  }
}

export default TaskEbdata;
