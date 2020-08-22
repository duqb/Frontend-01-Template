# 第十八周总结


### 工具链 | 设计并实现一个构建工具与调试工具

Dev工具

Server
* build: webpack babel vue jsx postcss ...
* watch: fsevent
* mock: ...
* http: ws

Client
* debugger: vscode devtool
* source map

**fsevents** 的作用是 监听文件的变化

**webpack-dev-server** 整合了 build watch http

**debugger**
node 启动 debugger 的 server 与 v8 在同一个进程中，vscode 通过 websocket 与server 通讯，传递 debug 命令。

fsevents 结合 http-server 做 watcher,hotreload


Reference:
* https://github.com/fsevents/fsevents/




### 工具链 | 单元测试


单元测试 
* 自动化的结果评判
* case 容易管理

大型比较复杂的项目 单元测试的威力就显现出来了

测试用例 代码覆盖率

测试报告100%通过 覆盖报告提高到较高水平90%以上吧

// webpack 用 import 需要 package.json 加入 type:module 和 node v14+

// dom测试一般用无头浏览器

主要代码行覆盖率 覆盖基础库




```
// ava 基于 mocha
package.json
"ava": {
  "files": [
    "test/*.js"
  ],
  "require": [
    "@babel/register"
  ],
  "babel": {
    "testOptions": {
      "babelrc": true
    }
  }
}
```

Reference:
* https://mochajs.org/
* https://www.npmjs.com/package/nyc
* https://github.com/avajs/ava
* https://github.com/standard-things/esm
* https://github.com/spritejs/sprite-core
* https://www.jianshu.com/p/03123c388005
* https://github.com/jzhang026/esmodule-mocha-boilerplate



















