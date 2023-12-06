import { describe, expect, test } from '@jest/globals';
import { Day06, calculateOptions, calculateMaxDistanceForHold } from './Day06'

const day = new Day06();
test("base path points to __dirname", () => expect(day.basePath()).toBe(__dirname));

const testRaces = [
  { time: 7, distance: 9 },
  { time: 15, distance: 40 },
  { time: 30, distance: 200 },
  { time: 71530, distance: 940200 },
  { time: 52947594, distance: 426137412791216 }
]
//////// PART 1
test(' calculateMaxDistanceForHold(hold: number, race: Race) : number', () => {
  expect(calculateMaxDistanceForHold(0, testRaces[0])).toBe(0);
  expect(calculateMaxDistanceForHold(1, testRaces[0])).toBe(6);
  expect(calculateMaxDistanceForHold(2, testRaces[0])).toBe(10);
  expect(calculateMaxDistanceForHold(3, testRaces[0])).toBe(12);
  expect(calculateMaxDistanceForHold(4, testRaces[0])).toBe(12);
  expect(calculateMaxDistanceForHold(5, testRaces[0])).toBe(10);
  expect(calculateMaxDistanceForHold(6, testRaces[0])).toBe(6);
  expect(calculateMaxDistanceForHold(7, testRaces[0])).toBe(0);
});
test('calculateOptions(race:Race) : number[]', () => {
  expect(calculateOptions(testRaces[0])).toStrictEqual([2, 3, 4, 5]);
  expect(calculateOptions(testRaces[1])).toStrictEqual([4, 5, 6, 7, 8, 9, 10, 11]);
  expect(calculateOptions(testRaces[2])).toStrictEqual([11, 12, 13, 14, 15, 16, 17, 18, 19]);
});

test('example 1', () => {
  expect(day.part1Example()).toBe("288");
  return day.readAndReturnEntries(day.testFilePart1()).then(entries => expect(day.part1(entries)).toBe(day.part1Example()));
});


//////// PART 2
test('calculateOptions(race:Race) : number[]', () => {
  expect(calculateOptions(testRaces[3]).length).toStrictEqual(71503);
  expect(calculateOptions(testRaces[4]).length).toStrictEqual(33149631);
});

test('example 2', () => {
  expect(day.part2Example()).toBe("71503");
  return day.readAndReturnEntries(day.testFilePart2()).then(entries => expect(day.part2(entries)).toBe(day.part2Example()));
});
