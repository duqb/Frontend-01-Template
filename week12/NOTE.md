# 第十二周总结

使用LL算法构建AST (正则表达式的强化训练)

()单独拿出来匹配  //正则（）带有子表达式效果 
?: 是正常的括号

Generator 是数组的超集 吐出来的是 Iterator 

模块化 组件化 //为了控制复杂性

**字符串分析算法**

* 字典树：大量字符串的完整模式匹配 O(m+n)
* KMP：长字符串中找子串
* WildCard: 通配符算法 长字符串中找子串升级版
* 正则：字符串通配模式匹配
* 状态机：通用字符串分析
* LL LR: 字符串多层级结构分析

LR： LR 分析器是一种自底向上（bottom-up）的上下文无关语法分析器
LL： LL 分析器是一种处理某些上下文无关文法的自顶向下分析器。

字典树
KMP
WildCard

Reference:
* https://zh.wikipedia.org/wiki/LR%E5%89%96%E6%9E%90%E5%99%A8
* https://zh.wikipedia.org/wiki/LL%E5%89%96%E6%9E%90%E5%99%A8
