# 第十周总结

### Range

Range API (属于dom api)
* var range = new Range()
* range.setStart(element,9)
* range.setEnd(element,4)
* var range = document.getSelection().getRangeAt(0);

* range.setStartBefore
* range.setEndBefore
* range.setStartAfter
* range.setEndAfter
* range.selectNode
* range.selectNodeContents

* var fragment = range.extractContents()
* range.insertNode(document.createTextNoe('aaa'))


### CSSOM

document.stylesheet

// data协议 : `<link rel="stylesheet" title="x" href="data:text/css,p%7Bcolor:blue%7D">`


Rules
* document.stylesheet[0].cssRules
* document.stylesheet[0].insertRule('p{color:pink;}',0)
* document.stylesheet[0].removeRule(0)

Rule

CSSStyleRule
  * selectorText String
  * style K-V结构

getComputedStyle
* window.getComputedStyle(ele,pseudoElt); 
  * ele 想要获取的元素
  * pseudoElt 可选，为元素


// DOM -> html , CSSOM -> css


CSSOM view

window || document
.open();
.moveBy();
.moveTo();
.resizeBy();
.scrollX();
.scrollY();
.scrollBy();
.scrollTo();
.scrollTop(); 
.scrollLeft();
.close();
.getClientReacts();
.innerWidth();
.innerHeight();
.outerWidth();
.outerHeight();

getBoundingClientReact();



Reference:
* https://spec.whatwg.org/
* https://zh.wikipedia.org/wiki/%E8%92%99%E5%9C%B0%E5%8D%A1%E7%BE%85%E6%96%B9%E6%B3%95