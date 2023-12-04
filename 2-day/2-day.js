const fs = require('fs');

const testInput = [
  'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green',
  'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue',
  'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red',
  'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red',
  'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green',
];

const input = fs.readFileSync('./2-day/input.txt', 'utf-8').split(/\r?\n/).filter(Boolean);

function getLineMaximus(line) {
  return line
    .split(':')[1]
    .split(';')
    .map((gameCase) => gameCase.trim().split(', '))
    .flat()
    .reduce(
      (maxs, gameCase) => {
        const [count, color] = gameCase.split(' ');
        maxs[color] = maxs[color] === Infinity ? Number(count) : Math.max(maxs[color], Number(count));
        return maxs;
      },
      {
        red: Infinity,
        green: Infinity,
        blue: Infinity,
      }
    );
}

function isGamePossible(line, config) {
  const maxs = getLineMaximus(line);
  return config.red >= maxs.red && config.green >= maxs.green && config.blue >= maxs.blue;
}

function getPossibleGamesSum(lines, config) {
  return lines.reduce((sum, line, index) => (isGamePossible(line, config) ? sum + index + 1 : sum), 0);
}

const config = {
  red: 12,
  green: 13,
  blue: 14,
};

console.log(getPossibleGamesSum(input, config));
