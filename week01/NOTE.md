# 第一周总结

前端学习方法

## 构建前端知识体系

##### 前端技术
- 一、HTML
  - (一). HTML as计算机语言
    - 1.语法
    - 2.词法
  - (二). HTML as SGML
      - 1.DTD
      - 2.Entity ...
  - (三). HTML as XML
      - 1.Namespace
        - (1). svg
        - (2). mathml
        - (3). aria
      - 2.Tag
        - (1). html
        - (2). head
        - (3). title
        - (4). base
        - (5). link
        - (6). meta
        - (7). style
        - (8). body
        - (9). article
        - (10). section
        - (11). nav
        - (12). aside
        - (13). h1
        - (14). h2
        - (15). h3
        - (16). h4
        - (17). h5
        - (18). h6
        - (19). hgroup
        - (20). header
        - (21). footer
        - (22). address
        - (23). p
        - (24). hr
        - (25). pre
        - (26). blockquote
        - (27). ol
        - (28). ul
        - (29). menu
        - (30). li
        - (31). dl
        - (32). dt
        - (33). dd
        - (34). figure
        - (35). figcaption
        - (36). main
        - (37). div
        - (38). a
        - (39). em
        - (40). strong
        - (41). small
        - (42). s
        - (43). cite
        - (44). q
        - (45). dfn
        - (46). abbr
        - (47). ruby
        - (48). rt
        - (49). rp
        - (50). data
        - (51). time
        - (52). code
        - (53). var
        - (54). samp
        - (55). kbd
        - (56). sub
        - (57). sup
        - (58). i
        - (59). b
        - (60). u
        - (61). mark
        - (62). bdi
        - (63). bdo
        - (64). span
        - (65). br
        - (66). wbr
        - (67). a
        - (68). area
        - (69). ins
        - (70). del
        - (71). picture
        - (72). source
        - (73). img
        - (74). iframe
        - (75). embed
        - (76). object
        - (77). param
        - (78). video
        - (79). audio
        - (80). track
        - (81). map
        - (82). area
        - (83). table
        - (84). caption
        - (85). colgroup
        - (86). col
        - (87). tbody
        - (88). thead
        - (89). tfoot
        - (90). tr
        - (91). td
        - (92). th
        - (93). form
        - (94). label
        - (95). input
        - (96). button
        - (97). select
        - (98). datalist
        - (99). optgroup
        - (100). option
        - (101). textarea
        - (102). output
        - (103). progress
        - (104). meter
        - (105). fieldset
        - (106). legend
        - (107). details
        - (108). summary
        - (109). dialog
        - (110). script
        - (111). noscript
        - (112). template
        - (113). slot
        - (114). canvas
        - ...   

- 二、CSS
  - (一). 语法/词法
  - (二). @规则
  - (三). 普通规则
    - 1.选择器
      - (1). 简单选择器 
        - .cls
        - #id
        - tagname
        - \*
        - [attr=v]
      - (2). 复合选择器 
      - (3). 复杂选择器 
      - (4). 选择器列表 
    - 2.Property
    - 3.Value
  - (四). 机制
    - 1.排版
    - 2.伪元素
    - 3.动画
    - 4.优先级

- 三、JavaScrip
  - (一). Grammar
    - 1.Lex 
      - (1). WhiteSpace 
      - (2). LineTerminator 
      - (3). Comment
      - (4). Token
        - Identifier
        - Identifier
        - Keywords
        - Punctuator
        - NumericLiteral
        - StringLiteral
        - RegularExpressionLiteral
        - Template
    - 2.Syntax
      - (1). Atom
      - (2). Expression
      - (3). Structure
      - (4). Script & Module
  - (二). 语义(Semantics) 
  - (三). 运行时（Runtime）
    - 1.Type
      - Number
      - String
      - Boolean
      - Null
      - Undefined
      - Object
      - Symbol
      - 内部类型
        - Reference
        - Completion Record
        - RangeError
        - EvalError
        - SyntaxError
        - TypeError
        - URLError
        - Global
        - Math
    - 2.执行过程
      - Job
      - Script/Module
      - Promise
      - Function
      - Statement
      - Expression
      - Literal
      - Identifier

- 四、API
  - (一). Browser
    - 1.DOM
      - (1).Nodes
      - (2).Ranges
      - (3).Events
    - 2.Subtopic 2
  - (二). Node
  - (三). Electron
  - (四). 小程序



参考链接：
* https://www.w3.org/
* http://w3school.com/
* https://whatwg.org/
* https://scholar.google.com/
* https://developer.mozilla.org/
* https://docs.microsoft.com/
* https://developer.apple.com/
  
* https://www.ecma-international.org/
* https://developer.mozilla.org/en-US/docs/Web
* https://astexplorer.net //AST 语法树



## 前端工程体系

前端技能模型
1.领域知识
2.前端知识
3.三大能力：编程、架构、工程

#### 数据驱动的思考方式
* 目标：分析业务目标，定数据指标
* 现状：采集数据，建立数据展示系统
* 方案：设计技术方案，预估数据
* 实施：小规模实验，推广全公司落地，形成制度
* 结果：统计最终结果汇报
  
#### 架构
* 工具链
1.工具的分类 (阶段：init(脚手架) -> run(本地调试) -> test(单元测试) -> publish(发布))
2.工具链体系的设计 (版本问题/数据统计/持续集成)

* 持续集成
1.客户端软件持续集成 (Daily build / BVT(Build Verification Test)
2.前端持续集成 (Check-in build / Lint + Rule Check)

* 技术架构
1.客户端架构：解决软件需求规模带来的复杂性
2.服务端架构：解决大量用户访问带来的复杂性
3.前端架构：解决大量页面需求带来的重复劳动

* 库：有复用价值的代码(URL、AJAX、ENV)
* 组件： UI上多次出现的元素
* 模块： 经常被使用的业务区块
