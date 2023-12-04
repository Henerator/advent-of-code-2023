const fs = require('fs');

// const input = ['1abc2', 'pqr3stu8vwx', 'a1b2c3d4e5f', 'treb7uchet'];
const input = fs.readFileSync('./1-day/input.txt', 'utf-8').split(/\r?\n/).filter(Boolean);

function getLineValue(line) {
  line = line.replace(/^[^\d]+/, '');
  line = line.replace(/[^\d]+$/, '');
  return Number(line.at(0) + line.at(-1));
}

function getSum(lines) {
  return lines.reduce((sum, line) => sum + getLineValue(line), 0);
}

// console.log(getSum(input));

// Part 2

// const input2 = [
//   'two1nine',
//   'eightwothree',
//   'abcone2threexyz',
//   'xtwone3four',
//   '4nineeightseven2',
//   'zoneight234',
//   '7pqrstsixteen',
// ];
const input2 = input;

const digitTextMap = new Map([
  ['one', '1'],
  ['two', '2'],
  ['three', '3'],
  ['four', '4'],
  ['five', '5'],
  ['six', '6'],
  ['seven', '7'],
  ['eight', '8'],
  ['nine', '9'],
]);

function mapDigit(digit) {
  if (digitTextMap.has(digit)) return digitTextMap.get(digit);
  return digit;
}

function getFirstDigit(line) {
  const digit = line.match(/^.*?(\d|one|two|three|four|five|six|seven|eight|nine)/)[1];
  return mapDigit(digit);
}

function getSecondtDigit(line) {
  const reversedDigit = line
    .split('')
    .reverse()
    .join('')
    .match(/^.*?(\d|enin|thgie|neves|xis|evif|ruof|eerht|owt|eno)/)[1];
  const digit = reversedDigit.split('').reverse().join('');
  return mapDigit(digit);
}

function getLineValue2(line) {
  const firstDigit = getFirstDigit(line);
  const secondDigit = getSecondtDigit(line);
  return Number(firstDigit + secondDigit);
}

function getSum2(lines) {
  return lines.reduce((sum, line) => sum + getLineValue2(line), 0);
}

console.log(getSum2(input2));
