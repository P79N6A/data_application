const getNotices = (req, res) =>
  res.json([
    {
      id: '000000001',
      // avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
      title: '你发布的接口-管制刀具识别已经通过审批',
      datetime: '2018-08-09',
      type: '通知',
    },
    {
      id: '000000002',
      // avatar: 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
      title: '你发布的接口-危险人物识别已经通过审批',
      datetime: '2017-08-08',
      type: '通知',
    },
    {
      id: '000000003',
      // avatar: 'https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png',
      title: '你发布的接口-非法持枪识别已经通过审批',
      datetime: '2017-08-07',
      read: true,
      type: '通知',
    },
    {
      id: '000000004',
      // avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
      title: '你发布的接口-非法持枪识别已经通过审批',
      datetime: '2017-08-07',
      type: '通知',
    },
    {
      id: '000000005',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
      title: '内容不要超过两行字，超出时自动截断',
      datetime: '2017-08-07',
      type: '通知',
    },
    {
      id: '000000006',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
      title: '数据接口-车牌信息识别已经被停用',
      description: '操作人：管理员',
      datetime: '2017-08-07',
      type: '消息',
    },
    {
      id: '000000007',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
      title: '数据接口-车牌信息识别已经被停用',
      description: '操作人：管理员',
      datetime: '2017-08-07',
      type: '消息',
    },
    {
      id: '000000008',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
      title: '数据接口-管制刀具识别已经被启用',
      description: '操作人：管理员',
      datetime: '2017-08-07',
      type: '消息',
    },
    {
      id: '000000009',
      title: '王某申请使用数据接口',
      description: '任务需要在 2017-01-12 20:00 前启动',
      extra: '待审批',
      status: 'todo',
      type: '待办',
    },
    {
      id: '000000010',
      title: '数据接口发布被驳回',
      description: '提交于 2017-01-06',
      extra: '待修改',
      status: 'urgent',
      type: '待办',
    } /*
    {
      id: '000000011',
      title: '信息安全考试',
      description: '指派竹尔于 2017-01-09 前完成更新并发布',
      extra: '已耗时 8 天',
      status: 'doing',
      type: '待办',
    },
    {
      id: '000000012',
      title: 'ABCD 版本发布',
      description: '冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务',
      extra: '进行中',
      status: 'processing',
      type: '待办',
    }*/
  ]);

export default {
  'GET /mock/notices/list': getNotices,
};
