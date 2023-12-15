import { expect, test } from '@jest/globals';
import { determineDataFileName, readEntriesFromDataFile } from '../lib/AdventOfCodeChallenge';
import { Box, applyInstruction, hash, part1, part2} from './Day15'


//////// PART 1
test('hash()', () => {
  expect(hash('HASH')).toBe('52');
  expect(hash('rn=1')).toBe('30');
  expect(hash('cm-')).toBe('253');
  expect(hash('qp=3')).toBe('97');
  expect(hash('cm=2')).toBe('47');
  expect(hash('qp-')).toBe('14');
  expect(hash('pc=4')).toBe('180');
  expect(hash('ot=9')).toBe('9');
  expect(hash('ab=5')).toBe('197');
  expect(hash('pc-')).toBe('48');
  expect(hash('pc=6')).toBe('214');
  expect(hash('ot=7')).toBe('231');

});

//////// PART 2
const boxes = [] as Box[];
for(let b=0; b<256; b++) boxes.push(new Map<string, { position: number; focal: string; }>());

test('hash()', () => {
  expect(hash('rn')).toBe('0');
  expect(hash('cm')).toBe('0');
  expect(hash('qp')).toBe('1');
});

test('example 2', () => {
  applyInstruction('rn=1', boxes);
  expect(boxes[0].size).toBe(1);
  expect(boxes[0].get('rn')).toStrictEqual({position:0, focal:'1'});

  applyInstruction('cm-', boxes);
  expect(boxes[0].size).toBe(1);
  expect(boxes[0].get('rn')).toStrictEqual({position:0, focal:'1'});

  applyInstruction('qp=3', boxes);
  expect(boxes[0].size).toBe(1);
  expect(boxes[0].get('rn')).toStrictEqual({position:0, focal:'1'});
  expect(boxes[1].size).toBe(1);
  expect(boxes[1].get('qp')).toStrictEqual({position:0, focal:'3'});

  applyInstruction('cm=2', boxes);
  expect(boxes[0].size).toBe(2);
  expect(boxes[0].get('rn')).toStrictEqual({position:0, focal:'1'});
  expect(boxes[0].get('cm')).toStrictEqual({position:1, focal:'2'});
  expect(boxes[1].size).toBe(1);
  expect(boxes[1].get('qp')).toStrictEqual({position:0, focal:'3'});

});