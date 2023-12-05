import { describe, expect, test } from '@jest/globals';
import { Day05, Mapper, mapping, parseEmptyMap, parseMaps, parseRangesAndAddToMap, walkThroughMaps } from './Day05'

const day = new Day05();
test("base path points to __dirname", () => expect(day.basePath()).toBe(__dirname));

const testEmptyMap01 = {
  source: 'seed',
  destination: 'soil',
  sourceRanges: [],
  destinationRanges: []
}
const testMaps = [{
  source: 'seed',
  destination: 'soil',
  sourceRanges: [
    { start: 98, end: 99 },
    { start: 50, end: 97 }],
  destinationRanges: [
    { start: 50, end: 51 },
    { start: 52, end: 99 }]
},
{
  source: 'soil',
  destination: 'fertilizer',
  sourceRanges: [
    { start: 15, end: 51 },
    { start: 52, end: 53 },
    { start: 0, end: 14 }],
  destinationRanges: [
    { start: 0, end: 36 },
    { start: 37, end: 38 },
    { start: 39, end: 53 }]
},
{
  source: 'fertilizer',
  destination: 'water',
  sourceRanges: [
    { start: 53, end: 60 },
    { start: 11, end: 52 },
    { start: 0, end: 6 },
    { start: 7, end: 10 }],
  destinationRanges: [
    { start: 49, end: 56 },
    { start: 0, end: 41 },
    { start: 42, end: 48 },
    { start: 57, end: 60 }]
},
{
  source: 'water',
  destination: 'light',
  sourceRanges: [
    { start: 18, end: 24 },
    { start: 25, end: 94 }],
  destinationRanges: [
    { start: 88, end: 94 },
    { start: 18, end: 87 }]
},
{
  source: 'light',
  destination: 'temperature',
  sourceRanges: [
    { start: 77, end: 99 },
    { start: 45, end: 63 },
    { start: 64, end: 76 }],
  destinationRanges: [
    { start: 45, end: 77 },
    { start: 81, end: 99 },
    { start: 68, end: 80 }]
},
{
  source: 'temperature',
  destination: 'humidity',
  sourceRanges: [
    { start: 69, end: 69 },
    { start: 0, end:68 }],
  destinationRanges: [
    { start: 0, end: 0 },
    { start: 1, end: 69 }]
},
{
  source: 'humidity',
  destination: 'location',
  sourceRanges: [
    { start: 56, end: 92 },
    { start: 93, end: 96 }],
  destinationRanges: [
    { start: 60, end: 96 },
    { start: 56, end: 59 }]
}

] as Mapper[];

const testMap = new Map<string, Mapper>()
testMaps.forEach(m => testMap.set(m.source, m));

//////// PART 1

test('parseEmptyMap(entry: string): Mapper | undefined', () => {
  expect(parseEmptyMap('seed-to-soil map:')).toStrictEqual(testEmptyMap01);
});

test('parseMaps(entries: string[]) : Map<string, Mapper>', () => {
  day.readAndReturnEntries(day.testFilePart1()).then(entries => expect(parseMaps(entries)).toStrictEqual(testMap));
});

test('parseRangesAndAddToMap(entry: string, map: Mapper): Mapper | undefined', () => {
  const testMap = JSON.parse(JSON.stringify(testEmptyMap01)) as Mapper;
  parseRangesAndAddToMap('50 98 2', testMap);
  parseRangesAndAddToMap('52 50 48', testMap);
  expect(testMap).toStrictEqual(testMaps[0]);
});

test('mapping(start:number, map: Mapper)', () => {
  expect(mapping(79, testMaps[0])).toBe(81); // seed-to-soil
  expect(mapping(81, testMaps[1])).toBe(81); // soil-to-fertilizer
  expect(mapping(81, testMaps[2])).toBe(81); // fertilizer-to-water
  expect(mapping(81, testMaps[3])).toBe(74); // water-to-light
  expect(mapping(74, testMaps[4])).toBe(78); // light-to-temperature
  expect(mapping(78, testMaps[5])).toBe(78); // temperature-to-humidity
  expect(mapping(78, testMaps[6])).toBe(82); // humidity-to-location
});

test('walkThroughMaps(seed : number, maps:Map<string, Mapper> ) : number', () => {
  expect(walkThroughMaps(79, testMap)).toBe(82);
  expect(walkThroughMaps(14, testMap)).toBe(43);
  expect(walkThroughMaps(55, testMap)).toBe(86);
  expect(walkThroughMaps(13, testMap)).toBe(35);
});



test('example 1', () => {
  expect(day.part1Example()).toBe("35");
  return day.readAndReturnEntries(day.testFilePart1()).then(entries => expect(day.part1(entries)).toBe(day.part1Example()));
});


//////// PART 2

test('example 2', () => {
  expect(day.part2Example()).toBe("???");
  return day.readAndReturnEntries(day.testFilePart2()).then(entries => expect(day.part2(entries)).toBe(day.part2Example()));
});
