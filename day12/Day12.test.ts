import { expect, test } from '@jest/globals';
import { determineDataFileName, readEntriesFromDataFile } from '../lib/AdventOfCodeChallenge';
import { factorial, filterOutImpossibleRecords, generateAllPotentialRecords, part1, part2 } from './Day12'


//////// PART 1
test('factorial(n)', () => {
  expect(factorial(1)).toBe(1);
  expect(factorial(2)).toBe(3);
  expect(factorial(3)).toBe(6);
  expect(factorial(4)).toBe(10);
  expect(factorial(5)).toBe(15);
});

const test01 = [
  "#.#.###..",
  "#.#..###.",
  "#..#.###.",
  ".#.#.###.",
  ".#.#..###",
  ".#..#.###",
  "..#.#.###"
]

test('generateAllPotentialRecords 1 ', () => {
  expect(generateAllPotentialRecords([1,1,3], 7)).toStrictEqual([
    "#.#.###"
  ]);

  expect(generateAllPotentialRecords([1,1,3], 8)).toStrictEqual([
    "#.#.###.",
    "#.#..###",
    "#..#.###",
    ".#.#.###"
  ]);

  expect(generateAllPotentialRecords([1,1,3], 9)).toStrictEqual(test01);
});

test('filterOutImpossibleRecords ', () => {
  expect(filterOutImpossibleRecords(test01, "?#???????")).toStrictEqual([
    ".#.#.###.",
    ".#.#..###",
    ".#..#.###",
  ]);
});

//////// PART 2
test('example 2', () => {
  expect(part2.example).toBe("???");
  const dataFilePath = determineDataFileName(part2, true);
  return readEntriesFromDataFile(dataFilePath).then(entries => expect(part2(entries)).toBe(part2.example));
});