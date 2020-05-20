# 第六周总结

## 浏览器工作原理 ：有限状态机
有限状态机处理字符串

#### 有限状态机

* 每一个状态都是一个机器
  * 每一个机器里，可以做计算，存储，输出...
  * 所有机器接的收输入是一致的
  * 状态机的每一个机器本身没有状态，如果我们用函数来表示的话，它应该是纯函数（无副作用）
* 每一个机器知道下一个状态
  * 每个机器都有确定的下一个状态是 Moore 状态机
  * 每个机器根据输入决定下一个状态是 Mealy 状态机

#### Mealy 状态机

[Mealy 状态机](https://zh.wikipedia.org/wiki/%E7%B1%B3%E5%88%A9%E5%9E%8B%E6%9C%89%E9%99%90%E7%8A%B6%E6%80%81%E6%9C%BA) 

```javascript
//每个函数是一个状态
function state(input) //函数参数就是输入
{
  //在函数中，可以自由地编写代码，处理每个状态的逻辑
  return next;//返回值作为下一个状态
}

//调用方式
while(input){
  //获取输入
  state = state(input); //把状态机的返回值作为下一个状态机
}
```



## 浏览器工作原理 ：HTTP协议与语法词法分析

#### HTML解析

第一步：拆分文件 （spiltFile）
  方便文件管理，把parser单独拆到文件中
  parser接受html文本作为参数，返回一颗DOM树

第二步：创建状态机（initFSM） [参考](https://html.spec.whatwg.org/multipage/parsing.html#before-attribute-name-state)
  * 参考：html.spec.whatwg.org: 12.2.5 Tokenization （直接写出了伪代码）
  * 用FSM(有限状态机)实现HTML的分析
  * 在html标准中已经规定了html的状态
  * toy-browser只选其中一部分状态，完成一个最简版本
  
第三步: 解析标签（ParserTag）
  * 主要的标签有：开始标签，结束标签，自封闭标签
  * 在这一步我们暂时忽略属性

第四步：创建元素（emitToken）
  * 在状态机中，除了状态迁移，我们还会要加入业务逻辑
  * 我们在标签结束状态提交标签token

第五步：处理属性（attribute）
  * 属性值分为单引号、双引号、无引号三种写法，因此需要较多状态处理
  * 属性结束时，我们把属性加到标签Token上

第六步：构建DOM树（constructTree）
  * 从标签构建DOM树的基本技巧是使用栈
  * 遇到开始标签时创建元素并入栈，遇到结束标签时出栈
  * 自封闭节点可视为入栈后立刻出栈
  * 任何元素的父元素是它入栈前的栈顶

第七步：文本节点（combineText）
  * 文本节点与自封闭标签处理类似
  * 多个文本节点需要合并



## 浏览器工作原理 ：CSS计算，排版，渲染，合成

#### CSS解析

第一步：收集CSS规则
  * 遇到style标签时，把CSS规则保存起来
  * 调用CSS Parser来分析CSS规则
  * 研究[这个库](http://npmjs.com/package/css)分析CSS规则的格式
 
第二步：添加调用
  * 创建一个元素后，立即计算CSS
  * 理论上当我们分析一个元素时，所有CSS规则已经收集完毕
  * 在真实浏览器中，可能遇到写body的style标签，需要重新CSS计算的情况，此处略

第三步：获取父元素序列
  * 在computeCSS函数中，我们必须知道元素的所有父元素才能判断元素与规则是否匹配
  * 从上一步的stack,可以获取本元素所有父元素
  * 因为我们首先获取的是“当前元素”，所以我们获得和计算父元素匹配的顺序是从内向外（div div #myid）

第四步：拆分选择器
  * 选择器也要从当前元素向外排列
  * 复杂选择器拆成针对单个元素的选择器，用循环匹配父元素队列

第五步：计算选择器与元素匹配
  * 根据选择器的类型和元素属性，计算是否与当前元素匹配
  * 这里仅仅实现三种基本选择器，实际的浏览器中要处理复合选择器

第六步：生成computed属性
  * 一旦选择匹配，就应用选择器到元素上，形成computedStyle

第七步：确定规则覆盖关系
  * CSS规则根据时specificity和后来优先规则覆盖
  * specificity是个四元组，越左边权重越高
  * 一个CSS规则的specificity根据包含的简单选择器相加而成


#### Flex 布局
第一步：收集元素进行
第二步：计算主轴
第三步：计算交叉轴

### 浏览器

URL(http) => HTML(parse) => DOM(css computing) =>DOM with CSS(layout) => DOM with position(render) => Bitmap



Reference:
* https://html.spec.whatwg.org/multipage/parsing.html#data-state
* https://html.spec.whatwg.org/multipage/parsing.html#tagopen-state
* https://html.spec.whatwg.org/multipage/parsing.html#parsing-main-inselect
* https://www.w3.org/TR/CSS2/
* https://github.com/wintercn/JSinJS
* https://juejin.im/post/5d8873526fb9a06b155dfbca （如何通过 link 异步加载 css，没有类似 script 的官方 async 属性）