---
to: day<%= ('0'+day).slice(-4) %>/Day<%= ('0'+day).slice(-4) %>.test.ts
unless_exists: true
---
import { expect, test } from '@jest/globals';
import { part1, part2} from './Day<%= ("0"+day).slice(-4) %>'


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