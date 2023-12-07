import { describe, expect, test } from '@jest/globals';
import { Day07, calculateHandWithoutJokers, parseHand, compareHands, sortHandsInAscendingRankingOrder, symbolStrengthPart1, symbolStrengthPart2, calculateHandWithJokers} from './Day07'

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


const testHandsPart1 = [
  { symbols: '32T3K'.split(''), type: 1, bid: 765 },
  { symbols: 'T55J5'.split(''), type: 3, bid: 684 },
  { symbols: 'KK677'.split(''), type: 2, bid: 28 },
  { symbols: 'KTJJT'.split(''), type: 2, bid: 220 },
  { symbols: 'QQQJA'.split(''), type: 3, bid: 483 }
]
//////// PART 1
test('part 1 - parseHand(entry: string) : Hand', () => {
  expect(parseHand(testEntries[0], calculateHandWithoutJokers)).toStrictEqual(testHandsPart1[0]);
  expect(parseHand(testEntries[1], calculateHandWithoutJokers)).toStrictEqual(testHandsPart1[1]);
  expect(parseHand(testEntries[2], calculateHandWithoutJokers)).toStrictEqual(testHandsPart1[2]);
  expect(parseHand(testEntries[3], calculateHandWithoutJokers)).toStrictEqual(testHandsPart1[3]);
  expect(parseHand(testEntries[4], calculateHandWithoutJokers)).toStrictEqual(testHandsPart1[4]);
});

test('calculateHandWithoutJokers(h: Hand) : number', () => {
  expect(calculateHandWithoutJokers(typesOfHands[0].split(''))).toBe(6);  // Five of a kind
  expect(calculateHandWithoutJokers(typesOfHands[1].split(''))).toBe(5);  // Four of a kind
  expect(calculateHandWithoutJokers(typesOfHands[2].split(''))).toBe(4);  // Full house
  expect(calculateHandWithoutJokers(typesOfHands[3].split(''))).toBe(3);  // Three of a kind
  expect(calculateHandWithoutJokers(typesOfHands[4].split(''))).toBe(2);  // Two pairs
  expect(calculateHandWithoutJokers(typesOfHands[5].split(''))).toBe(1);  // One pair
  expect(calculateHandWithoutJokers(typesOfHands[6].split(''))).toBe(0);  // High Card

  expect(calculateHandWithoutJokers(testHandsPart1[0].symbols)).toBe(1);  // 1 pair
  expect(calculateHandWithoutJokers(testHandsPart1[1].symbols)).toBe(3);  // 3 of a kind
  expect(calculateHandWithoutJokers(testHandsPart1[2].symbols)).toBe(2);  // 2 pairs
  expect(calculateHandWithoutJokers(testHandsPart1[3].symbols)).toBe(2);  // 2 pairs
  expect(calculateHandWithoutJokers(testHandsPart1[4].symbols)).toBe(3);  // 3 of a kind
});

test('part 1 - compareHands(a: Hand, b: Hand, , symbolStrengthPart): number', () =>{
  expect(compareHands(testHandsPart1[0],testHandsPart1[0], symbolStrengthPart1)).toBe(0);
  expect(compareHands(testHandsPart1[0],testHandsPart1[1], symbolStrengthPart1)).toBeGreaterThan(0);  // first hand smaller than all others
  expect(compareHands(testHandsPart1[0],testHandsPart1[2], symbolStrengthPart1)).toBeGreaterThan(0);  // first hand smaller than all others
  expect(compareHands(testHandsPart1[0],testHandsPart1[3], symbolStrengthPart1)).toBeGreaterThan(0);  // first hand smaller than all others
  expect(compareHands(testHandsPart1[0],testHandsPart1[4], symbolStrengthPart1)).toBeGreaterThan(0);  // first hand smaller than all others

  expect(compareHands(testHandsPart1[4],testHandsPart1[4], symbolStrengthPart1)).toBe(0);
  expect(compareHands(testHandsPart1[4],testHandsPart1[0], symbolStrengthPart1)).toBeLessThan(0);     // last hand higher than all others
  expect(compareHands(testHandsPart1[4],testHandsPart1[1], symbolStrengthPart1)).toBeLessThan(0);     // last hand higher than all others
  expect(compareHands(testHandsPart1[4],testHandsPart1[2], symbolStrengthPart1)).toBeLessThan(0);     // last hand higher than all others
  expect(compareHands(testHandsPart1[4],testHandsPart1[3], symbolStrengthPart1)).toBeLessThan(0);     // last hand higher than all others
});

