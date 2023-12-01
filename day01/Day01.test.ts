import { describe, expect, test } from '@jest/globals';
import { Day01 } from './Day01'

const day = new Day01();


test("base path points to __dirname", () => expect(day.basePath()).toBe(__dirname));

test("example 1", () => expect(day.part1Example()).toBe("142"));

describe.each([
    ["1abc2", { f: 1, l: 2, r: 12 }],
    ["pqr3stu8vwx", { f: 3, l: 8, r: 38 }],
    ["a1b2c3d4e5f", { f: 1, l: 5, r: 15 }],
    ["treb7uchet", { f: 7, l: 7, r: 77 }]
])('parse1 %s', (entry: string, parsed: { f: number, l: number, r: number }) => {
    test('returns ${parsed}', () =>
        expect(day.parse1(entry)).toEqual(parsed));
});

// describe('toNumber', () => {
//     test("toNumber(1)", () => expect(day.toNumber('1')).toBe(1));
//     test("toNumber('one')", () => expect(day.toNumber('one')).toBe(1));
//     test("toNumber(2)", () => expect(day.toNumber('2')).toBe(2));
//     test("toNumber('two')", () => expect(day.toNumber('two')).toBe(2));
//     test("toNumber(3)", () => expect(day.toNumber('3')).toBe(3));
//     test("toNumber('three')", () => expect(day.toNumber('three')).toBe(3));
//     test("toNumber(4)", () => expect(day.toNumber('4')).toBe(4));
//     test("toNumber('four')", () => expect(day.toNumber('four')).toBe(4));
//     test("toNumber(5)", () => expect(day.toNumber('5')).toBe(5));
//     test("toNumber('five')", () => expect(day.toNumber('five')).toBe(5));
//     test("toNumber(6)", () => expect(day.toNumber('6')).toBe(6));
//     test("toNumber('six')", () => expect(day.toNumber('six')).toBe(6));
//     test("toNumber(7)", () => expect(day.toNumber('7')).toBe(7));
//     test("toNumber('seven')", () => expect(day.toNumber('seven')).toBe(7));
//     test("toNumber(8)", () => expect(day.toNumber('8')).toBe(8));
//     test("toNumber('eight')", () => expect(day.toNumber('eight')).toBe(8));
//     test("toNumber(9)", () => expect(day.toNumber('9')).toBe(9));
//     test("toNumber('nine')", () => expect(day.toNumber('nine')).toBe(9));
//     test("toNumber(9)", () => expect(day.toNumber('9')).toBe(9));
//     test("toNumber('nine')", () => expect(day.toNumber('nine')).toBe(9));
// });


describe.each([
    ["two1nine", { f: 2, l: 9, r: 29 }],
    ["eightwothree", { f: 8, l: 3, r: 83 }],
    ["abcone2threexyz", { f: 1, l: 3, r: 13 }],
    ["xtwone3four", { f: 2, l: 4, r: 24 }],
    ["4nineeightseven2", { f: 4, l: 2, r: 42 }],
    ["zoneight234", { f: 1, l: 4, r: 14 }],
    ["7pqrstsixteen", { f: 7, l: 6, r: 76 }],
    ["five8onexsgnxtdtwonecl", { f: 5, l: 1, r: 51 }]  // edge case with blended numbers
])('parse2 %s', (entry: string, parsed: { f: number, l: number, r: number }) => {
    test('returns ${parsed}', () =>
        expect(day.parse2(entry)).toEqual(parsed));
});



