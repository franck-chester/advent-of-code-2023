import { expect, test } from '@jest/globals';
import { Grid } from './Grid';


test('fromEntries', () => {
    const grid = Grid.fromEntries<number>(['123','456','789'], (s) => parseInt(s));
    expect(grid.cells[0][0]).toBe(1);
    expect(grid.cells[1][1]).toBe(5);
    expect(grid.cells[2][2]).toBe(9);
  });

  test('subGridCentredOn', () => {
    const grid = Grid.fromEntries<number>([
        '111111111',
        '222222222',
        '333333333',
        '444444444',
        '555555555'], (s) => parseInt(s));
    expect(grid.cells[0][0]).toBe(1);
    expect(grid.cells[1][1]).toBe(2);
    expect(grid.cells[2][2]).toBe(3);
    expect(grid.subGridCentredOn(1,1,3,3).cells).toStrictEqual([[1,2,3],[1,2,3],[1,2,3]]);
    grid.cells[0][0] = 7;
    grid.cells[1][1] = 8;
    grid.cells[2][2] = 9;
    expect(grid.subGridCentredOn(1,1,3,3).cells).toStrictEqual([[7,2,3],[1,8,3],[1,2,9]]);
    expect(() => {grid.subGridCentredOn(0,1,3,3)}).toThrow(/subGrid overlaps at least one edge/);
    expect(() => {grid.subGridCentredOn(9,1,3,3)}).toThrow(/subGrid overlaps at least one edge/);
    expect(() => {grid.subGridCentredOn(1,0,3,3)}).toThrow(/subGrid overlaps at least one edge/);
    expect(() => {grid.subGridCentredOn(1,9,3,3)}).toThrow(/subGrid overlaps at least one edge/);
  });