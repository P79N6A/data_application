// https://umijs.org/config/

import os from 'os';
import pageRoutes from './router.config';
import webpackplugin from './plugin.config';
import defaultSettings from '../src/defaultSettings';

const path = require("path")

export default {
  // 插件配置
  // add for transfer to umi
  plugins: [
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: {
          hmr: true,
        },
        locale: {
          enable: true, // default false
          default: 'zh-CN', // default zh-CN
          baseNavigator: true, // default true, when it is true, will use `navigator.language` overwrite default
        },
        dynamicImport: {
          loadingComponent: './components/Global/PageLoading/index',
        },
        // polyfills: ['ie11'],
        ...(!process.env.TEST && os.platform() === 'darwin'
          ? {
              dll: {
                include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
                exclude: ['@babel/runtime'],
              },
            hardSource: true,
            }
          : {}),
      },
    ],
  ],
  // 环境变量
  define: {
    APP_TYPE: process.env.APP_TYPE || '',
  },
  // 路由配置
  routes: pageRoutes,
  // Theme for antd
  // https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  externals: {
    '@antv/data-set': 'DataSet',
    'BMap':'BMap',
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (context, localIdentName, localName) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }
      const match = context.resourcePath.match(/src(.*)/);
      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = antdProPath
          .split('/')
          .map(a => a.replace(/([A-Z])/g, '-$1'))
          .map(a => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }
      return localName;
    },
  },

  manifest: {
    name: 'ant-design-pro',
    background_color: '#FFF',
    description: 'An out-of-box UI solution for enterprise applications as a React boilerplate.',
    display: 'standalone',
    start_url: '/index.html',
    icons: [
      {
        src: '/favicon.png',
        sizes: '48x48',
        type: 'image/png',
      },
    ],
  },

  chainWebpack: webpackplugin,
  cssnano: {
    mergeRules: false,
  },
  // // 配置别名
  // alias: {
  //   'src': path.resolve(__dirname, '../src'),
  // },
  // 配置接口代理
  'proxy': {
    '/apizza': {
      'target': 'https://dsn.apizza.net/mock/40a8b4a3ed5d6fd4c01e6e3743b65925/',
      'changeOrigin': true,
      'pathRewrite': { '^/api': '' },
    },
    '/ser': {
      'target': 'http://192.168.110.28:8901/apiService/',
      'changeOrigin': true,
      'pathRewrite': { '^/api': '' },
    },
  },
  // 构建输出目录
  outputPath: './dist',
  // 浏览器兼容
  targets: {
    ie: 11,
  },
  chainWebpack: (config, { webpack }) => {
    // 设置 alias
    config.resolve.alias.set('src',  path.resolve(__dirname, '../src'));
    // 删除进度条插件
    // config.plugins.delete('progress');
  }
};