test('part 1 - sortHandsInAscendingRankingOrder(hands: Hand[])', () =>{
  const handsBeforeSorting = testHandsPart1.map(h=>h);
  sortHandsInAscendingRankingOrder(testHandsPart1, symbolStrengthPart1);
  expect(testHandsPart1).toStrictEqual([
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
const testHandsPart2 = [
  { symbols: '32T3K'.split(''), type: 1, bid: 765 },
  { symbols: 'T55J5'.split(''), type: 5, bid: 684 },
  { symbols: 'KK677'.split(''), type: 2, bid: 28 },
  { symbols: 'KTJJT'.split(''), type: 5, bid: 220 },
  { symbols: 'QQQJA'.split(''), type: 5, bid: 483 }
]

test('part 2 - parseHand(entry: string) : Hand', () => {
  expect(parseHand(testEntries[0], calculateHandWithJokers)).toStrictEqual(testHandsPart2[0]);
  expect(parseHand(testEntries[1], calculateHandWithJokers)).toStrictEqual(testHandsPart2[1]);
  expect(parseHand(testEntries[2], calculateHandWithJokers)).toStrictEqual(testHandsPart2[2]);
  expect(parseHand(testEntries[3], calculateHandWithJokers)).toStrictEqual(testHandsPart2[3]);
  expect(parseHand(testEntries[4], calculateHandWithJokers)).toStrictEqual(testHandsPart2[4]);
});

test('part 2 - calculateHandWithJokers(h: Hand) : number', () => {
  expect(calculateHandWithJokers(typesOfHands[0].split(''))).toBe(6);  // Five of a kind
  expect(calculateHandWithJokers(typesOfHands[1].split(''))).toBe(5);  // Four of a kind
  expect(calculateHandWithJokers(typesOfHands[2].split(''))).toBe(4);  // Full house
  expect(calculateHandWithJokers(typesOfHands[3].split(''))).toBe(3);  // Three of a kind
  expect(calculateHandWithJokers(typesOfHands[4].split(''))).toBe(2);  // Two pairs
  expect(calculateHandWithJokers(typesOfHands[5].split(''))).toBe(1);  // One pair
  expect(calculateHandWithJokers(typesOfHands[6].split(''))).toBe(0);  // High Card

  expect(calculateHandWithJokers(testHandsPart2[0].symbols)).toBe(1);  // 1 pair
  expect(calculateHandWithJokers(testHandsPart2[1].symbols)).toBe(5);  // 4 of a kind
  expect(calculateHandWithJokers(testHandsPart2[2].symbols)).toBe(2);  // 2 pairs
  expect(calculateHandWithJokers(testHandsPart2[3].symbols)).toBe(5);  // 4 of a kind
  expect(calculateHandWithJokers(testHandsPart2[4].symbols)).toBe(5);  // 4 of a kind
});

test('part 2 - sortHandsInAscendingRankingOrder(hands: Hand[])', () =>{
  const handsBeforeSorting = testHandsPart2.map(h=>h);
  sortHandsInAscendingRankingOrder(testHandsPart2, symbolStrengthPart2);
  expect(testHandsPart2).toStrictEqual([
    handsBeforeSorting[0],
    handsBeforeSorting[2],
    handsBeforeSorting[1],
    handsBeforeSorting[4],
    handsBeforeSorting[3],
  ]);
});

test('example 2', () => {
  expect(day.part2Example()).toBe("5905");
  return day.readAndReturnEntries(day.testFilePart2()).then(entries => expect(day.part2(entries)).toBe(day.part2Example()));
});
