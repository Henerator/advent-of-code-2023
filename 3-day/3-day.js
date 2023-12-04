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

// console.log(getLinesSum(input));

// Part 2

function getGearAdjacentNumbers(lines, lineIndex, gearCol) {
  const numbers = [];
  const rows = lines.length;
  const gearLeft = gearCol - 1;
  const gearRight = gearCol + 1;

  for (let row = lineIndex - 1; row <= lineIndex + 1; row++) {
    if (row < 0 || row >= rows) continue;

    const line = lines[row];
    [...line.matchAll(/\d+/g)].forEach((match) => {
      const value = match[0];
      const numberLeft = match.index;
      const numberRight = match.index + value.length - 1;

      if (numberLeft <= gearRight && numberRight >= gearLeft) {
        numbers.push(Number(value));
      }
    });
  }

  return numbers;
}

function getLineGearsSum(lines, lineIndex) {
  return [...lines[lineIndex].matchAll(/\*/g)].reduce((sum, match) => {
    const gearNumbers = getGearAdjacentNumbers(lines, lineIndex, match.index);
    return gearNumbers.length === 2 ? sum + gearNumbers[0] * gearNumbers[1] : sum;
  }, 0);
}

function getLinesGearsSum(lines) {
  return lines.reduce((sum, _line, index) => sum + getLineGearsSum(lines, index), 0);
}

console.log(getLinesGearsSum(input));
