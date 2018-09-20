const path = require('path');
const config = require('./config.json');


export default {
  extraBabelPlugins: [['import', {libraryName: 'antd', libraryDirectory: 'es', style: true}]],

  env: {
    development: {
      extraBabelPlugins: ['dva-hmr'],
      define: {
        "process.env.apiOrigin": config.development.apiOrigin,
        "process.env.development": config.development.development,
        "process.env.logApiOrigin": config.development.logApiOrigin,
        "process.env.sysName": config.development.sysName
      },
      html: {
        template: './src/index.ejs'
      },
    },
    production: {
      define: {
        "process.env.apiOrigin": config.production.apiOrigin,
        "process.env.development": config.production.development,
        "process.env.logApiOrigin": config.production.logApiOrigin,
        "process.env.sysName": config.production.sysName,
      },
      html: {
        template: './src/index.ejs',
        filename: path.resolve(__dirname, 'index.html')
      },
    }
  },
  alias: {
    components: path.resolve(__dirname, 'src/components/'),
    utils: path.resolve(__dirname, 'src/utils/'),
    assets: path.resolve(__dirname, 'src/assets')
  },
  ignoreMomentLocale: true,
  disableDynamicImport: false,
  publicPath: '/',
  hash: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  proxy: {
    "/mock": {
      "target": "http://mock4/",
      "changeOrigin": true
    }
  },
};

