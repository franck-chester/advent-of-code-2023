import { describe, expect, test } from '@jest/globals';
import { Day05, Mapper, mapping, parseEmptyMap, parseMaps, parseRangesAndAddToMap, walkThroughMaps } from './Day05'

const day = new Day05();
test("base path points to __dirname", () => expect(day.basePath()).toBe(__dirname));

const testEmptyMap01 = {
  source: 'seed',
  destination: 'soil',
  ranges: []
} as Mapper;

const testMaps = [{
  source: 'seed',
  destination: 'soil',
  ranges: [
    {
      source: { start: 98, end: 99 },
      destination: { start: 50, end: 51 }
    },
    {
      source: { start: 50, end: 97 },
      destination: { start: 52, end: 99 }
    }]
},
{
  source: 'soil',
  destination: 'fertilizer',
  ranges: [
    {
      source: { start: 15, end: 51 },
      destination: { start: 0, end: 36 }
    },
    {
      source: { start: 52, end: 53 },
      destination: { start: 37, end: 38 }
    },
    {
      source: { start: 0, end: 14 },
      destination: { start: 39, end: 53 }
    }
  ]
},
{
  source: 'fertilizer',
  destination: 'water',
  ranges: [
    {
      source: { start: 53, end: 60 },
      destination: { start: 49, end: 56 }
    },
    {
      source: { start: 11, end: 52 },
      destination: { start: 0, end: 41 }
    },
    {
      source: { start: 0, end: 6 },
      destination: { start: 42, end: 48 }
    },
    {
      source: { start: 7, end: 10 },
      destination: { start: 57, end: 60 }
    }
  ]
},
{
  source: 'water',
  destination: 'light',
  ranges: [
    {
      source: { start: 18, end: 24 },
      destination: { start: 88, end: 94 }
    },
    {
      source: { start: 25, end: 94 },
      destination: { start: 18, end: 87 }
    }
  ]
},
{
  source: 'light',
  destination: 'temperature',
  ranges: [
    {
      source: { start: 77, end: 99 },
      destination: { start: 45, end: 77 }
    },
    {
      source: { start: 45, end: 63 },
      destination: { start: 81, end: 99 }
    },
    {
      source: { start: 64, end: 76 },
      destination: { start: 68, end: 80 }
    }
  ]
},
{
  source: 'temperature',
  destination: 'humidity',
  ranges: [
    {
      source: { start: 69, end: 69 },
      destination: { start: 0, end: 0 }
    },
    {
      source: { start: 0, end: 68 },
      destination: { start: 1, end: 69 }
    }
  ]
},
{
  source: 'humidity',
  destination: 'location',
  ranges: [
    {
      source: { start: 56, end: 92 },
      destination: { start: 60, end: 96 }
    },
    {
      source: { start: 93, end: 96 },
      destination: { start: 56, end: 59 }
    }
  ]
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
  expect(day.part2Example()).toBe("46");
  return day.readAndReturnEntries(day.testFilePart2()).then(entries => expect(day.part2(entries)).toBe(day.part2Example()));
});
