# 第二周总结

## 编程语言通识

### 按语法分类

非形式语言：中文 英文

形式语言：(乔姆斯基谱系)
```
0型: 无限制文法 ?::=?
1型: 上下文相关文法 ?<A>?::=?<B>?
2型: 上下文无关文法 <A>::=?  (js基本上是上下文无关)
3型: 正则文法 <A>::=<A>?  （限制表达能力）
```

### 产生式 BNF

其他EBNF ABNF

语法结构名（用尖括号括起来）

语法结构分为： 
    基础结构 /终结符
    复合结构 /非终结符 (用其他语法结构定义)

* 引号和中间的字符表示终结符
* 可以有括号 
* *表示重复多次
* |表示或
* +表示至少一次

```
<Number> = "0" | "1" | "2" | ..... | "9"

<DecimalNumber> = "0" | (("1" | "2" | ..... | "9") <Number>* )

<PrimaryExpression> = <DecimalNumber> |
    "(" <LogicalExpression> ")"

<MultiplicativeExpression> = <PrimaryExpression> | 
    <MultiplicativeExpression> "*" <PrimaryExpression>| 
    <MultiplicativeExpression> "/" <PrimaryExpression>

<AdditiveExpression> = <MultiplicativeExpression> | 
    <AdditiveExpression> "+" <MultiplicativeExpression>| 
    <AdditiveExpression> "-" <MultiplicativeExpression>

<LogicalExpression> = <AdditiveExpression> | 
    <LogicalExpression> "||" <AdditiveExpression> | 
    <LogicalExpression> "&&" <AdditiveExpression>
```

### 图灵完备性

[图灵完备性](https://zh.wikipedia.org/wiki/%E5%9C%96%E9%9D%88%E5%AE%8C%E5%82%99%E6%80%A7)

命令式--图灵机 （goto / if和while）
声明式--lambda （递归 / 分治 ）

### 类型系统

动态与静态
动态：在用户的设备/在线服务器，产品实际运行时，Runtime
静态：在程序员的设备上，产品开发时，Compiletime
类型系统：动态类型/静态类型/强类型（无隐式转换）/若类型（有隐式转换）/复合类型（结构体，函数签名）/子类型（逆变/协议）


**Reference:**

终结符： 最终在代码中出现的字符（ https://zh.wikipedia.org/wiki/ 终结符与非终结符）
产生式： 在计算机中指 Tiger 编译器将源程序经过词法分析（Lexical Analysis）和语法分析（Syntax Analysis）后得到的一系列符合文法规则（Backus-Naur Form，BNF）的语句
静态和动态语言： https://www.cnblogs.com/raind/p/8551791.html
协变与逆变： https://jkchao.github.io/typescript-book-chinese/tips/covarianceAndContravariance.html
Yacc 与 Lex 快速入门： https://www.ibm.com/developerworks/cn/linux/sdk/lex/index.html
关于元编程： https://www.zhihu.com/question/23856985
编程语言的自举： https://www.cnblogs.com/lidyan/p/6727184.html
ECMA-262 Grammar Summary 部分
https://www.jianshu.com/p/15efcb0c06c8

乔姆斯基谱系：https://zh.wikipedia.org/wiki/%E4%B9%94%E5%A7%86%E6%96%AF%E5%9F%BA%E8%B0%B1%E7%B3%BB
Brainfuck ：https://zh.wikipedia.org/wiki/Brainfuck
巴科斯诺尔范式：https://zh.wikipedia.org/wiki/%E5%B7%B4%E7%A7%91%E6%96%AF%E8%8C%83%E5%BC%8F
图灵机（Turing machine）：https://zh.wikipedia.org/wiki/%E5%9B%BE%E7%81%B5%E6%9C%BA
图灵完备性：https://zh.wikipedia.org/wiki/%E5%9C%96%E9%9D%88%E5%AE%8C%E5%82%99%E6%80%A7
Bjarne Stroustrup（比雅尼·斯特劳斯特鲁普）：https://zh.wikipedia.org/wiki/%E6%AF%94%E9%9B%85%E5%B0%BC%C2%B7%E6%96%AF%E7%89%B9%E5%8A%B3%E6%96%AF%E7%89%B9%E9%B2%81%E6%99%AE

## JavaScript 词法，类型

### Unicode

[Unicode](https://www.fileformat.info/info/unicode/)
[中文字符](https://www.fileformat.info/info/unicode/block/cjk_unified_ideographs/index.htm)
[BMP](https://zh.wikipedia.org/wiki/Unicode字符平面映射) 基本字符
[Blocks](https://www.fileformat.info/info/unicode/block/index.htm)
打印 code  `String.fromCharCode(num)` `'\t'.codePointAt()` 
CJK 字符判断
最好只用 ASCII 字符

## InputElement

1. WhiteSpace: TAB VT FF SP NBSP [其他space](https://www.fileformat.info/info/unicode/category/Zs/list.htm)    
2. LineTerminator: LF CR LS PS
3. Comment (// /**/)
4. Token: 一切有效的东西
    * Punctuator: 符号
    * IdentifierName: 标识符 (变量名 属性名 关键字 enum)
    * Literal: 直接量 (NumericLiteral / StringLiteral)
    * Template

### Types

1. Number: （IEEE 754 Double Float，浮点数比较时，需要加精度）
   * DecimalLiteral 小数（ 0 | 0. | .2 | 1e3 ）
   * BinaryIntegerLiteral 二进制 ( 0b111 )
   * OctallIntegerLiteral 八进制 ( Oo10 )
   * HexIntegerLiteral 十六进制 ( OxFF )
2. String
   * ASCII Unicode UCS GB ISO-8859 BIG5
   * Character 字符
   * Code point 码点
   * Encoding UTF
   * "" '' ``
3. Boolean (true false)
4. Null 
5. Undifined
6. Object
7. Symbol

**Reference:**

https://home.unicode.org/
Unicode https://www.fileformat.info/info/unicode/
中文字符 https://www.fileformat.info/info/unicode/block/cjk_unified_ideographs/index.htm
计算浮点数的一个工具： https://github.com/camsong/blog/issues/9
正则表达式： https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions
揭秘 0.1 + 0.2 != 0.3 https://www.barretlee.com/blog/2016/09/28/ieee754-operation-in-js/
ASCII，Unicode 和 UTF-8 ： http://www.ruanyifeng.com/blog/2007/10/ascii_unicode_and_utf-8.html

字符集：https://zh.wikipedia.org/zh/%E5%AD%97%E7%AC%A6%E7%BC%96%E7%A0%81
Unicode ：https://zh.wikipedia.org/zh-hans/Unicode
ASCII ：https://zh.wikipedia.org/wiki/ASCII
Token：记号、标记。JS 里有效的输入元素都可以叫 Token。
NBSP ：https://zh.wikipedia.org/wiki/%E4%B8%8D%E6%8D%A2%E8%A1%8C%E7%A9%BA%E6%A0%BC
零宽空格：https://zh.wikipedia.org/zh-hans/%E9%9B%B6%E5%AE%BD%E7%A9%BA%E6%A0%BC




