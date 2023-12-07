import { describe, expect, test } from '@jest/globals';
import { Day07, calculateHandWithoutJokers, parseHand, compareHands, sortHandsInAscendingRankingOrder} from './Day07'

const day = new Day07();
test("base path points to __dirname", () => expect(day.basePath()).toBe(__dirname));

const testEntries = [
  '32T3K 765',
  'T55J5 684',
  'KK677 28',
  'KTJJT 220',
  'QQQJA 483'
]

const typesOfHands = [
  'AAAAA',
  'AA8AA',
  '23332',
  'TTT98',
  '23432',
  'A23A4',
  '23456'
]


const testHands = [
  { symbols: '32T3K'.split(''), type: 1, bid: 765 },
  { symbols: 'T55J5'.split(''), type: 3, bid: 684 },
  { symbols: 'KK677'.split(''), type: 2, bid: 28 },
  { symbols: 'KTJJT'.split(''), type: 2, bid: 220 },
  { symbols: 'QQQJA'.split(''), type: 3, bid: 483 }
]
//////// PART 1
test('parseHand(entry: string) : Hand', () => {
  expect(parseHand(testEntries[0], calculateHandWithoutJokers)).toStrictEqual(testHands[0]);
  expect(parseHand(testEntries[1], calculateHandWithoutJokers)).toStrictEqual(testHands[1]);
  expect(parseHand(testEntries[2], calculateHandWithoutJokers)).toStrictEqual(testHands[2]);
  expect(parseHand(testEntries[3], calculateHandWithoutJokers)).toStrictEqual(testHands[3]);
  expect(parseHand(testEntries[4], calculateHandWithoutJokers)).toStrictEqual(testHands[4]);
});

test('calculateHand(h: Hand) : number', () => {
  expect(calculateHandWithoutJokers(typesOfHands[0].split(''))).toBe(6);  // Five of a kind
  expect(calculateHandWithoutJokers(typesOfHands[1].split(''))).toBe(5);  // Four of a kind
  expect(calculateHandWithoutJokers(typesOfHands[2].split(''))).toBe(4);  // Full house
  expect(calculateHandWithoutJokers(typesOfHands[3].split(''))).toBe(3);  // Three of a kind
  expect(calculateHandWithoutJokers(typesOfHands[4].split(''))).toBe(2);  // Two pairs
  expect(calculateHandWithoutJokers(typesOfHands[5].split(''))).toBe(1);  // One pair
  expect(calculateHandWithoutJokers(typesOfHands[6].split(''))).toBe(0);  // High Card

  expect(calculateHandWithoutJokers(testHands[0].symbols)).toBe(1);  // 1 pair
  expect(calculateHandWithoutJokers(testHands[1].symbols)).toBe(3);  // 3 of a kind
  expect(calculateHandWithoutJokers(testHands[2].symbols)).toBe(2);  // 2 pairs
  expect(calculateHandWithoutJokers(testHands[3].symbols)).toBe(2);  // 2 pairs
  expect(calculateHandWithoutJokers(testHands[4].symbols)).toBe(3);  // 3 of a kind
});

test('compareHands(a: Hand, b: Hand): number', () =>{
  expect(compareHands(testHands[0],testHands[0])).toBe(0);
  expect(compareHands(testHands[0],testHands[1])).toBeGreaterThan(0);  // first hand smaller than all others
  expect(compareHands(testHands[0],testHands[2])).toBeGreaterThan(0);  // first hand smaller than all others
  expect(compareHands(testHands[0],testHands[3])).toBeGreaterThan(0);  // first hand smaller than all others
  expect(compareHands(testHands[0],testHands[4])).toBeGreaterThan(0);  // first hand smaller than all others

  expect(compareHands(testHands[4],testHands[4])).toBe(0);
  expect(compareHands(testHands[4],testHands[0])).toBeLessThan(0);     // last hand higher than all others
  expect(compareHands(testHands[4],testHands[1])).toBeLessThan(0);     // last hand higher than all others
  expect(compareHands(testHands[4],testHands[2])).toBeLessThan(0);     // last hand higher than all others
  expect(compareHands(testHands[4],testHands[3])).toBeLessThan(0);     // last hand higher than all others
});

test('sortHandsInAscendingRankingOrder(hands: Hand[])', () =>{
  const handsBeforeSorting = testHands.map(h=>h);
  sortHandsInAscendingRankingOrder(testHands);
  expect(testHands).toStrictEqual([
    handsBeforeSorting[0],
    handsBeforeSorting[3],
    handsBeforeSorting[2],
    handsBeforeSorting[1],
    handsBeforeSorting[4],
  ]);
});


test('example 1', () => {
  expect(day.part1Example()).toBe("6440");
  expect(day.part1(testEntries)).toBe("6440");
});


//////// PART 2

test('example 2', () => {
  expect(day.part2Example()).toBe("???");
  return day.readAndReturnEntries(day.testFilePart2()).then(entries => expect(day.part2(entries)).toBe(day.part2Example()));
});
