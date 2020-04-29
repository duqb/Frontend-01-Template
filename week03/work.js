/**
 * convertStringToNumber
 */
function convertStringToNumber(string, x) {
  if (arguments.length < 2) {
    x = 10;
  }
  let chars = string.split('');
  let number = 0;
  let i = 0;
  while (i < chars.length && chars[i] !== '.') {
    number = number * x;
    number += chars[i].codePointAt(0) - '0'.codePointAt(0);
    i++;
  }
  let fraction = 1;
  while (i < chars.length) {
    fraction = fraction / x;
    number += chars[i].codePointAt(0) - '0'.codePointAt(0) * fraction;
    i++;
  }
  return number;
}
// console.log(convertStringToNumber('100010', 2));


/**
 * convertNumberToString
 */
function convertNumberToString(number, x) {
  let integer = Math.floor(number);
  let fraction = number - integer;
  let string = '';
  while (integer > 0) {
    string = String(integer % x) + string;
    integer = Math.floor(integer / x);
  }
  return string;
}
// console.log(convertNumberToString(100, 10));



/**
 * 找出 JavaScript 标准里有哪些对象是我们无法实现出来的，都有哪些特性？
 */

/*

Bound Function Exotic Objects 

 [[Call]]   [[Construct]]  

Array Exotic Objects 

 [[DefineOwnProperty]]   ArrayCreate(length[,proto])   ArraySpeciesCreate(originalArray,length)   ArraySetLength(A,Desc)  

String Exotic Objects 

 [[GetOwnProperty]]   [[DefineOwnProperty]]   [[OwnPropertyKeys]]   StringCreate(value,prototype)   StringGetOwnProperty(S,P)  

Arguments Exotic Objects 

 [[GetOwnProperty]]   [[DefineOwnProperty]]   [[Get]]   [[Set]]   [[Delete]]   CreateUnmappedArgumentsObject(argumentsList)   CreateMappedArgumentsObject(func,formals,argumentsList,env)  

Integer-Indexed Exotic Objects 

 [[GetOwnProperty]]   [[HasProperty]]   [[DefineOwnProperty]]   [[Get]]   [[Set]]   [[OwnPropertyKeys]]   IntegerIndexedObjectCreate(prototype,internalSlotsList)   IntegerIndexedElementGet(O,index)   IntegerIndexedElementSet(O,index,value)  

Module Namespace Exotic Objects 

 [[SetPrototypeOf]]   [[IsExtensible]]   [[PreventExtensions]]   [[GetOwnProperty]]   [[DefineOwnProperty]]   [[HasProperty]]   [[Get]]   [[Set]]   [[Delete]]   [[OwnPropertyKeys]]   ModuleNamespaceCreate(module,exports)  

Immutable Prototype Exotic Objects 

  [[SetPrototypeOf]]   SetImmutablePrototype  

*/


