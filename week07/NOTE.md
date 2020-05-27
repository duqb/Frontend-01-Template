# 第七周总结

## 浏览器工作原理：CSS计算,排版,渲染,合成

浏览器 Layout (排版/布局) 3代：
1.Normal flow (正常流 ) block,inline,position,float,clear,...
2.Flexbox (弹性盒子)
3.Grid (网格)

#### Flex 布局
第一步：收集元素进行hang
分行
根据主轴尺寸，把元素分进行
若设置了no-wrap,则强行分配进第一行

第二步：计算主轴
计算主轴方向
找出所有Flex元素
把主轴方向的剩余尺寸按比例分配给这些元素
若剩余空间为负数，所有flex元素为0,等比压缩剩余元素

第三步：计算交叉轴
计算交叉轴方向
根据每一行中最大元素尺寸计算行高
根据行号flex-align和item-align,确定元素具体位置

主轴 交叉轴

浏览器

第一步：绘制单个元素
  * 绘制需要依赖一个图形环境
  * 我们这里采用npm包images
  * 绘制在一个viewport上进行
  * 与绘制相关的属性：background-color/border/background-image等

第二步：绘制DOM
  * 递归调用子元素的绘制方法完成DOM树的绘制
  * 忽略一些不需要绘制的节点
  * 实际浏览器中，文字绘制是难点，需要依赖字体库，我们这里忽略
  * 实际浏览器中，还会对一些图层做compositing，我们这里忽略


Reference:
* https://www.runoob.com/w3cnote/flex-grammar.html
* https://github.com/spritejs/sprite-core/commit/8757b4d3888b4f237b1089e94e075ab58ca952a6#diff-677d382da9f8d81f61d50af24f937b32R32
* https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content
* https://www.npmjs.com/package/images



## CSS基本语法/基础机制

CSS总体结构:
@charset
@import
rules (at-rule / rule)

At-rule
* [@charset](https://www.w3.org/TR/css-page-3/)
* [@import](https://www.w3.org/TR/css-cascade-4/)
* [@media](https://www.w3.org/TR/css3-conditional/)
* [@page](https://www.w3.org/TR/css-page-3/)
* [@counter-style](https://www.w3.org/TR/css-counter-styles-3)
* [@keyframes](https://www.w3.org/TR/css-animations-1/)
* [@font-face](https://www.w3.org/TR/css-fonts-3/)
* [@supports](https://www.w3.org/TR/css3-conditional/)
* [@namespaces](https://www.w3.org/TR/css-namespaces-3/)

Selector
  * https://www.w3.org/TR/selectors-3/
  * https://www.w3.org/TR/selectors-4/

Key
  * Properties
  * Variables: https://www.w3.org/TR/css-variables/

Value
  * https://www.w3.org/TR/css-values-4/


收集CSS标准文档:

```javascript

let list = document.getElementById("container").children;
let result = [];
for(let li of list) {
    if(li.getAttribute('data-tag').match(/css/));
        result.push({
            name:li.children[1].innerText,
            url:li.children[1].children[0].href
        });
}
console.log(result);
console.log(JSON.stringify(result, ' ', null));

```

收集CSS属性相关标准:

```javascript

// @params [] standards json
let iframe = document.createElement("iframe");
document.body.innerHTML = "";
document.body.appendChild(iframe);
function happen(element, event){
    return new Promise(function(resolve){
        let handler = () => {
            resolve();
            element.removeEventListener(event, handler);
        }
        element.addEventListener(event, handler);
    })
}
void async function(){
    for(let standard of standards) {
        iframe.src = standard.url;
        console.log(standard.name);
        await happen(iframe, "load");
    }
}();

```


Reference:
* https://www.w3.org/TR/CSS21/grammar.html#q25.0
* https://www.w3.org/TR/css-syntax-3
* https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context
* 手机淘宝的flexible设计与实现: http://www.html-js.com/article/2402
* 小实验收集： https://www.w3.org/TR/?tag=css


