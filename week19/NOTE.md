# 第十九周总结


### 工具链 | 目录结构与初始化工具


使用 yeoman 串起来


Reference:
* https://yeoman.io/authoring/index.html
* https://ubuntu.com/download/desktop
* https://www.virtualbox.org/wiki/Downloads
* https://webpack.js.org/api/node/#compiler-instance


### 发布系统 | 实现一个线上 Web 服务


1. publish server 里给 server 添加一些文件
2. 通过 http 请求去指定文件内容
3. 编写命令行 publish 工具访问 publish server
4. publish server 根据 publish tool 添加文件

// createWriteStream 将流接到文件上
// req.pipe(writeStream) 将http接到文件这个流上的内容

jenkins

Reference:
* https://www.jianshu.com/p/f3dad64d896a
* https://expressjs.com/en/starter/installing.html
* https://nodejs.org/docs/latest-v13.x/api/fs.html
* http://expressjs.com/en/5x/api.html#app.post.method
* https://github.com/EvanOxfeld/node-unzip/issues/122
* https://www.npmjs.com/package/unzipper
* https://www.npmjs.com/package/archiver
* https://www.jenkins.io/