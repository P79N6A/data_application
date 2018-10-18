export default [
  // user
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
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    // 配置路由权限
    authority: ['admin', 'user', 'wan'],

    routes: [
      // dashboard
      { path: '/', redirect: '/resource/manage' },
      { path: '/resource', redirect: '/resource/manage' },
      {
        path: '/resource',
        name: 'resource',
        icon: 'cluster',
        routes: [
          {
            path: '/resource/monitor',
            name: 'monitor',
            hideInMenu:true,
            component: './dataResource/Monitor/Monitor',
          },
          {
            path: '/resource/monitorApi',
            name: 'monitorApi',
            component: './dataResource/Monitor/MonitorApi',
          },
          {
            path: '/resource/apply',
            name: 'monitorApi',
            hideInMenu: true,
            component: './dataResource/Apply',
          },
          {
            path: '/resource/manage/publish',
            name: 'publish',
            hideInMenu: true,
            component: './dataResource/Publish/AdvancedForm.js',
          },
          {
            path: '/resource/manage',
            name: 'manage',
            component: './dataResource/ListManage',
          },
          {
            path: '/resource/approval',
            name: 'approval',
            component: './dataResource/approval'
          },
          {
            path: '/resource/apply',
            name: 'apply',
            component: './dataResource/Apply',
          },
          {
            path: '/resource/echart',
            hideInMenu: true,
            name: 'echart',
            component: './testComponent'
          }
        ]
      },
      {
        path: '/collect',
        name: 'collect',
        icon: 'hdd',
        routes: [
          {
            path: '/collect/main',
            name: 'main',
            component: './dataCollect/CollectMain',
          },
          {
            path: '/collect/list',
            name: 'list',
            component: './dataCollect/CollectList',
          },
          {
            path: '/collect/mission',
            name: 'mission',
            component: './dataCollect/CollectMission',
          },
        ],
      },
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
