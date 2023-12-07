import { describe, expect, test } from '@jest/globals';
import { determineDataFileName, readEntriesFromDataFile } from "../lib/AdventOfCodeChallenge";
import { calculateMaxDistanceForHold, calculateOptions, part1, part2 } from './Day07'


//////// PART 1
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
  expect(part1.example).toBe("288");
  const dataFilePath = determineDataFileName(part1, true);
  return readEntriesFromDataFile(dataFilePath).then(entries => expect(part1(entries)).toBe(part1.example));
});

//////// PART 2
test('calculateOptions(race:Race) : number[]', () => {
  expect(calculateOptions(testRaces[3]).length).toStrictEqual(71503);
  expect(calculateOptions(testRaces[4]).length).toStrictEqual(33149631);
});

test('example 2', () => {
  expect(part2.example).toBe("71503");
  const dataFilePath = determineDataFileName(part2, true);
  return readEntriesFromDataFile(dataFilePath).then(entries => expect(part2(entries)).toBe(part2.example));
});