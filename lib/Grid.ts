
export class Grid<T> {
  maxX: number;
  maxY: number;
  cells: (T|undefined)[][];

  constructor(width: number, height: number) {
    this.cells = [] as T[][]
    this.maxX = width - 1;
    this.maxY = height - 1;
    for (let x = 0; x <= this.maxX; x++) {
      this.cells.push([]);
      for (let y = 0; y <= this.maxY; y++) {
        this.cells[x].push(undefined as T);
      }
    }
  }

  public static fromEntries<T>(entries: string[], parseCell: (cellValue: string) => T) {
    const grid = new Grid<T>(entries[0].length, entries.length);
    for (let x = 0; x <= grid.maxX; x++) {
      for (let y = 0; y <= grid.maxY; y++) {
        grid.setCell(x, y, parseCell(entries[y].charAt(x)));
      }
    }
    return grid;
  }

  getCell(x: number, y: number): T|undefined {
    return this.cells[x][y];
  }

  setCell(x: number, y: number, c: T) {
    this.cells[x][y] = c;
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
      grid.cells[x] = this.cells[x].slice(Y - yOffset, Y + yOffset+1);
    }
    return grid;
  }

  logToConsole(formatter: (c:T|undefined) => string){
    console.log(`--- ${this.maxX+1} X ${this.maxY+1} Grid -----`)
    for(let y = 0; y<= this.maxY; y++){
      const Xs = this.cells.map(c => formatter(c[y])).join('');
      console.log(('0'+y).slice(-4) + ' : ' + Xs);
    }
    console.log(`--- ---------------------`)
  }
}

