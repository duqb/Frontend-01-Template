/**
 * 
 * 遍历出realm所有对象
 * 使用g6图表数据可视化：https://g6.antv.vision/zh/docs/manual/introduction
 * reference: 参考了ele同学的代码 https://ele-peng.github.io/2020/05/08/Realm/
 */


/* 
var set = new Set();
var objects = [
  eval,
  isFinite,
  isNaN,
  parseFloat,
  parseInt,
  decodeURI,
  decodeURIComponent,
  encodeURI,
  encodeURIComponent,
  Array,
  Date,
  RegExp,
  Promise,
  Proxy,
  Map,
  WeakMap,
  Set,
  WeakSet,
  Function,
  Boolean,
  String,
  Number,
  Symbol,
  Object,
  Error,
  EvalError,
  RangeError,
  ReferenceError,
  SyntaxError,
  TypeError,
  URIError,
  ArrayBuffer,
  SharedArrayBuffer,
  DataView,
  Float32Array,
  Float64Array,
  Int8Array,
  Int16Array,
  Int32Array,
  Uint8Array,
  Uint16Array,
  Uint32Array,
  Uint8ClampedArray,
  Atomics,
  JSON,
  Math,
  Reflect
];
objects.forEach(o => set.add(o));

for (var i = 0; i < objects.length; i++) {
  var o = objects[i]
  for (var p of Object.getOwnPropertyNames(o)) {
    var d = Object.getOwnPropertyDescriptor(o, p)
    if ((d.value !== null && typeof d.value === "object") || (typeof d.value === "function"))
      if (!set.has(d.value))
        set.add(d.value), objects.push(d.value);
    if (d.get)
      if (!set.has(d.get))
        set.add(d.get), objects.push(d.get);
    if (d.set)
      if (!set.has(d.set))
        set.add(d.set), objects.push(d.set);
  }
}
 */


let objects = [
  "eval",
  "isFinite",
  "isNaN",
  "parseFloat",
  "parseInt",
  "decodeURI",
  "decodeURIComponent",
  "encodeURI",
  "encodeURIComponent",
  "Array",
  "Date",
  "RegExp",
  "Promise",
  "Proxy",
  "Map",
  "WeakMap",
  "Set",
  "WeakSet",
  "Function",
  "Boolean",
  "String",
  "Number",
  "Symbol",
  "Object",
  "Error",
  "EvalError",
  "RangeError",
  "ReferenceError",
  "SyntaxError",
  "TypeError",
  "URIError",
  "ArrayBuffer",
  "SharedArrayBuffer",
  "DataView",
  "Float32Array",
  "Float64Array",
  "Int8Array",
  "Int16Array",
  "Int32Array",
  "Uint8Array",
  "Uint16Array",
  "Uint32Array",
  "Uint8ClampedArray",
  "Atomics",
  "JSON",
  "Math",
  "Reflect"
];

const set = new Set();

const globalObject = [];

for (let i of objects) {
  globalObject.push({
    object: this[i],
    path: [i]
  })
}

while (globalObject.length) {
  const current = globalObject.shift();
  console.log(current.path.join('.'));
  if (set.has(current.object)) {
    continue;
  }
  set.add(current.object);

  let proto = Object.getPrototypeOf(current.object);
  if (proto) {
    globalObject.push({
      path: current.path.concat(['__proto__']),
      object: proto
    });
  }
  for (let p of Object.getOwnPropertyNames(current.object)) {
    let d = Object.getOwnPropertyDescriptor(current.object, p);
    if (d.hasOwnProperty('value') && ((d.value !== null && typeof d.value === 'object') || (typeof d.value === 'function')) && d.value instanceof Object) {
      globalObject.push({
        path: current.path.concat([p]),
        object: d.value
      });
    }
    if (d.hasOwnProperty('get') && typeof d.get === 'function') {
      globalObject.push({
        path: current.path.concat([p]),
        object: d.get
      });
    }
    if (d.hasOwnProperty('set') && typeof d.set === 'function') {
      globalObject.push({
        path: current.path.concat([p]),
        object: d.set
      });
    }
  }
}







/* 

const objects = [
  "eval",
  "isFinite",
  "isNaN",
  "parseFloat",
  "parseInt",
  "decodeURI",
  "decodeURIComponent",
  "encodeURI",
  "encodeURIComponent",
  "Array",
  "Date",
  "RegExp",
  "Promise",
  "Proxy",
  "Map",
  "WeakMap",
  "Set",
  "WeakSet",
  "Function",
  "Boolean",
  "String",
  "Number",
  "Symbol",
  "Object",
  "Error",
  "EvalError",
  "RangeError",
  "ReferenceError",
  "SyntaxError",
  "TypeError",
  "URIError",
  "ArrayBuffer",
  "SharedArrayBuffer",
  "DataView",
  "Float32Array",
  "Float64Array",
  "Int8Array",
  "Int16Array",
  "Int32Array",
  "Uint8Array",
  "Uint16Array",
  "Uint32Array",
  "Uint8ClampedArray",
  "Atomics",
  "JSON",
  "Math",
  "Reflect"
];

const set = new Set();

const globalObject = {
  id: "Global Object",
  children: [

  ]
}

for (let i of objects) {
  globalObject.children.push({
    children: [],
    id: i
  })
}


for (let i = 0; i < objects.length; i++) {
  const current = objects[i]
  if (set.has(objects[i]))
    continue;
  set.add(objects[i])
  for (let p of Object.getOwnPropertyNames(window[objects[i]])) {
    let d = Object.getOwnPropertyDescriptor(window[objects[i]], p)
    if (d.hasOwnProperty("value") && ((d.value !== null && typeof d.value === "object") || (typeof d.value === "function")) && d.value instanceof Object) {
      let childrenThird = []
      for (let k of Object.getOwnPropertyNames(d.value)) {
        if (k !== 'name' && k !== 'length') {
          childrenThird.push({ id: k })
        }
      }
      globalObject["children"][i].children.push({
        children: childrenThird,
        id: p
      })
    }
    if (d.hasOwnProperty("get") && typeof d.get === "function") {
      let childrenThird = []
      for (let k of Object.getOwnPropertyNames(d.get)) {
        if (k !== 'name' && k !== 'length') {
          childrenThird.push({ id: k })
        }
      }
      globalObject["children"][i].children.push({
        children: childrenThird,
        id: p
      })
    }
    if (d.hasOwnProperty("set") && typeof d.set === "function") {
      let childrenThird = []
      for (let k of Object.getOwnPropertyNames(d.set)) {
        if (k !== 'name' && k !== 'length') {
          childrenThird.push({ id: k })
        }
      }
      globalObject["children"][i].children.push({
        children: childrenThird,
        id: p
      })
    }
  }
}


 */












