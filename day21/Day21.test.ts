import { expect, test } from '@jest/globals';
import { determineDataFileName, readEntriesFromDataFile } from '../lib/AdventOfCodeChallenge';
import { part1, part2} from './Day21'


//////// PART 1
test('example 1', () => {
  expect(part1.example).toBe("???");
  const dataFilePath = determineDataFileName(part1, true);
  return readEntriesFromDataFile(dataFilePath).then(entries => expect(part1(entries)).toBe(part1.example));
});

//////// PART 2
test('example 2', () => {
  expect(part2.example).toBe("???");
  const dataFilePath = determineDataFileName(part2, true);
  return readEntriesFromDataFile(dataFilePath).then(entries => expect(part2(entries)).toBe(part2.example));
});