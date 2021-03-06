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
      { path: '/data', redirect: '/data/mission' },
      { path: '/api', redirect: '/api/monitorApi' },
      { path: '/audit', redirect: '/audit/audit/dmonitor' },
      { path: '/catalog', redirect: '/catalog/manage' },
      { path: '/application', redirect: '/application/main' },
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
            hideInMenu:true,
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
        icon: 'folder-open',
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
        icon: 'inbox',
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
      /*{name: 'community',
        icon: 'global',
        path: '/community',
        routes: [

        ],
        authority: ['admin']
      },*/
      {
        path: '/community/map',
        name: 'map',
        component: './community/map',
        icon:'security-scan'
      },
      {
        path: '/community/person',
        name: 'person',
        component: './community/person',
        icon:'user'
      },
      {
        path: '/community/event',
        name: 'event',
        component: './community/event',
        icon:'save',
        routes:[
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
          }
        ]
      },
      {
        path: '/community/analyze',
        name: 'analyze',
        component: './community/analyze',
        icon:'sync',
        routes:[
          {
            path: '/community/analyze/alarm',
            name: 'alarm',
            component: './community/analyze/alarm',
          },
          {
            path: '/community/analyze/traffic',
            name: 'traffic',
            component: './community/analyze/traffic',
          }
        ]
      },
      {
        path: '/community/monitor',
        name: 'monitor',
        icon: 'eye',
        component: './community/monitor',
        routes:[
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
        ]
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
