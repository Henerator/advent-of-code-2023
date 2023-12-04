const fs = require('fs');

const testInput = [
  '467..114..',
  '...*......',
  '..35..633.',
  '......#...',
  '617*......',
  '.....+.58.',
  '..592.....',
  '......755.',
  '...$.*....',
  '.664.598..',
];

const input = fs.readFileSync('./3-day/input.txt', 'utf-8').split(/\r?\n/).filter(Boolean);

// Part 1

function isSymbol(char) {
  return /[^\d.]/.test(char);
}

function isSymbolAdjacent(lines, lineIndex, start, length) {
  const rows = lines.length;
  const cols = lines[lineIndex].length;

  for (let row = lineIndex - 1; row <= lineIndex + 1; row++) {
    if (row < 0 || row >= rows) continue;

    for (let col = start - 1; col <= start + length; col++) {
      if (col < 0 || col >= cols) continue;

      if (isSymbol(lines[row][col])) return true;
    }
  }

  return false;
}

function getLineSum(lines, lineIndex) {
  return [...lines[lineIndex].matchAll(/\d+/g)].reduce((sum, match) => {
    const value = match[0];
    return isSymbolAdjacent(lines, lineIndex, match.index, value.length) ? sum + Number(value) : sum;
  }, 0);
}

function getLinesSum(lines) {
  return lines.reduce((sum, _line, index) => sum + getLineSum(lines, index), 0);
}

console.log(getLinesSum(input));
