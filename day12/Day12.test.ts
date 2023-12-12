import { expect, test } from '@jest/globals';
import { determineDataFileName, readEntriesFromDataFile } from '../lib/AdventOfCodeChallenge';
import { calculateCombinations, factorial, part1, part2 } from './Day12'


//////// PART 1
test('factorial(n)', () => {
  expect(factorial(1)).toBe(1);
  expect(factorial(2)).toBe(3);
  expect(factorial(3)).toBe(6);
  expect(factorial(4)).toBe(10);
  expect(factorial(5)).toBe(15);
});

test('1- calculateCombinations(group: string, thisGroupSizes: number[]): number ', () => {
  expect(calculateCombinations('???', [3])).toBe(1);   // ###  (3-3)!
  expect(calculateCombinations('???', [1, 1])).toBe(1); // #.# (3-(1+1))! = 1! = 1
  expect(calculateCombinations('????', [1, 1])).toBe(2); // .#.#, #.#.
  expect(calculateCombinations('?????', [1, 1])).toBe(6); // #.#.., #..#., #...#, .#.#., .#..#, ..#.# = (5-(1+1)-0)! = 3! = 6
  expect(calculateCombinations('?????', [1, 2])).toBe(3)  // #.##., #..##, .#.## = (5-(1+2)0)! = 2! = 3
  expect(calculateCombinations('???????', [1, 2])).toBe(10)  // #.##..., #..##.., #...##., #....##, 
  //                                                           .#.##.., .#..##., .#...##, 
  //                                                           ..#.##., ..#..##, 
  //                                                           ...#.## = 10 = (7-(1+2))! = 4! = 4+3+2+1 
  expect(calculateCombinations('??????????', [1, 2, 3])).toBe(10) // #.##.###.., #.##..###., #.##...###
  //                                                              // .#.##.###., .#.##..###
  //                                                              // .#..##.### = 6 = 3! = (10-(1+2+3)-1)! = (10-6-1)! = 3! = 6
  expect(calculateCombinations('???????????????', [1, 2, 3,4])).toBe(10)  // #.##.###.####.., #.##.###..####., #.##.###...####  15-10 = 5
  //                                                                         #..##.###.####., #..##.###..####
  //                                                                         #...##.###.####
  //                                                                         #.##..###.####., #.##..###..####
  //                                                                         #.##...###.####
  //                                                                         #.##.###...####
  //                                                                         

});

test('2 - calculateCombinations(group: string, thisGroupSizes: number[]): number ', () => {
  expect(calculateCombinations('??#????', [1, 2])).toBe(3)  ; //  #.##..., ..#.##., ..#..##
  expect(calculateCombinations('??#', [1, 1])          //  #.#
    + calculateCombinations('#????', [0, 1])).toBe(3);   //    #...,#
  expect(calculateCombinations('?##', [3])).toBe(1);   // ###
  expect(calculateCombinations('??', [1])).toBe(2);    // .#, #.
});

//////// PART 2
test('example 2', () => {
  expect(part2.example).toBe("???");
  const dataFilePath = determineDataFileName(part2, true);
  return readEntriesFromDataFile(dataFilePath).then(entries => expect(part2(entries)).toBe(part2.example));
});