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






