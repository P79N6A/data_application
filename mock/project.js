import Mock from 'mockjs';

let projectArr = [
  {
    title: '项目4',
    value: '上刀山下火海',
    id: 4,
    create_time: '2018-10-18 10:25:32',
    modify_time: '2018-10-18 10:33:01',
    modifier: '周队长',
    manager: '周队长'
  },
  {
    title: '项目5',
    value: '包饺子',
    id: 5,
    create_time: '2018-10-18 10:25:32',
    modify_time: '2018-10-18 10:33:01',
    modifier: '周队长',
    manager: '周队长'
  },
  {
    title: '项目6',
    value: '打游戏',
    id: 6,
    create_time: '2018-10-18 10:25:32',
    modify_time: '2018-10-18 10:33:01',
    modifier: '周队长',
    manager: '周队长'
  },
  {
    title: '项目1',
    value: '开火锅店',
    id: 1,
    create_time: '2018-10-18 10:25:32',
    modify_time: '2018-10-18 10:33:01',
    modifier: '周队长',
    manager: '周队长'
  },
  {
    title: '项目2',
    value: '启动扫黄打非',
    id: 2,
    create_time: '2018-10-18 10:25:32',
    modify_time: '2018-10-18 10:33:01',
    modifier: '周队长',
    manager: '周队长'
  },
  {
    title: '项目3',
    value: '修电脑',
    id: 3,
    create_time: '2018-10-18 10:25:32',
    modify_time: '2018-10-18 10:33:01',
    modifier: '周队长',
    manager: '周队长'
  }
];

export default {
  'GET /mock/project':(req,res) =>{
    let queryLength = Object.keys(req.query).length;
    //带有请求参数时发送某一个数据
    if(queryLength) {
      let title = req.query.title;
      let index;
      let arr=[];
      for(let i in projectArr) {
        if(projectArr[i].title === title){
          index = i;
          break;
        }
      }
      arr.push(projectArr[index]);
      res.status(200).json(arr);
    }
    else {
      res.status(200).json(projectArr);
    }

  }
}
