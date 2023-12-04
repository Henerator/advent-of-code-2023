const fs = require('fs');

const testInput = [
  'Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53',
  'Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19',
  'Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1',
  'Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83',
  'Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36',
  'Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11',
];

const input = fs.readFileSync('./4-day/input.txt', 'utf-8').split(/\r?\n/).filter(Boolean);

// Part 1

function numbersLineToArr(numbersLine) {
  return [...numbersLine.match(/\d+/g)];
}

function parseLine(line) {
  const [winLine, yourLine] = line.split(':')[1].split('|');
  return {
    winNumbersSet: new Set(numbersLineToArr(winLine)),
    numbers: numbersLineToArr(yourLine),
  };
}

function getLineMatches(line) {
  const lineData = parseLine(line);
  return lineData.numbers.reduce((matches, number) => (lineData.winNumbersSet.has(number) ? matches + 1 : matches), 0);
}

function getLinePoints(line) {
  const matchesCount = getLineMatches(line);
  return matchesCount === 0 ? 0 : Math.pow(2, matchesCount - 1);
}

function getLinesPoints(lines) {
  return lines.reduce((points, line) => points + getLinePoints(line), 0);
}

// console.log(getLinesPoints(input));

// Part 2

function getCardsCount(lines) {
  const linesPoints = lines.map((line) => getLineMatches(line));
  const cardsCounts = new Array(lines.length).fill(1);
  let index = 0;
  while (index < lines.length - 1) {
    for (let indexShift = 1; indexShift <= linesPoints[index]; indexShift++) {
      cardsCounts[index + indexShift] += cardsCounts[index];
    }
    index++;
  }
  return cardsCounts.reduce((sum, count) => sum + count, 0);
}

console.log(getCardsCount(input));
