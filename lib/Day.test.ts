import { expect, test } from '@jest/globals';
import { Day } from './Day';

export class Day00 extends Day {
    testFilePart1(): string {
        return 'test.txt'
    }
    testFilePart2(): string {
        return 'test.txt'
    }

    part1Example(): string {
        throw new Error('Method not implemented.');
    }
    part2Example(): string {
        throw new Error('Method not implemented.');
    }
    basePath(): string {
        return __dirname;
    }
}

const day = new Day00();
test("simple regex", () => expect(day.parseEntry("move 1 from 2 to 1", /move (?<move>\d+) from (?<from>\d+) to (?<to>\d+)/gm)).toEqual({ move: "1", from: "2", to: "1" }));

it('readAnReturnEntries', () => {
    expect.assertions(1);
    return expect(day.readAndReturnEntries('test.txt')).resolves.toStrictEqual(['first line', 'second line', 'third line']);
});