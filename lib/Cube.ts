import { Grid } from "./Grid";

class Plane<T> extends Grid<T>{
  direction: 'X' | 'Y' | 'Z';
  constructor(direction: 'X' | 'Y' | 'Z', width: number, height: number, defaultCellValue: (x: number, y: number) => T) {
    super(width, height, defaultCellValue);
    this.direction = direction;
  }
}
export class Cube<T> {
  cells: T[][][];

  // x
  get width() {
    return this.cells.length;
  }

  // y
  get height() {
    return this.width > 0 ? this.cells[0].length : 0;
  }

  // z
  get depth() {
    return this.height > 0 ? this.cells[0][0].length : 0;
  }



  get maxX() {
    return this.width - 1;
  }
  get maxY() {
    return this.height - 1;
  }
  get maxZ() {
    return this.depth - 1;
  }

  constructor(width: number, height: number, depth: number, defaultCellValue: (x: number, y: number, z: number) => T) {
    this.cells = [] as T[][][]

    for (let x = 0; x < width; x++) {
      this.cells.push([]);
      for (let y = 0; y < height; y++) {
        this.cells[x].push([]);
        for (let z = 0; z < depth; z++) {
          this.cells[x][y].push(defaultCellValue(x, y, z));
        }
      }
    }
  }

  getCell(x: number, y: number, z: number): T {
    return this.cells[x][y][z];
  }

  setCell(x: number, y: number, z: number, c: T) {
    this.cells[x][y][z] = c;
  }

  getPlaneAlong(direction: 'X' | 'Y' | 'Z', a: number): Plane<T> {
    switch (direction) {
      case "X": return new Plane<T>(direction, this.height, this.depth, (y, z) => this.getCell(a, y, z)); // a is x
      case "Y": return new Plane<T>(direction, this.width, this.depth, (x, z) => this.getCell(x, a, z)); // a is y
      case "Z": return new Plane<T>(direction, this.width, this.height, (x, y) => this.getCell(x, y, a)); // a is z
    }
  }

  getDimensionAlong(direction: 'X' | 'Y' | 'Z'): number {
    switch (direction) {
      case "X": return this.width;
      case "Y": return this.height;
      case "Z": return this.depth;
    }
  }

  logToConsole(direction: 'X' | 'Y' | 'Z', a: number, formatter: (c: T | undefined) => string) {
    const line = Array(this.getDimensionAlong(direction)).fill('-').join('');
    console.log(`----- Plane along ${direction} axis at ${direction} = ${a}   ${line}`.substring(0, this.getDimensionAlong(direction) + 11));
    this.getPlaneAlong(direction, a).logToConsole(formatter);
  }

  forEach(logic: (c: T | undefined, x?: number, y?: number, z?: number) => any) {
    this.cells.forEach((plane, z) => plane.forEach((column, y) => column.forEach((c, x) => logic(c, x, y))));
  }
}


