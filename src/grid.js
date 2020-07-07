import * as Constants from "./Constants.js";
const COLOR = "#3a3a3a";
export default class Grid {
  constructor() {
    this.currentTime = 0;
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
  }

  update(deltaTime) {
    if (!deltaTime) return;
    this.currentTime += deltaTime;
    if (this.currentTime >= 1000) {
      this.currentTime = 0;
    }
  }
}
