# 第十七周总结

### 组件化 | Table组件和List组件



为什么JavaScript语言会有闭包？
闭包是可以代替递归的

```javascript
//没有名字的函数实现递归
function gen(a){
  return;
}

((f)=>{

})

(g=>
  (f=>f(f))(
    self =>
      g((...args)=>self(self).apply(this,args))
  ))(
    self => {
      return n => n > 0 ? self(n-1) + n : 0
    })(100)
//5050

var y = g => g
  (f => f(f))(
    self =>
      g((...args)=>self(self).apply(this,args))
  )

let f = y(self=>{
  return n => n > 0 ? self(n-1) + n : 0
})
f(100)
//5050

```

闭包是比函数具名递归更基础的一种语言特性
在函数式中函数替换的基础上加入了闭包，就是一个图灵完备的系统

有了闭包就有y, 有了y就有了递归，有了递归就是哥图灵完备的



### 工具链 | 整体理解一个工具链的设计

tools
  - 初始化
    - yeoman
    - create-react-app
    - vue-cli
    - angular/cli
  - 开发/调试
    - dev-tool/chrome
    - webpack-dev-server
    - mock
    - wireshark
    - charles/fiddler
    - vite
  - 测试
    - mocha
    - jest
  - 发布
    - lint
    - jenkins

三个框架初始化命令行设计基本类似，初始化工具基本决定后面工具的使用

Yeoman 是 generator（vue/react/ng是一个generator） 的 generator 
//yeoman是做cli的

//npm link 软链接  到 usr/local 目录下

Yeoman 大概三块核心功能
1. 从用户收集信息
2. npm 操作的能力
3. 对模板文件的操作


自研
* 基于字符串的模板操作
* 命令行操作




Reference:
* https://yeoman.io/
* https://stackoverflow.com/questions/10585683/how-do-you-edit-existing-text-and-move-the-cursor-around-in-the-terminal/10830168
* http://tldp.org/HOWTO/Bash-Prompt-HOWTO/x361.html
* https://github.com/heapwolf/cdir/blob/223fe0039fade4fad2bb08c2f7affac3bdcf2f89/cdir.js#L24









