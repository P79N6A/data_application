import React, {PureComponent} from 'react';

import Project from '@/components/Task/Project';
import style from '../Task.less';

class TaskProject extends PureComponent {

  render() {
    return (
      <div className={style.taskWrapper}>
        <Project />
      </div>
    )
  }
}

export default TaskProject;
