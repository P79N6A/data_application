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
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'user'],

    routes: [
      // dashboard
      { path: '/', redirect: '/resource/monitor' },
      { path: '/resource', redirect: '/resource/monitor' },
      {
        path: '/resource',
        name: 'resource',
        icon: 'dashboard',
        routes: [
          {
            path: '/resource/monitor',
            name: 'monitor',
            component: './dataResource/Monitor',
          },
          {
            path: '/resource/manage',
            name: 'manage',
            component: './dataResource/resourceManage',
          },
          {
            path: '/resource/publish',
            name: 'publish',
            component: './dataResource/Publish/AdvancedForm.js',
          },
          {
            path: '/resource/apply',
            name: 'apply',
            component: './dataResource/resourceApply',
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
        ],
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
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
