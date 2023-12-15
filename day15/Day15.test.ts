import { expect, test } from '@jest/globals';
import { determineDataFileName, readEntriesFromDataFile } from '../lib/AdventOfCodeChallenge';
import { hash, part1, part2} from './Day15'


//////// PART 1
test('hash()', () => {
  expect(hash('HASH')).toBe('52');
  expect(hash('rn=1')).toBe('30');
  expect(hash('cm-')).toBe('253');
  expect(hash('qp=3')).toBe('97');
  expect(hash('cm=2')).toBe('47');
  expect(hash('qp-')).toBe('14');
  expect(hash('pc=4')).toBe('180');
  expect(hash('ot=9')).toBe('9');
  expect(hash('ab=5')).toBe('197');
  expect(hash('pc-')).toBe('48');
  expect(hash('pc=6')).toBe('214');
  expect(hash('ot=7')).toBe('231');

});

//////// PART 2
test('example 2', () => {
  expect(part2.example).toBe("???");
  const dataFilePath = determineDataFileName(part2, true);
  return readEntriesFromDataFile(dataFilePath).then(entries => expect(part2(entries)).toBe(part2.example));
});