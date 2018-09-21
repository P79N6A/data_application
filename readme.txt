

/mock 存放用于 mock 数据的文件；需要在roadhogrc.mock.js配置文件中引入/匹配url需要包含'mock-sax'

/public 一般用于存放静态文件，打包时会被直接复制到输出目录(./dist)；

/src 文件夹用于存放项目源代码；

/asserts 用于存放静态资源，打包时会经过 webpack 处理；

/components 用于存放 React 组件，一般是该项目公用的无状态组件；

/layouts 用于存放布局组件，一般用作路由入口

/models 用于存放模型文件

/routes 用于存放需要 connect model 的路由组件；

/services 用于存放服务文件，一般是网络请求等；

/utils 工具类库

router.js 路由文件

index.js 项目的入口文件

index.css 一般是共用的样式

gulpfile.js gulp入口文件,用于自动化操作如代码检查等

config.js 设置浏览器全局变量，设置接口ip等

.editorconfig 编辑器配置文件

.eslintrc ESLint配置文件

.gitignore Git忽略文件

.roadhogrc.mock.js Mock配置文件

.webpackrc 自定义的webpack配置文件，JSON格式，如果需要 JS 格式，可修改为 .webpackrc.js


