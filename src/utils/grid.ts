export type Position = { x: number, y: number }

export class Grid {
  cells: Map<string, string>;
  size: number;

  constructor(size: number) {
    this.cells = new Map();
    this.size = size;
  }

  key(x: number, y: number) {
    return `${x}, ${y}`;
  }

  set(x: number, y: number, value) {
    if (x < this.size && y < this.size) {
      this.cells.set(this.key(x, y), value)
    }
  }

  get(x: number, y: number) {
    return this.cells.get(this.key(x, y))
  }

  has(x: number, y: number) {
    return this.cells.has(this.key(x, y));
  }

  delete(x: number, y: number) {
    return this.cells.delete(this.key(x, y));
  }



  print() {
    let grid: string = "";

    for (let i = 0; i < this.size; i++) {
      let row = ""
      for (let j = 0; j < this.size; j++) {
        if (this.has(j, i)) {
          row += this.get(j, i)
        } else {
          row += ".";
        }
      }
      grid += row + '\n'
    }
    return grid
  }

}
