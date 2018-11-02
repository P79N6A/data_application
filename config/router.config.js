export default [
  // 用户中心路由
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
      { path: '/user/register-result', component: './User/RegisterResult' },
    ],
  },
  // 应用路由
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    // 配置路由权限
    authority: ['admin', 'community'],

    routes: [
      // 配置各应用的默认路由
      { path: '/', redirect: '/api/monitorApi' },
      { path: '/resource', redirect: '/resource/manage' },
      { path: '/data', redirect: '/data/mission' },
      { path: '/api', redirect: '/api/monitorApi' },
      { path: '/audit', redirect: '/audit/dmonitor' },
      { path: '/catalog', redirect: '/catalog/catalog' },
      { path: '/application', redirect: '/application/main' },
      { path: '/community', redirect: '/community/map' },
      { path: '/task', redirect: '/task/project' },
      /*= ================接口服务=============== */
      {
        path: '/api/monitor',
        name: 'api.monitor',
        hideInMenu: true,
        component: './apiService/Monitor',
      },
      {
        path: '/api/monitorApi',
        name: 'api.monitorApi',
        component: './apiService/Monitor/MonitorApi',
      },
      // {
      //   path: '/api/apply',
      //   name: 'monitorApi',
      //   hideInMenu: true,
      //   component: './apiService/Apply',
      // },
      {
        path: '/api/manage/publish',
        name: 'api.publish',
        component: './apiService/Publish/AdvancedForm.js',
      },
      {
        path: '/api/manage',
        name: 'api.manage',
        component: './apiService/ListManage',
      },
      {
        path: '/api/approval',
        name: 'api.approval',
        component: './apiService/approval',
      },
      {
        path: '/api/apply',
        name: 'api.apply',
        component: './apiService/Apply',
      },
      {
        path: '/api/echart',
        hideInMenu: true,
        name: 'echart',
        component: './testComponent',
      },
      /*= ================数据资源=============== */
      {
        path: '/data/mission',
        name: 'data.mission',
        component: './dataResource/CollectMission',
      },
      {
        path: '/data/main',
        name: 'data.main',
        component: './dataResource/CollectMain',
      },
      {
        path: '/data/file',
        name: 'data.file',
        component: './dataResource/CollectFile',
      },
      {
        path: '/data/list',
        name: 'data.list',
        component: './dataResource/CollectList',
      },
      {
        path: '/data/manage',
        name: 'data.manage',
        component: './dataResource/Manage',
      },
      /*= ================数据应用=============== */
      {
        path: '/application/main',
        name: 'application.main',
        component: './dataApplication/PyMain',
      },
      {
        path: '/application/result',
        name: 'application.result',
        component: './dataApplication/PyResult',
      },
      {
        path: '/application/analyze',
        name: 'application.analyze',
        component: './dataApplication/PyAnalyze',
      },
      // 数据处理
      {
        // 数据清理
        path: '/process/clean',
        name: 'process.clean',
        component: './DataProcess/Clean',
      },

      // 资源目录
      {
        // 资源目录
        path: '/catalog/catalog',
        name: 'catalog.catalog',
        component: './dataCatalog/Catalog',
      },
      {
        // 资源管理
        path: '/catalog/datamanage',
        name: 'catalog.datamanage',
        component: './dataCatalog/DataManage',
      },
      // 运维统计
      {
        // 数据监控
        name: 'audit.dmonitor',
        path: '/audit/dmonitor',
        component: './dataAudit/DataMonitor',
      },
      {
        // 系统监控
        name: 'audit.ymonitor',
        path: '/audit/ymonitor',
        component: './dataAudit/SysMonitor',
      },
      {
        // 数据统计
        name: 'audit.statis',
        path: '/audit/statis',
        component: './dataAudit/Statis',
      },
      {
        // 审计管理
        name: 'audit.amanage',
        path: '/audit/amanage',
        component: './dataAudit/AuditManage',
      },

      // 任务调度
      {
        // 项目管理
        name: 'task.project',
        path: '/task/project',
        component: './taskScheduling/TaskProject',
        exact: false
      },
      {
        // 调度计划
        name: 'task.schedule',
        path: '/task/schedule',
        component: './taskScheduling/TaskSchedule',
      },
      {
        // 历史日志
        name: 'task.history',
        path: '/task/history',
        component: './taskScheduling/TaskHistory',
      },
      {
        // 数据源管理
        name: 'task.ebdata',
        path: '/task/ebdata',
        component: './taskScheduling/TaskEbdata',
      },
      /*= ================社区应用=============== */
      {
        path: '/community/map',
        name: 'map',
        component: './community/map',
        icon: 'security-scan',
      },
      {
        path: '/community/person',
        name: 'person',
        component: './community/person',
        icon: 'user',
      },
      {
        path: '/community/event',
        name: 'event',
        component: './community/event',
        icon: 'save',
        routes: [
          {
            path: '/community/event/report',
            name: 'report',
            component: './community/event/report',
          },
          {
            path: '/community/event/check',
            name: 'check',
            component: './community/event/check',
          },
          {
            path: '/community/event/message',
            name: 'message',
            component: './community/event/message',
          },
        ],
      },
      {
        path: '/community/analyze',
        name: 'analyze',
        component: './community/analyze',
        icon: 'sync',
        routes: [
          {
            path: '/community/analyze/alarm',
            name: 'alarm',
            component: './community/analyze/alarm',
          },
          {
            path: '/community/analyze/traffic',
            name: 'traffic',
            component: './community/analyze/traffic',
          },
        ],
      },
      {
        path: '/community/monitor',
        name: 'monitor',
        icon: 'eye',
        component: './community/monitor',
        routes: [
          {
            path: '/community/monitor/current',
            name: 'current',
            component: './community/monitor/current',
          },
          {
            path: '/community/monitor/track',
            name: 'track',
            component: './community/monitor/track',
          },
        ],
      },

    ],
  },
];
