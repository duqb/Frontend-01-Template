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

对于源码的话，是不是了解到toy-react的程度就足够了，其他细节没必要深究。
A：太深入也 很少能用到

老师，前端可视化方向值得投入吗？谢谢！最近正在学习月影老师的课程。
A: 自己是否适合 是否有兴趣

面试的时候总会被问到一些底层原理，比如fiber，比如hooks原理，之前不了解，就感觉很尴尬
A：面试有不会的很正常 

老师  面试中级前端我应该问些什么好
A： 他说擅长的地方 顺着一个一个问， 编程这种谢谢代码讲讲，挑最好的地方往深了问

去大厂怎么规划自己技术路线的成长和报告成果和自我营销呢？
A：有成就 那节

腾讯特别喜欢照着leetcode出题
A：多刷刷呗 很友好的平台

想试着带人，带团队，需要懂些什么呢
A：p6带人带业务把项目搞好 p7领域内组件化/工具链/持续集成等 p8带前端团队

一些css效果什么的谢谢blog 网上分享分享 仿照做做 

鼓励二次传播传授知识（老师也不是原创）

b站掘金infoQ

刷题




