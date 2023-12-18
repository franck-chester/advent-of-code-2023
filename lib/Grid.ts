export class Grid<T> {
  cells: (T | undefined)[][];

  get width() {
    return this.cells.length;
  }

  get height() {
    return this.cells.length > 0 ? this.cells[0].length : 0;
  }
  get maxX() {
    return this.width - 1;
  }
  get maxY() {
    return this.height - 1;
  }

  constructor(width: number, height: number, defaultValue?: T) {
    this.cells = [] as T[][]

    for (let x = 0; x <= width - 1; x++) {
      this.cells.push([]);
      for (let y = 0; y <= height - 1; y++) {
        this.cells[x].push((typeof defaultValue !== 'undefined')? defaultValue : undefined as T);
      }
    }
  }

  public static fromEntries<T>(entries: string[], parseCell: (cellValue: string, x?:number, y?:number) => T) {
    const grid = new Grid<T>(entries[0].length, entries.length);
    for (let x = 0; x <= grid.maxX; x++) {
      for (let y = 0; y <= grid.maxY; y++) {
        grid.setCell(x, y, parseCell(entries[y].charAt(x), x, y));
      }
    }
    return grid;
  }

  getCell(x: number, y: number): T | undefined {
    return this.cells[x][y];
  }

  setCell(x: number, y: number, c: T) {
    this.cells[x][y] = c;
  }

  getCol(x: number): (T | undefined)[] {
    return this.cells[x]
  }

  insertEmptyColumnAt(x: number, defaultItem: T): void {
    this.cells.splice(x, 0, Array(this.width).fill(defaultItem));
  }

  pushColumn(col: T[]): void {
    this.cells.push(col);
  }
  pushRow(row: T[]): void {
    //console.log(`pushRow [${row}]`)
    if(this.height == 0) row.forEach((_,x) =>  this.cells.push([]));
    row.forEach((c,x) =>  this.cells[x].push(c));
    //console.log(`pushRow - height was 0, is now ${this.height} after inserting row`)

  }

  getRow(y: number): (T | undefined)[] {
    return this.cells.map(col => col[y])
  }

  insertRowAt(y: number, defaultItem: T): void {
    this.cells.forEach(col => col.splice(y, 0, defaultItem));

  }


  subGridCentredOn(X: number, Y: number, width: number, height: number): Grid<T> {
    const errorMsg = `subGridCentredOn(x= ${X}, y = ${Y}, width = ${width}, height = ${height})`
    if (width % 2 == 0 || height % 2 == 0) throw (`${errorMsg} - Both width and hight MUST be odd numbers!`);
    const xOffset = (width - 1) / 2;
    const yOffset = (height - 1) / 2;
    if (X - xOffset < 0
      || X + xOffset > this.maxX
      || Y - yOffset < 0
      || Y + yOffset > this.maxY) throw (`${errorMsg} - subGrid overlaps at least one edge! xOffset = ${xOffset}, yOffset = ${yOffset}`);
    const grid = new Grid<T>(width, height);
    for (let i = 0; i < width; i++) {
      const x = X - xOffset + i;
      grid.cells[x] = this.cells[x].slice(Y - yOffset, Y + yOffset + 1);
    }
    return grid;
  }

  logToConsole(formatter: (c: T | undefined) => string) {
    console.log(`--- ${this.maxX + 1} X ${this.maxY + 1} Grid -----`)
    console.log(`---- : ${'012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789'.substring(0, this.width)}`)
    for (let y = 0; y <= this.maxY; y++) {
      const Xs = this.cells.map(c => formatter(c[y])).join('');
      console.log(('000' + y).slice(-4) + ' : ' + Xs);
    }
    console.log(`--- ---------------------`)
  }
}

/////////////////////////////
// ACTUAL CODE - Part ONE  //
/////////////////////////////
export type Step = {
    x: number;
    y: number;
    direction: number;
};
export type Path = Array<Step>;

// 0 is left to right, 1 top to bottom, 2 right to left, 3 bottom to top
export const enum Direction {
    Right = 0,
    Down,
    Left,
    Up
};

export function oppositeDirection(direction: Direction): Direction {
    switch (direction) {
        case Direction.Right: return Direction.Left;
        case Direction.Down: return Direction.Up;
        case Direction.Left: return Direction.Right;
        case Direction.Up: return Direction.Down;
    }
}

