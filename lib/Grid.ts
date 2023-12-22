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

  constructor(width: number, height: number, defaultCellValue: (x: number, y: number) => T) {
    this.cells = [] as T[][]

    for (let x = 0; x <= width - 1; x++) {
      this.cells.push([]);
      for (let y = 0; y <= height - 1; y++) {
        this.cells[x].push(defaultCellValue(x, y));
      }
    }
  }

  public static fromEntries<T>(entries: string[], parseCell: (cellValue: string, x?: number, y?: number) => T) {
    const grid = new Grid<T>(entries[0].length, entries.length, (x,y)=>parseCell(entries[y].charAt(x), x, y));
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
    if (this.height == 0) row.forEach((_, x) => this.cells.push([]));
    row.forEach((c, x) => this.cells[x].push(c));
    //console.log(`pushRow - height was 0, is now ${this.height} after inserting row`)

  }

  getRow(y: number): (T | undefined)[] {
    return this.cells.map(col => col[y])
  }

  insertRowAt(y: number, defaultItem: T): void {
    this.cells.forEach(col => col.splice(y, 0, defaultItem));

  }

  logToConsole(formatter: (c: T | undefined) => string) {
    const line = Array(this.width).fill('-').join('');
    console.log(`----- ${this.maxX + 1} X ${this.maxY + 1} Grid ${line}`.substring(0, this.width+11));
    let hundredsLine = '--- : ';
    let tensLine = '--- : ';
    let unitsLine = '--- : ';
    for (let y = 0; y < this.width; y++) {
      const hundreds = Math.floor(y / 100) % 10;
      const tens = Math.floor(y / 10) % 10;
      const units = y % 10;
      hundredsLine += hundreds == 0 ? ' ' : hundreds;
      tensLine += tens == 0 ? (hundreds == 0? ' ': tens) : tens;
      unitsLine += units;
    }
    if(this.width>99) console.log(hundredsLine + ' : ---');
    if(this.width>9)console.log(tensLine + ' : ---');
    console.log(unitsLine + ' : ---');
    for (let y = 0; y <= this.maxY; y++) {
      const Xs = this.cells.map(c => formatter(c[y])).join('');
      console.log(('' + y).padStart(3, ' ') + ' : ' + Xs + ' : ' + y);
    }
    if(this.width>99) console.log(hundredsLine + ' : ---');
    if(this.width>9)console.log(tensLine + ' : ---');
    console.log(unitsLine + ' : ---');
    console.log(`------${line}------`)
  }

  forEach(logic: (c: T | undefined, x?: number, y?: number) => any) {
    this.cells.forEach((column, y) => column.forEach((c, x) => logic(c, x, y)));
  }
}


