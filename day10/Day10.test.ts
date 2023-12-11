import { expect, test } from '@jest/globals';
import { determineDataFileName, readEntriesFromDataFile } from '../lib/AdventOfCodeChallenge';
import { part1, part2} from './Day10'


//////// PART 1
test('part 1 - example 1', () => {
  expect(part1.example[0]).toBe("4");
  const dataFilePath = determineDataFileName(part1, true, 1);
  return readEntriesFromDataFile(dataFilePath).then(entries => expect(part1(entries)).toBe(part1.example[0]));
});

test('part 1 - example 2', () => {
  expect(part1.example[1]).toBe("8");
  const dataFilePath = determineDataFileName(part1, true, 2);
  return readEntriesFromDataFile(dataFilePath).then(entries => expect(part1(entries)).toBe(part1.example[1]));
});

test('part 1 - actual problem', () => {
  const dataFilePath = determineDataFileName(part1, false);
  return readEntriesFromDataFile(dataFilePath).then(entries => expect(part1(entries)).toBe('6951'));
});

//////// PART 2
test('part 2 - example 1', () => {
  expect(part2.example[0]).toBe("4");
  const dataFilePath = determineDataFileName(part2, true, 1);
  return readEntriesFromDataFile(dataFilePath).then(entries => expect(part2(entries)).toBe(part2.example[0]));
});

test('part 2 - example 2', () => {
  expect(part2.example[1]).toBe("8");
  const dataFilePath = determineDataFileName(part2, true, 2);
  return readEntriesFromDataFile(dataFilePath).then(entries => expect(part2(entries)).toBe(part2.example[1]));
});

test('part 2 - example 3', () => {
  expect(part2.example[2]).toBe("10");
  const dataFilePath = determineDataFileName(part2, true, 3);
  return readEntriesFromDataFile(dataFilePath).then(entries => expect(part2(entries)).toBe(part2.example[2]));
});

test('part 2 - actual problem', () => {
  const dataFilePath = determineDataFileName(part2, false);
  return readEntriesFromDataFile(dataFilePath).then(entries => expect(part2(entries)).toBe('563'));
});