import * as Constants from "./Constants.js";
const COLOR = "#3a3a3a";
export default class Grid {
  constructor() {
    this.currentTime = 0;
    this.layouts = Constants.layouts;
    this.colors = Constants.colors;
    this.currentGrid = Constants.grid;
  }

  draw(ctx) {
    for (
      let column = 0;
      column < Constants.COLUMNS * Constants.GRID_SIZE;
      column += Constants.GRID_SIZE
    ) {
      for (
        let row = 0;
        row < Constants.ROWS * Constants.GRID_SIZE;
        row += Constants.GRID_SIZE
      ) {
        ctx.beginPath();
        ctx.strokeStyle = COLOR;
        ctx.lineWidth = "1";
        ctx.rect(column, row, Constants.GRID_SIZE, Constants.GRID_SIZE);
        ctx.stroke();
      }
    }
    ctx.beginPath();
    ctx.strokeStyle = "WHITE";
    Constants.GRID_SIZE;
    ctx.lineWidth = "4";
    ctx.rect(
      0,
      0,
      Constants.COLUMNS * Constants.GRID_SIZE,
      Constants.ROWS * Constants.GRID_SIZE
    );
    ctx.stroke();
    for (
      let column = 0;
      column < Constants.COLUMNS * Constants.GRID_SIZE;
      column += Constants.GRID_SIZE
    ) {
      for (
        let row = 0;
        row < Constants.ROWS * Constants.GRID_SIZE;
        row += Constants.GRID_SIZE
      ) {
        if (this.currentGrid[row] != 9) {
        }
      }
    }
  }

  addTetromino(x, y, type, rotation) {
    console.log(x, y, type, rotation);
    let startingYPos = (y - 1) * 10;
    let startingXPos = x;
    let horizontalCount = 0;
    this.layouts[type][rotation].forEach((e, i) => {
      if (horizontalCount === 4) {
        startingXPos += 6;
        horizontalCount = 0;
      }
      let currentBlockPosition = startingYPos + startingXPos;
      if (e != 0) this.currentGrid[currentBlockPosition + i] = type;
      horizontalCount++;
    });

    this.printCurrentPiece(this.layouts[type][rotation]);
    this.printCurrentGrid();
  }

  printCurrentGrid() {
    let output = "";
    for (var i = 0; i <= this.currentGrid.length; i++) {
      output += this.currentGrid[i] + " ";
      if (i % 10 === 9) output += "\n";
    }
    console.log(output);
  }

  printCurrentPiece(piece) {
    let output = "";
    let count = 1;
    for (var i = 0; i <= piece.length; i++, count++) {
      output += piece[i] + " ";
      if (count === 4) {
        output += "\n";
        count = 0;
      }
    }
    console.log(output);
  }

  update(deltaTime) {
    if (!deltaTime) return;
    this.currentTime += deltaTime;
    if (this.currentTime >= 1000) {
      this.currentTime = 0;
    }
  }
}
