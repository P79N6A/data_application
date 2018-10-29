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
    ]
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
      { path: '/data', redirect: '/data/resource' },
      { path: '/api', redirect: '/api/monitorApi' },
      { path: '/community', redirect: '/community/map' },
      /*=================接口服务===============*/
      {
        path: '/api',
        name: 'api',
        icon: 'cluster',
        routes: [
          {
            path: '/api/monitor',
            name: 'monitor',
            hideInMenu:true,
            component: './apiService/Monitor',
          },
          {
            path: '/api/monitorApi',
            name: 'monitorApi',
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
            name: 'publish',
            hideInMenu: true,
            component: './apiService/Publish/AdvancedForm.js',
          },
          {
            path: '/api/manage',
            name: 'manage',
            component: './apiService/ListManage',
          },
          {
            path: '/api/approval',
            name: 'approval',
            component: './apiService/approval'
          },
          {
            path: '/api/apply',
            name: 'apply',
            component: './apiService/Apply',
          },
          {
            path: '/api/echart',
            hideInMenu: true,
            name: 'echart',
            component: './testComponent'
          }
        ]
      },
      /*=================数据资源===============*/
      {
        path: '/data',
        name: 'data',
        icon: 'hdd',
        routes: [
          {
            path: '/data/mission',
            name: 'mission',
            component: './dataResource/CollectMission',
          },
          {
            path: '/data/main',
            name: 'main',
            component: './dataResource/CollectMain',
          },
          {
            path: '/data/file',
            name: 'file',
            component: './dataResource/CollectFile',
          },
          {
            path: '/data/list',
            name: 'list',
            component: './dataResource/CollectList',
          },
          {
            path: '/data/manage',
            name: 'manage',
            component: './dataResource/Manage',
          },
        ],
      },
      /*=================数据应用===============*/
      {
        path: '/application',
        name: 'application',
        icon: 'appstore',
        routes: [
          {
            path: '/application/main',
            name: 'main',
            component: './dataApplication/PyMain',
          },
          {
            path: '/application/result',
            name: 'result',
            component: './dataApplication/PyResult',
          },
          {
            path: '/application/analyze',
            name: 'analyze',
            component: './dataApplication/PyAnalyze',
          },
        ],
      },
      // 数据处理
      {
        name: 'dataprocess',
        icon: 'check-circle-o',
        path: '/process',
        routes: [
          {
            // 数据清理
            path: '/process/clean',
            name: 'clean',
            component: './DataProcess/Clean'
          },
          {
            // 数据整合
            path: '/process/integration',
            name:'integration',
            component: './DataProcess/Integration'
          }
        ]
      },
      // 资源目录
      {
        name: 'catalog',
        icon: 'check-circle-o',
        path: '/catalog',
        routes: [
          {
            // 目录管理
            path: '/catalog/manage',
            name: 'manage',
            component: './dataCatalog/Manage'
          },
          {
            // 资源目录管理
            path: '/catalog/catalog',
            name: 'catalog',
            component: './dataCatalog/Catalog'
          },
          {
            // 数据资源管理
            path: '/catalog/datamanage',
            name: 'datamanage',
            component: './dataCatalog/DataManage'
          }
        ]
      },
      // 运维统计
      {
        name: 'audit',
        icon: 'check-circle-o',
        path: '/audit',
        routes: [
          {
            // 数据监控
            name: 'dmonitor',
            path: '/audit/dmonitor',
            component: './dataAudit/DataMonitor'
          },
          {
            // 系统监控
            name: 'ymonitor',
            path: '/audit/ymonitor',
            component: './dataAudit/SysMonitor'
          },
          {
            // 数据统计
            name: 'statis',
            path: '/audit/statis',
            component: './dataAudit/Statis'
          },
          {
            // 审计管理
            name: 'amanage',
            path: '/audit/amanage',
            component: './dataAudit/AuditManage'
          }
        ]
      },
      /*=================社区应用===============*/
      {name: 'community',
        icon: 'global',
        path: '/community',
        routes: [
          {
            path: '/community/map',
            name: 'map',
            component: './community/map',
          },
          {
            path: '/community/person',
            name: 'person',
            component: './community/person'
          }
        ],
        authority: ['admin']
      },
      /*=================帮助页面===============*/
      {
        name: 'result',
        icon: 'check-circle-o',
        path: '/result',
        routes: [
          // result
          {
            path: '/result/success',
            name: 'success',
            component: './Result/Success',
          },
          { path: '/result/fail', name: 'fail', component: './Result/Error' },
        ]
      },
      /*=================错误页面===============*/
      {
        name: 'exception',
        icon: 'warning',
        path: '/exception',
        routes: [
          // exception
          {
            path: '/exception/403',
            name: 'not-permission',
            component: './Exception/403',
          },
          {
            path: '/exception/404',
            name: 'not-find',
            component: './Exception/404',
          },
          {
            path: '/exception/500',
            name: 'server-error',
            component: './Exception/500',
          },
          {
            path: '/exception/trigger',
            name: 'trigger',
            hideInMenu: true,
            component: './Exception/TriggerException',
          }
        ]
      },
      {
        component: '404',
      }
    ]
  }
];
