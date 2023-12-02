import { describe, expect, test } from '@jest/globals';
import { Day02 } from './Day02'

const day = new Day02();


test("base path points to __dirname", () => expect(day.basePath()).toBe(__dirname));

//////// PART 1
test('example 1', () => {
    expect(day.part1Example()).toBe("8");
    return day.readAndReturnEntries(day.testFilePart1()).then(entries => expect(day.part1(entries)).toBe(day.part1Example()));
});

test('game and sets', () => {
    expect(day.parseGameAndSets('Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green')).toStrictEqual(
        {
            game: 1, setsString: '3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green',
            setsList: ['3 blue, 4 red', '1 red, 2 green, 6 blue', '2 green'],
            sets: [
                { red: 4, green: 0, blue: 3 }, 
                { red: 1, green: 2, blue: 6 }, 
                { red: 0, green: 2, blue: 0 }],
            minimums: { red: 4, green: 2, blue: 6 },
            tests: [{ red: true, green: true, blue: true }, { red: true, green: true, blue: true }, { red: true, green: true, blue: true }]
        });
    expect(day.parseGameAndSets('Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red')).toStrictEqual(
        {
            game: 3, setsString: '8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red',
            setsList: ['8 green, 6 blue, 20 red', '5 blue, 4 red, 13 green', '5 green, 1 red'],
            sets: [
                { red: 20, green: 8, blue: 6 }, 
                { red: 4, green: 13, blue: 5 }, 
                { red: 1, green: 5, blue: 0 }],
            minimums: { red: 20, green: 13, blue: 6 },
            tests: [{ red: false, green: true, blue: true }, { red: true, green: true, blue: true }, { red: true, green: true, blue: true }]
        });
    expect(day.parseGameAndSets('Game 100: 16 red, 3 blue; 2 red, 5 green; 9 red; 1 blue, 3 green, 10 red; 1 red, 5 blue, 3 green; 12 blue, 9 red')).toStrictEqual(
        {
            game: 100, setsString: '16 red, 3 blue; 2 red, 5 green; 9 red; 1 blue, 3 green, 10 red; 1 red, 5 blue, 3 green; 12 blue, 9 red',
            setsList: ['16 red, 3 blue', '2 red, 5 green', '9 red', '1 blue, 3 green, 10 red', '1 red, 5 blue, 3 green', '12 blue, 9 red'],
            sets: [
                { red: 16, green: 0, blue: 3 },
                { red: 2, green: 5, blue: 0 },
                { red: 9, green: 0, blue: 0 },
                { red: 10, green: 3, blue: 1 },
                { red: 1, green: 3, blue: 5 },
                { red: 9, green: 0, blue: 12 }],
            minimums: { red: 16, green: 5, blue: 12 },
            tests: [
                { red: false, green: true, blue: true },
                { red: true, green: true, blue: true },
                { red: true, green: true, blue: true },
                { red: true, green: true, blue: true },
                { red: true, green: true, blue: true },
                { red: true, green: true, blue: true }]
        });
}
);

test('testSets', () => {
    expect(day.testSetsArePossible([
        { red: 16, green: 0, blue: 3 },
        { red: 2, green: 5, blue: 0 },
        { red: 9, green: 0, blue: 0 },
        { red: 10, green: 3, blue: 1 },
        { red: 1, green: 3, blue: 5 },
        { red: 9, green: 0, blue: 12 }])
    ).toStrictEqual([
        { red: false, green: true, blue: true },
        { red: true, green: true, blue: true },
        { red: true, green: true, blue: true },
        { red: true, green: true, blue: true },
        { red: true, green: true, blue: true },
        { red: true, green: true, blue: true }])
});

test('sets', () => {
    expect(day.parseSetList(['3 blue, 4 red', '1 red, 2 green, 6 blue', '2 green'])).toStrictEqual(
        [{ blue: 3, red: 4, green: 0 }, { red: 1, green: 2, blue: 6 }, { red: 0, green: 2, blue: 0 }]);

    expect(day.parseSetList(['8 green, 6 blue, 20 red', '5 blue, 4 red, 13 green', '5 green, 1 red'])).toStrictEqual(
        [{ blue: 6, red: 20, green: 8 }, { red: 4, green: 13, blue: 5 }, { red: 1, green: 5, blue: 0 }]);
}
);

describe.each([
    ["Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green", { game: 1, sets: [{ blue: 3, red: 4, green: 0 }, { blue: 6, red: 1, green: 2 }, { blue: 0, red: 0, green: 2 }] }],
    // ["Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue", { f: 8, l: 3, r: 83 }],
    // ["Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red", { f: 1, l: 3, r: 13 }],
    // ["Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red", { f: 2, l: 4, r: 24 }],
    // ["Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green", { f: 4, l: 2, r: 42 }]
])('parse1 %s', (entry: string, parsed: { game: number, sets: { blue: number, red: number, green: number }[] }) => {
    test('returns ${parsed}', () =>
        expect(day.parse1(entry)).toEqual(parsed));
});

test('calculate power', () => {
    expect(day.calculatePower({ red: 4, green: 2, blue: 6 })).toBe(48)
});

//////// PART 2
test('example 2', () => {
    expect(day.part2Example()).toBe("2286");
    return day.readAndReturnEntries(day.testFilePart2()).then(entries => expect(day.part2(entries)).toBe(day.part2Example()));
});
