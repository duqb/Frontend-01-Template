# 第三周总结

## JavaScript 表达式，类型转换

### Expression (表达式)

- Tree vs Priority
  - +-
  - */
  - ()

- Member

  - a.b
  - `a[b]`
  - foo \`string\`
  - suber.b 这个只能在构造函数中使用 

  ```
  class foo{
  	constructor(){
  		console.log()
  	}
  }
  ```

  - New

    new Foo

  - Call

    ```
    foo()
    super()
    foo()[b]
    foo().b
    foo()`string`
    ```

  #### Right Handside

  - Update

    ```
    a++
    a--
    --a
    ++a
    ```

  - Unary

    ```
    delete a.b
    void 0; // 生成undefined
    typeof a
    +a
    -a
    ~a
    !a // !!a 转换为boolean值
    await a
    ```

  - Exponental

    **

  - Multiplicative

    \* / %

  - Additive

    - - 

  - Shift

    << >> >>>

  - Relationship

    < > <= >= instanceof in

  - Equality

    ```
    ==
    !=
    ===
    !==
    ```

  - Bitwise 位运算

    & ^ |

  - Logical

    && ||

    短路逻辑

    ```
    a && b  a为true时，b才会执行
    a || b  a或b为true，a或b才会执行
    ```

  - Conditional

    ? :

  ### 类型转换

  - 基础类型

    - Undefined
    - Boolean
    - String
    - Number
    - Null
    - Symbol
    - BigInt
    - Object

  - 装箱拆箱

    装箱：基础类型 => 包装类型 `Boolean String Boolean ...`

    拆箱：包装类型(Object) => 基础类型, 会优先调用`valueOf toString toPrimitive`进行转换

  - 类型的判断

    - typeof
    - Obejct.prototype.toString.call
    - instanceof

  - 隐式转换发生的场景

    - Left Handside Right Handside

      左右取值，转换为原始值，如果转换后的值存在string, 则进行toString后拼接。否则按toNumber处理

    - ==

      优先按照number处理

    - if

      优先按照boolean处理

    - 数学运算符

      优先转换非number为number









## JavaScript 语句，对象


- 简单语句

  - ExpressionStatement（计算）
  - EmptyStatement
  - DebuggerStatement（调试）
  - ThrowStatement（throw 表达式）
  - ContinueStatement（continue label）
  - BreakStatement（break label）
  - ReturnStatement（return 表达式）

- 组合语句

  - BlockStatement（const let 块级作用域）

    ```
    {
      
    }
    ```

    - `[[type]]`: normal (block内产生了非normal的结果时，后面的语句将不再执行)
    - `[[value]]`: --
    - `[[target]]`: --
  - IfStatement
  - SwitchStatement
  - LeabelledStatement
  - IterationStatement

    ```
    while()
    do while()
    for( ; ; )
    for( in )
    for( of )
    for await(of)
    ```

    for 语句内部可以声明const let, 故for语句内部会产生一个外层的作用域(block之外)

  - TryStatement

    ```
    try {
    
    } catch () {
    
    } finally {
    
    }
    ```

    - `[[type]]`: return
    - `[[value]]`: --
    - `[[target]]`: label

  target=label类型的语句只在IterationStatement内有效果

- 声明

  - FunctionDeclaration

    ```
    function foo() {} //函数声明 
    var o = function foo() {} // 函数表达式
    ```

  - GeneratorDeclaration

    ```
    function* foo() {
    	yield 1;
    }
    let g = foo();
    g.next().value;
    ```

  - AsyncFunctionDeclaration

    ```
    async function foo() {
      await xxx;
    }
    ```

  - AsyncGeneratorDeclaration

    ```
    async function* gen() {
      await xxx;
    }
    ```

  - VariableStatement

    ```
    var let const
    ```

  - ClassDeclaration

    ```
    class foo {}
    ```

  - LexicalDeclaration

##### Runtime

- Completion Record
  - `[[type]]`: mormal, break, continue, return, or throw
  - `[[value]]`: Types
  - `[[target]]`: label
- Lexical Enviorment

##### 预处理/变量提升

```
var a = 2;
void function() {
  a = 1;
  return;
  var a; // const a
}()
```

var 变量声明和函数声明会预处理。
var 值预处理声明部分，函数预处理整体

##### 作用域

函数的执行上下文，在多层作用域中进行LHS和RHS操作，直到找到为止，形成作用域链

#### Object

**状态 行为 唯一性**

架构合理性： 封装(内聚) 复用 解耦，继承（面向对象子系统），多态

##### 基于类的面向对象 Object-Class

基类，interface，mixin

##### Prototype

##### 抽象对象时，应该遵循‘行为改变状态’的原则，行为改变自身状态。不应该按照语言描述的行为进行设计。

##### Object in JavaScript

- Property

  - Key
    - Symbol
    - String
  - Value
    - Data Property
      - `[[value]]`
      - writable
      - emumerable
      - configurable
    - Accessor Property
      - get
      - set
      - emumerable
      - configurable

- `[[Prototype]]`  

##### Object API

- 基础API： `{} . [] Object.defineProperty`
- 原型API： `Object.create Object.setPrototypeOf Object.getPrototypeOf`
- 基于类的面向对象API(模拟)： `new class extends`
- 基于原型的面向对象API： `new function prototype`

https://www.ecma-international.org/publications/standards/Ecma-262.htm


### JavaScript 标准里我们无法实现出来的对象以及特性
 
特殊行为的对象（常见的下标运算或者设置原型跟普通对象不同）

#### bind 后的 function （Bound Function Exotic Objects ）
- 跟原来的函数相关联。
- [[BoundTargetFunction]] 包装的函数对象。
- [[BoundThis]] 作为this
- [[BoundArguments]] 其他参数
- [[Call]] ( thisArgument, argumentsList )
- [[Construct]] ( argumentsList, newTarget )
- BoundFunctionCreate ( targetFunction, boundThis, boundArgs )

#### Array (Array Exotic Objects )
- 每个Array都有一个不可设置的"length"属性，根据最大的下标自动发生变化。
- 为内置方法[[DefineOwnProperty]]提供了新的定义

#### String (String Exotic Objects )
- 每个String都有一个不可写且不可设置的"length"属性，同样也支持下标运算。
<!-- - [[GetOwnProperty]] [[DefineOwnProperty]] [[OwnPropertyKeys]] 有新定义 -->

#### Arguments：(Arguments Exotic Objects )
- arguments 的非负整数型下标属性跟对应的变量联动。
- [[ParameterMap]]
<!-- - [[GetOwnProperty]] ( P )
- [[DefineOwnProperty]] ( P, Desc )
-  [[Get]] ( P, Receiver )
-  [[Set]] ( P, V, Receiver )
-  [[Delete]] ( P ) -->

#### Integer Indexed (Integer-Indexed Exotic Objects )
- 类型数组和数组缓冲区：跟内存块相关联，下标运算比较特殊。
- [[ViewedArrayBuffer]]
- [[ArrayLength]] 
- [[ByteOffset]]
- [[TypedArrayName]] 

#### 模块的 namespace 对象 (Module Namespace Exotic Objects )
- 特殊的地方非常多，跟一般对象完全不一样，尽量只用于 import 
- [[Module]] 命名空间对应的模块导出记录
- [[Exports]] 一个已经排序的列表，存储导出的模块名称字符串
- [[Prototype]] null

#### Immutable Prototype (Immutable Prototype Exotic Objects )
- Object.prototype：作为所有正常对象的默认原型，不能再给它设置原型了。
-  [[Prototype]]不变
