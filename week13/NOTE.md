# 第十三周总结

### Proxy 与 双向绑定

### 组件化基础

#### 对象与组件

对象
* Properties
* Methods
* Inherit

组件
* Properties
* Methods
* Inherit
* Attribute
* Config & State
* Event
* Lifecycle
* Children

#### Component

End User Input -> State -> Children 

Component User's Markup Code 
* attribute

Component User's JS Code
* Method
* Property
* Event
  

Attribute：
Attribute 强调描述性
<my-component attribute="v" />
myComponent.getAttribute("a");
myComponent.setAttribute("a","value");
//标记语言和js都可以设置

Property：
Property 强调从属关系
myComponent.a="value";
//只能在js语言中设置

Attribute，Property区别：
```html
<div class="clas1 clas2"></div>
<script>
  var div = document.getElementsByTagName('div');
  div.className //cls1 cls2
</script>

<div class="clas1 clas2" style="color:blue"></div>
<script>
  var div = document.getElementsByTagName('div');
  div.style //对象
</script>

<a href="//baidu.com"></a>
<script>
  var a = document.getElementsByTagName('a');
  a.href // "http://baidu.com" ,URL是resolve过的结果
  a.getAttribute('href') // "//baidu.com" ,跟html代码中完全一致
</script>

<input value="cute">
<script>
  var input = document.getElementsByTagName('input');//property 没有设置，则结果是 attribute
  input.value //cute
  input.getAttribute('value'); //cute
  input.value = 'hello' //若value属性已经设置，则 attribute 不变，property 变化，元素实际效果是 property 优先
  input.value //hello
  input.getAttribute('value'); //cute
</script>

```


#### 如何设计组件状态

          
| Markup set | Js set | JS Change | User Input Change |         |
| :----:     | :----: | :----:    | :----:            | :----:   |
| x          | v      |  v        |  ?                | property |
| v          | v      |  v        |  ?                |attribute |
| x          | x      |  x        |  v                |state     |
| x          | v      |  x        |  x                |config    |

#### Lifecycle

created -> ? -> destroyed

created mount unmount destroyed
created JS change/set render/update destroyed
created User Input render/update destroyed

// react 有变化就 render
// react 只有 Attribute 没有 Property 两者不区分


#### Children

Content 型 Children 与 Template 型 Children
```html
<my-button><img src="{{icon}}" />{{title}}</my-button>
<my-list>
  <li><img scr="{{icon}}" />{{title}}</li>
</my-list>
```




