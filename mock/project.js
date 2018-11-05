import Mock from 'mockjs';

let projectArr = [
  {
    title: '项目4',
    value: '上刀山下火海'
  },
  {
    title: '项目5',
    value: '包饺子'
  },
  {
    title: '项目6',
    value: '打游戏'
  },
  {
    title: '项目1',
    value: '开火锅店'
  },
  {
    title: '项目2',
    value: '启动扫黄打非'
  },
  {
    title: '项目3',
    value: '修电脑'
  }
];

export default {
  'GET /mock/project':(req,res) =>{
    res.status(200).json(projectArr);
  }
}
