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
let data = Mock.mock({
  'data|5-20':[{
    'key|+1':1,
    'time':'@datetime()',
    'user':'@name',
    'type|1':["添加用户","创建项目","开始任务","完成任务","错误"],
    'info|1':["完成","失败"]
  }]
});

export default {
  'GET /mock/project':(req,res) =>{
    let queryLength = Object.keys(req.query).length;
    //带有请求参数时发送某一个数据
    if(queryLength) {
      let index;
      let arr=[];
      let search = req.query.search;
      let title = req.query.title;
      if(req.query.search===""){
        res.status(200).json(projectArr);
      }
      else {
        for(let i in projectArr) {
          if(projectArr[i].title === title || projectArr[i].title === search){
            index = i;
            break;
          }
        }
        if(projectArr[index]){
          arr.push(projectArr[index]);
        }
        console.log(search,arr);
        res.status(200).json(arr);
      }
    }
    else {
      res.status(200).json(projectArr);
    }

  },
  'GET /mock/project/log':(req,res) =>{
    res.status(200).json(data);
  },
  'POST /mock/project':(req,res) => {
    let temp={};
    temp.title=req.body.title;
    temp.value=req.body.title;
    projectArr.push(temp);
    res.json(req.body)
  }
}
