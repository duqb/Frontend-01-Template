/**
 * convertStringToNumber
 */
function convertStringToNumber(string, x=10) {
  let chars = string.split('');
  let number = 0;
  let i = 0;
  while (i < chars.length && chars[i] !== '.') {
    number = number * x;
    number += chars[i].codePointAt(0) - '0'.codePointAt(0);
    i++;
  }
  if (chars[i] === '.') {
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
// console.log(convertStringToNumber('100010', 2));  // 10.0123


/**
 * convertNumberToString
 */
function convertNumberToString(number, x=10) {
  let integer = Math.floor(number);
  let fraction =  (x === 10 ? String(number).match(/\.\d*/)[0] : '');
  let string = '';
  while (integer > 0) {
    string = String(integer % x) + string;
    integer = Math.floor(integer / x);
  }
  return string + fraction;
}
// console.log(convertNumberToString(100, 10)); // 101.0123
