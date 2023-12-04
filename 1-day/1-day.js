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

console.log(getSum(input));
