import { describe, expect, test } from '@jest/globals';
import { Day03 } from './Day03'

const day = new Day03();
test("base path points to __dirname", () => expect(day.basePath()).toBe(__dirname));

//////// PART 1

test('isSymbolObject', () => {
  return day.readAndReturnEntries(day.testFilePart1()).then(entries => {
    expect(day.isSymbolObject(0,0, entries)).toBe(false);
    expect(day.isSymbolObject(3,0, entries)).toBe(false);
    expect(day.isSymbolObject(3,1, entries)).toBe(true);
    expect(day.isSymbolObject(3,4, entries)).toBe(true);
    expect(day.isSymbolObject(9,9, entries)).toBe(false);
  });
});

test('isAdjacentToSymbol', () => {
  return day.readAndReturnEntries(day.testFilePart1()).then(entries => {
    expect(day.isAdjacentToSymbol(4,0, entries)).toBe(true);
    expect(day.isAdjacentToSymbol(3,1, entries)).toBe(false);
    expect(day.isAdjacentToSymbol(3,9, entries)).toBe(true);
    expect(day.isAdjacentToSymbol(5,9, entries)).toBe(true);
  });
});

test('example 1', () => {
  expect(day.part1Example()).toBe("4361");
  return day.readAndReturnEntries(day.testFilePart1()).then(entries => expect(day.part1(entries)).toBe(day.part1Example()));
});


//////// PART 2


test('isGear', () => {
  return day.readAndReturnEntries(day.testFilePart1()).then(entries => {
    expect(day.isGear(3,0, entries)).toBe(false);
    expect(day.isGear(3,1, entries)).toBe(true);
    expect(day.isGear(3,8, entries)).toBe(false);

  });
});

test('isAdjacentToGearSymbol', () => {
  return day.readAndReturnEntries(day.testFilePart1()).then(entries => {
    expect(day.isAdjacentToGearSymbol(4,0, entries)).toStrictEqual({adjacent:true, gears:[{x:3,y:1}]});


  });
});

test('example 2', () => {
  expect(day.part2Example()).toBe("467835");
  return day.readAndReturnEntries(day.testFilePart2()).then(entries => expect(day.part2(entries)).toBe(day.part2Example()));
});
