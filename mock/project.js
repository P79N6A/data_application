import Mock from 'mockjs';

let projectArr = [
  {
    title: '任务4',
    value: '上刀山下火海',
  },
  {
    title: '任务5',
    value: '吃饺子',
  },
  {
    title: '任务6',
    value: '吃饺子',
  },
  {
    title: '任务1',
    value: '上刀山下火海',
  },
  {
    title: '任务2',
    value: '吃饺子',
  },
  {
    title: '任务3',
    value: '吃饺子',
  },
  {
    title: '任务7',
    value: '吃饺子',
  },
  {
    title: '任务8',
    value: '吃饺子',
  },
  {
    title: '任务9',
    value: '吃饺子',
  }
];

export default {
  'GET /mock/project':(req,res) =>{
    res.status(200).json(projectArr);
  }
}
