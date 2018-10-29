# 社区大数据平台
###### [API](http://192.168.110.28:8901/doc.html) | [YAPI](http://192.168.105.236:3000/group/168)
> 两江公安试点项目，代码禁止外传，
> 测试环境地址：暂无
> 开发环境地址：暂无

## 说明
- src/pages/.umi/下的文件为自动生成的配置文件，修改无效，请到config文件夹下修改
- 插件配置/路由配置/接口配置在config文件夹
- app.js为打包上线运行的node文件入口
- models可以配置为全局/页面级，推荐配置为页面级，方便迁移
- 推荐在render函数第一行从props取值，方便写propsType约束

## 帮助
  - 本项目经过中间工具的高度整合，省略了大量实现细节，不利于新人学习，现列出以下工具细节
  - js基础以及web技术参考: [MDN](https://developer.mozilla.org/zh-CN/)
  - es6基础 : [es6入门-阮一峰](http://es6.ruanyifeng.com/#docs/let)
  - react入门 [react中文文档](https://react.docschina.org/) / [官方文档](https://reactjs.org/)
  - react状态管理: redux入门 [中文文档](https://www.redux.org.cn/)
  - redux-saga redux异步解决方案 [API参考](https://redux-saga-in-chinese.js.org/docs/api/index.html)
  - dvajs 本项目采用的状态管理方案，整合以上两个工具 [官方文档](https://dvajs.com/)
  - react-router 前端路由解决方案 [官方文档](http://react-guide.github.io/react-router-cn/docs/API.html)
  - umijs 插件自动化配置 [配置详情](https://umijs.org/zh/)

## 特性

- :gem: **优雅美观**：基于 Ant Design 体系精心设计
- :triangular_ruler: **常见设计模式**：提炼自中后台应用的典型页面和场景
- :rocket: **最新技术栈**：使用 React/umi/dva/antd 等前端前沿技术开发
- :iphone: **响应式**：针对不同屏幕大小设计
- :art: **主题**：可配置的主题满足多样化的品牌诉求
- :globe_with_meridians: **国际化**：内建业界通用的国际化方案
- :gear: **最佳实践**：良好的工程实践助您持续产出高质量代码
- :1234: **Mock 数据**：实用的本地数据调试方案
- :white_check_mark: **UI 测试**：自动化测试保障前端产品质量

## 模板

- 结果
  - 成功页
  - 失败页
- 异常
  - 403 无权限
  - 404 找不到
  - 500 服务器出错
- 帐户
  - 登录
  - 注册
  - 注册成功
```

## 使用

$ npm install
$ npm start         # 访问 http://localhost:8000
npm run test     执行测试
```

## 支持环境

现代浏览器及 IE11。

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions


