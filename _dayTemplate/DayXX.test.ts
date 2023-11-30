import { describe, expect, test } from '@jest/globals';
import { DayXX } from './DayXX'

const day = new DayXX();
test("part 1 test", () => expect(day.part1(day.entries)).toBe(day.part1Example()));
test("part 2 test", () => expect(day.part2(day.entries)).toBe(day.part2Example()));

describe.each([
    [['1', '2', '3'], { just:"a test" }],
    [['4', '5', '6'], { just:"another test" }]
])('parseInstructions', (entry: string[], instructions: { just: string}) => {
    expect(day.part1(entry)).toEqual(day.part1Example());
});