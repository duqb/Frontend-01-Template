# 第二十一周总结

###  发布系统 | GitHook 与工程体系整合

pre-commit: 可以 执行 Lint,  执行单元测试, 执行 check

```javascript
// pre-commit ./git/hooks
#!/usr/bin/env node

const process = require("process");
const child_process = require("child_process");
const { ESlint } = require("eslint");

// console.log('hook is running');
// process.exit(1);

function exec(command) {
  return new Promise(resolve => {
    child_process.exec(command, resolve);
  });
} 

(async function main() {

  // 1. Create an instance.
  const eslint = new ESlint();

  // 2. Lint files.
  await exec("git stash save -q --keep-index")
  const results = await eslint.lintFiles(["./main.js"]);
  await exec("git stash pop");

  // 3. Format the result.
  const formatter = await eslint.loadFormatter("stylish");
  const resultText = formatter.format(results);

  // 4.Output it.
  console.log(resultText);

  for (let result of results) {
    if (result.errorCount > 0) {
      process.exitCode = 1;
    }
  }

})().catch((error) => {
  process.exitCode = 1;
  console.log(error);
});
```


pre-push: 可以 检查分支是否可以提交 

pre-receive: 服务端部署 git 你 push 后会执行

shift + command + . // mac 访达中显示隐藏文件

const util = require('util');const exec = util.promisify(require('child_process').exec); // 可以使用同步语法

gitLab Webhook 看文档即可

整个工具 generator 之后出来的 基本所有的东西都一体化了

// 一般推荐在 commit 前走一下 lint


Reference:
* https://cn.eslint.org/docs/developer-guide/nodejs-api
* https://eslint.org/docs/developer-guide/nodejs-api
* https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks
* https://github.com/okonet/lint-staged




### QA

对于源码了解到toy-react，其他细节深究？
A：太深入也很少能用到

前端可视化方向
A: 自己是否适合 是否有兴趣

面试问底层原理，比如fiber，hooks
A：面试有不会的很正常 

面中级前端问些什么好
A：他说擅长的地方 顺着一个一个问， 编程这种写写代码讲讲，挑最好的地方往深了问

规划自己技术路线的成长
A：有成就 之前有一节课可参考

照着leetcode出题
A：多刷刷呗 很友好的平台

试着带人，带团队，要懂些什么
A：p6带人带业务把项目搞好 p7领域内组件化/工具链/持续集成等 p8带整个前端团队

一些css效果什么的写写blog 网上分享分享 仿照做做 持续积累
鼓励二次传播传授知识
b站掘金infoQ
刷题



