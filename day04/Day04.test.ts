import { describe, expect, test } from '@jest/globals';
import { Day04, doubleNTimes, parseCard, findWinningNumbers } from './Day04'

const day = new Day04();
test("base path points to __dirname", () => expect(day.basePath()).toBe(__dirname));

//////// PART 1

test('doubleNTimes', () => {
  expect(doubleNTimes(0)).toBe(0);
  expect(doubleNTimes(1)).toBe(1);
  expect(doubleNTimes(2)).toBe(2);
  expect(doubleNTimes(3)).toBe(4);
  expect(doubleNTimes(4)).toBe(8);
});

test('parseCard', () => {
  expect(parseCard('Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53')).toStrictEqual({
    cardId: "1",
    winningNumbers: new Set(['41', '48', '83', '86', '17']),
    numbers: ['83', '86', '6', '31', '17', '9', '48', '53']
  }
  );
});

test('findWinningNumbers', () => {
  expect(findWinningNumbers(
    ['83', '86', '6', '31', '17', '9', '48', '53'], 
    new Set(['41', '48', '83', '86', '17']))).toStrictEqual(4)
  }
);


test('example 1', () => {
  expect(day.part1Example()).toBe("13");
  return day.readAndReturnEntries(day.testFilePart1()).then(entries => expect(day.part1(entries)).toBe(day.part1Example()));
});


//////// PART 2

test('example 2', () => {
  expect(day.part2Example()).toBe("30");
  return day.readAndReturnEntries(day.testFilePart2()).then(entries => expect(day.part2(entries)).toBe(day.part2Example()));
});
