import { describe, expect, test } from '@jest/globals';
import { Day02 } from './Day02'

const day = new Day02();


test("base path points to __dirname", () => expect(day.basePath()).toBe(__dirname));

//////// PART 1
test('example 1', () => {
    expect(day.part1Example()).toBe("???");
    return day.readAndReturnEntries(day.testFilePart1()).then(entries => expect(day.part1(entries)).toBe(day.part1Example()));
  });


//////// PART 2
test('example 2', () => {
    expect(day.part2Example()).toBe("???");
    return day.readAndReturnEntries(day.testFilePart2()).then(entries => expect(day.part2(entries)).toBe(day.part2Example()));
  });
