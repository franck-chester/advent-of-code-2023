import { expect, test } from '@jest/globals';
import { determineDataFileName, readEntriesFromDataFile } from '../lib/AdventOfCodeChallenge';
import { part1, part2, tiltLeft, weight} from './Day14'


//////// PART 1
test('tilt left', () => {
  expect(tiltLeft(`OO.O.O..##`.split('')).join('')).toBe('OOOO....##');
  expect(tiltLeft(`...OO....O`.split('')).join('')).toBe('OOO.......');
  expect(tiltLeft(`.O...#O..O`.split('')).join('')).toBe('O....#OO..');
  expect(tiltLeft(`.O..#.....`.split('')).join('')).toBe('O...#.....');

});

test('weight', () => {
  expect(weight('OOOO....##'.split(''))).toBe(34);
  expect(weight('OOO.......'.split(''))).toBe(27);
  expect(weight('O....#OO..'.split(''))).toBe(17);
  expect(weight('O...#.....'.split(''))).toBe(10);

});

//////// PART 2
test('example 2', () => {
  expect(part2.example).toBe("???");
  const dataFilePath = determineDataFileName(part2, true);
  return readEntriesFromDataFile(dataFilePath).then(entries => expect(part2(entries)).toBe(part2.example));
});