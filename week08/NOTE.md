# 第八周总结

### CSS基本语法,机制

#### 选择器语法

简单选择器
  * div svg | a
  * .cls
  * #id
  * [attr=value]
  * :hover
  * ::before (伪元素)

复合选择器
  * <简单选择器><简单选择器><简单选择器>
  * *或div必须写在最前面

复杂选择器
  * <复合选择器>`<space>`<复合选择器>
  * <复合选择器>">"<复合选择器>
  * <复合选择器>"~"<复合选择器>
  * <复合选择器>"+"<复合选择器>
  * <复合选择器>"||"<复合选择器>
  
选择器列表（以逗号分隔的）

// 为什么不推荐 BEM 的写法 ？ （block element ）
// css module 香不香？

#### 选择器优先级

简单选择器计数

`#id div.a#id {//......}`
[0,2,1,1]
S = 0*Ne3+2*Ne2+1*Ne1+1
取N = 1000000
S = 2000001000001

// [行内，id，class，标签] 四元组
- div#a.b .c[id=x]
  - div [0, 0, 0, 1]
  - div#a [0, 1, 0, 1]
  - div#a.b [0, 1, 1, 1]
  - div#a.b .c [0, 1, 2, 1]
  - div#a.b .c [0, 1, 3, 1]

// :not 不参与优先级计算
// *不改变优先级计算
// [attr=value]优先级等同.cls
// 复杂选择器就是各个简单选择器的优先级加起来，无论怎么组合

#### 伪类选择器

链接/行为
  * :any-link
  * `:link:visited`
  * :hover
  * :active
  * :focus
  * :target
 
树结构
  * :empty
  * :nth-child()
  * :nth-last-child()
  * :first-child :last-child :only-child

逻辑型
  * :not
  * where :has

其他
  * :checked 
  * :enabled 
  * :disabled
  * ......


#### 伪类元素
  * <::before/>
  * <::after/>
  * <::first-letter> 有一些可用属性
  * <::first-line> 有一些可用属性

Reference:
* https://www.w3.org/TR/selectors-4/#specificity-rules
* https://www.w3.org/wiki/Css/Training/Priority_level_of_selector
* https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity
* https://drafts.csswg.org/selectors-3/#specificity
* http://www.standardista.com/css3/css-specificity/

### CSS 排版

#### 盒子

标签（Tag） -- 源代码
元素（Element）-- 语义
盒（Box）-- 表现

标签（开始,结束,自封闭）
一对起始标签是一个元素
DOM树中的是元素和其他类型的节点（Node）
CSS选择器选中的是元素，在排版时可能产生多个盒 （inline，伪元素）
排版和渲染的基本单位是盒

[盒模型](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Box_Model/Introduction_to_the_CSS_box_model)

border, margin, padding, content, box-sizing (content-box, border-box)

#### 正常流

1. 收集进盒子
2. 计算盒在行中的排布
3. 计算行的排布

line-Box, block-box
IFC 上到下, BFC 左到右

#### 正常流行模型

文字 基线

使用 inline-block 注意这三个 top bottom middle

1.  Vertical-align: baseline，是拿自己的 baseline 去对其行的 baseline 
2.  Vertical-align: top，middle，bottom，是拿自己的 ”顶部“ “中线” ”底部“ 去对其行的 ”顶部“ “中线” ”底部“ 
3.  vertical-align: text-top，text-bottom，是拿自己的 ”顶部“ ”底部“ 去对齐行的 text-top 和 text-bottom 线吗？

// getClientRects() 

#### float 与 clear

建议文字环绕混排时使用 float

#### margin折叠

只发生在 BFC（上到下排列的盒子）

overflow:visible 边距合并

inline-block:可以当两部分看，对外面的它的兄弟节点来说，他是一个inline元素，对它包含的元素来说，他是一个可以包含block的container，建立BFC display: block 也就是display:block-block。

// flex是block level,不是block container,所以不产生bfc。

#### overflow:visible 与 BFC 

...

### Flex排版

* 收集盒进行
* 计算盒在主轴方向上的排布
* 计算盒在交叉轴方向上的排布


分行
  根据主轴尺寸，把元素分进行
  若设置了no-wrap,则强制行分配进第一行

计算主轴方向
  找出所有Flex元素
  把主轴方向的剩余尺寸按比例分配给这些元素
  若剩余空间为负数，所有flex元素为0，等比压缩剩余元素

计算交叉轴方向
  根据每一行最大元素尺寸计算行高
  根据行高flex-align和item-align，确定元素具体位置


也就是说container里面是正常流就是BFC，每一个都有一个BFC和若干个IFC

IFC：inline formatting context
BFC：block formatting context


Tips：
表现原则：如果一个元素具有 BFC，内部子元素再怎么折腾，都不会影响外部的元素。所以，BFC 元素是不可能发生 margin 重叠的，因为 margin 重叠是会影响外部的元素的；BFC 元素也可以用来清除浮动的影响，因为如果不清除，子元素浮动则父元素高度塌陷，必然会影响后面元素布局和定位，这显然有违 BFC 元素的子元素不会影响外部元素的设定。

block-level 表示可以被放入 bfc
block-container 表示可以容纳 bfc
block-box = block-level + block-container
block-box 如果 overflow 是 visible， 那么就跟父 bfc 合并


Reference:
* https://www.w3.org/TR/2018/CR-css-flexbox-1-20181119/#flex-items
* https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Box_Model/Introduction_to_the_CSS_box_model

