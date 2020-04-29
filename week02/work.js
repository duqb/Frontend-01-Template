// 匹配所有 Number 直接量
function isNumber(str) {
  let result = /(^[01]+$)|(^[0-7]+\$)|(^-?\d+(\.\d+)?$)|(^0[xX][0-9a-fA-F]+$)/;
  return result.test(str);
}

// UTF-8 Encoding 
function UTF8_Encoding(str) {
  let result = [];
  let resultstr = '';
  let byteSize = 0;
  for (let i = 0; i < str.length; i++) {
    let code = str.charCodeAt(i);
    if (0x00 <= code && code <= 0x7f) {
      byteSize += 1;
      result.push(code);
    } else if (0x80 <= code && code <= 0x7ff) {
      byteSize += 2;
      result.push((192 | (31 & (code >> 6))));
      result.push((128 | (63 & code)))
    } else if ((0x800 <= code && code <= 0xd7ff)
      || (0xe000 <= code && code <= 0xffff)) {
      byteSize += 3;
      result.push((224 | (15 & (code >> 12))));
      result.push((128 | (63 & (code >> 6))));
      result.push((128 | (63 & code)))
    }
  }
  for (i = 0; i < result.length; i++) {
    result[i] &= 0xff;
    resultstr += result[i].toString(16);
  }
  return resultstr;
}

// 匹配所有的字符串直接量
function isString(str) {
  let result = /(^\'[\s\S]*[\w\W]*[\d\D]*\'$)|(^\"[\s\S]*[\w\W]*[\d\D]*\"$)|(^\`[\s\S]*[\w\W]*[\d\D]*\`$)/
  return result.test(str);
}





