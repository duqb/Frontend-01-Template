# 第九周总结

## CSS动画绘制

**Animation**
@keyframes定义
animation:使用
```css
@keyframes{
  from {background:red;}
  to {background:yellow;}
}
div{
  animation:mykf 5s infinite;
}
```

Animation
* animation-name 时间曲线
* animation-duration 动画时长
* animation-timing-function 动画的时间曲线
* animation-delay 动画开始前的延迟
* animation-iteration-count 播放次数
* animation-direction 动画的方向

```css
@keyframes mykf{
  0%{top:0; transition:top ease}
  50%{top:30%; transition:top ease-in}
  75%{top:10px; transition:top ease-out}
  100%{top:0; transition:top linear}
}
```

**Transition**
transition 使用

transition-property 要变换的属性
transition-duration 变换的时长
transition-timing-function 时间曲线
transition-delay 延迟

**cubic-bezier** （贝塞尔曲线）

P0 P1 t 1次贝塞尔曲线
P0 P1 P2 t 2次贝塞尔曲线
P0 P1 P2 P3 t 3次贝塞尔曲线

// 动画性能 用 transform
// gif动画性能较差 
// css动画 与 js动画 ？


## 渲染与颜色

颜色
人眼 红绿蓝
CMYK 与 RGB
HSL 与 HSV

形状
border
box-shadow
border-radius

形状 
data uri + svg
data:image/svg ...



Reference:
* https://cubic-bezier.com/#.17,.67,.83,.67)
* https://zh.wikipedia.org/wiki/%E8%B2%9D%E8%8C%B2%E6%9B%B2%E7%B7%9A
* https://www.w3school.com.cn/svg/index.asp


## 重学 HTML

### HTML的定义：XML与SGML 

DTD与XML namespace

// &nbsp; 与空格不同，是 no break space （会造成排版问题）

html中不能出现的字符（需要转意）：
<!ENTITY quot    "&#34;"> <!--  quotation mark, U+0022 ISOnum -->
<!ENTITY amp     "&#38;#38;"> <!--  ampersand, U+0026 ISOnum -->
<!ENTITY lt      "&#38;#60;"> <!--  less-than sign, U+003C ISOnum -->
<!ENTITY gt      "&#62;"> <!--  greater-than sign, U+003E ISOnum -->

&quot;(引号) &amp;(俺的符) &lt;(小于号) &gt;(大于号）

// white space 使用多个空格不合并, `<pre></pre>` 或者 style="white-space:pre-wrap"

dtd完整描述了html语言，html5不再支持dtd


### HTML标签语义

以页面 [World Wide Web](http://static001.geekbang.org/static/time/quote/World_Wide_Web-Wikipedia.html) 为例 描述标签语义

aside

hr 表示故事走向的转变或者话题的转变

p标签不能包含div


// TODO 示例html文档作为语义化学习


html 标签嵌套 (whatwg.org: 12.2.6.4 Tree construction)


### 合法元素
* Element<tagname>...</tagname>
* Text:text
* Comment:<!--comments-->
* DocumentType:<!Doctype html>
* ProcessingInstruction:<?a 1?>
* CDATA:<![CDATA[]]>

// toy-browser 以上几类补齐 就是真正的html parser了


字符应用
* &#161;
* &amp;
* &lt;
* &quot;

## 重学 DOM

- Node 
  - Element: 元素型节点，跟标签对应
    - HTMLElement
      -  HTMLAnchorElement
      -  HTMLAppletElement
      -  HTMLAreaElement
      -  HTMLAudioElement
      -  HTMLBaseElement
      -  HTMLBodyElement
      -  ...
    - SVGElement
      - SVGElement
      - SVGAltGlyphElement
      - ...
  - Document:文档根节点
  - CharacterData:字符数据
    - Text:文本节点
    - Comment:注释
    - ProcessingInstruction 处理信息
  - DocumentFragment:文档片段
  - DocumentType:文档类型

导航类操作
* parentNode
* childNode
* firstChild
* lastChild
* nextSibling
* previousSibling

修改操作
* appendChild
* insertBefore
* removeChild
* replaceChild


// 潜规则 所有的dom只有一个父元素 
// 二次插入 自动摘开？

高级操作
* compareDocumentPosition是一个用于比较两个节点中关系的函数
* contains 检查一个节点是否包含另一个节点的函数
* isEqualNode 检查两个节点是否完全相同
* isSameNode检查两个节点是否是同一个节点（实际直接用"==="即可）
* cloneNode复制一个节点，如果传入参数true,则会连同子元素做深拷贝
 
DOM api 只包含浏览器api的一部分 （BOM更少）

Event

冒泡 与 捕获

touch 与 click

埋点（服务端 客户端 业务 非入侵 数据体系 ） 


Browser API
  - DOM
    - Dom Tree
    - Events
    - Range
  - cssOM
  - BOM
  - Web Animation
  - Crypto


//css property 属性属于哪一个标准也标注出来


Reference:
* https://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd
* https://www.w3.org/1999/xhtml
* http://static001.geekbang.org/static/time/quote/World_Wide_Web-Wikipedia.html
* https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
* https://github.com/mathiasbynens/he
