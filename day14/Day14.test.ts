import { expect, test } from '@jest/globals';
import { determineDataFileName, readEntriesFromDataFile } from '../lib/AdventOfCodeChallenge';
import { part1, part2, tiltLeft, weight, tilt, tiltNWSE } from './Day14'
import { Grid } from '../lib/Grid';


//////// PART 1
test('tilt left', () => {
  expect(tiltLeft(`OO.O.O..##`.split('')).join('')).toBe('OOOO....##');
  expect(tiltLeft(`...OO....O`.split('')).join('')).toBe('OOO.......');
  expect(tiltLeft(`.O...#O..O`.split('')).join('')).toBe('O....#OO..');
  expect(tiltLeft(`.O..#.....`.split('')).join('')).toBe('O...#.....');

});

test('tilt(North)', () => {
  expect(tilt(`OO.O.O..##`.split(''), 'North').join('')).toBe('OOOO....##');
  expect(tilt(`...OO....O`.split(''), 'North').join('')).toBe('OOO.......');
  expect(tilt(`.O...#O..O`.split(''), 'North').join('')).toBe('O....#OO..');
  expect(tilt(`.O..#.....`.split(''), 'North').join('')).toBe('O...#.....');

});

test('tilt(East)', () => {
  expect(tilt(`OO.O.O..##`.split(''), 'East').join('')).toBe('OOOO....##');
  expect(tilt(`...OO....O`.split(''), 'East').join('')).toBe('OOO.......');
  expect(tilt(`.O...#O..O`.split(''), 'East').join('')).toBe('O....#OO..');
  expect(tilt(`.O..#.....`.split(''), 'East').join('')).toBe('O...#.....');


});

test('tilt(South)', () => {
  expect(tilt(`OO.O.O..##`.split(''), 'South').join('')).toBe('....OOOO##');
  expect(tilt(`...OO....O`.split(''), 'South').join('')).toBe('.......OOO');
  expect(tilt(`.O...#O..O`.split(''), 'South').join('')).toBe('....O#..OO');
  expect(tilt(`.O..#.....`.split(''), 'South').join('')).toBe('...O#.....');

});

test('tilt(West)', () => {
  expect(tilt(`OO.O.O..##`.split(''), 'West').join('')).toBe('....OOOO##');
  expect(tilt(`...OO....O`.split(''), 'West').join('')).toBe('.......OOO');
  expect(tilt(`.O...#O..O`.split(''), 'West').join('')).toBe('....O#..OO');
  expect(tilt(`.O..#.....`.split(''), 'West').join('')).toBe('...O#.....');

});


test('weight', () => {
  expect(weight('OOOO....##'.split(''))).toBe(34);
  expect(weight('OOO.......'.split(''))).toBe(27);
  expect(weight('O....#OO..'.split(''))).toBe(17);
  expect(weight('O...#.....'.split(''))).toBe(10);

});

//////// PART 2
test('tiltNWSE', () => {
  const dataFilePath = determineDataFileName(part2, true);
  return readEntriesFromDataFile(dataFilePath).then(entries => {
    let platform = Grid.fromEntries(entries, c => c);
    platform = tiltNWSE(platform)
    expect(platform.getRow(0).join('')).toStrictEqual('.....#....');
    expect(platform.getRow(1).join('')).toStrictEqual('....#...O#');
    expect(platform.getRow(2).join('')).toStrictEqual('...OO##...');
    expect(platform.getRow(3).join('')).toStrictEqual('.OO#......');
    expect(platform.getRow(4).join('')).toStrictEqual('.....OOO#.');
    expect(platform.getRow(5).join('')).toStrictEqual('.O#...O#.#');
    expect(platform.getRow(6).join('')).toStrictEqual('....O#....');
    expect(platform.getRow(7).join('')).toStrictEqual('......OOOO');
    expect(platform.getRow(8).join('')).toStrictEqual('#...O###..');
    expect(platform.getRow(9).join('')).toStrictEqual('#..OO#....');
    platform = tiltNWSE(platform)
    expect(platform.getRow(0).join('')).toStrictEqual('.....#....');
    expect(platform.getRow(1).join('')).toStrictEqual('....#...O#');
    expect(platform.getRow(2).join('')).toStrictEqual('.....##...');
    expect(platform.getRow(3).join('')).toStrictEqual('..O#......');
    expect(platform.getRow(4).join('')).toStrictEqual('.....OOO#.');
    expect(platform.getRow(5).join('')).toStrictEqual('.O#...O#.#');
    expect(platform.getRow(6).join('')).toStrictEqual('....O#...O');
    expect(platform.getRow(7).join('')).toStrictEqual('.......OOO');
    expect(platform.getRow(8).join('')).toStrictEqual('#..OO###..');
    expect(platform.getRow(9).join('')).toStrictEqual('#.OOO#...O');
  });
});
test('example 2', () => {
  expect(part2.example).toBe("???");
  const dataFilePath = determineDataFileName(part2, true);
  return readEntriesFromDataFile(dataFilePath).then(entries => expect(part2(entries)).toBe(part2.example));
});