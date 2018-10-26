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
      { path: '/data', redirect: '/data/resource' },
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
