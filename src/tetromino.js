const COLOR = "GRAY";
export default class Grid {
  constructor() {}

  draw(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = "RED";
    ctx.lineWidth = "1";
    ctx.rect(0, 0, 4 * 32, 4 * 32);
    ctx.stroke();
    for (let column = 0; column < 4 * 32; column += 32) {
      for (let row = 0; row < 240 * 32; row += 32) {
        // ctx.beginPath();
        // ctx.strokeStyle = COLOR;
        // ctx.lineWidth = "1";
        // ctx.rect(column, row, this.gridSize, this.gridSize);
        // ctx.stroke();
      }
    }
  }

  update(deltaTime) {
    if (!deltaTime) return;
  }
}
