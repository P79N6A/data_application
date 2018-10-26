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
      { path: '/', redirect: '/resource/manage' },
      { path: '/resource', redirect: '/resource/manage' },
      { path: '/data', redirect: '/data/resource' },
      { path: '/community', redirect: '/community/main' },
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
          {
            path: '/api/apply',
            name: 'monitorApi',
            hideInMenu: true,
            component: './apiService/Apply',
          },
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
            path: '/data/main',
            name: 'main',
            component: './dataResource/CollectMain',
          },
          {
            path: '/data/list',
            name: 'list',
            component: './dataResource/CollectList',
          },
          {
            path: '/data/mission',
            name: 'mission',
            component: './dataResource/CollectMission',
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
      /*=================社区应用===============*/
      {name: 'community',
        icon: 'check-circle-o',
        path: '/community',
        routes: [
          {
            path: '/community/main',
            name: 'main',
            component: './community',
          },
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
