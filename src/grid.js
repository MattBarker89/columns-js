const COLOR = "GRAY";
export default class Grid {
  constructor() {}

  draw(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = "GREEN";
    ctx.lineWidth = "1";
    ctx.rect(0, 0, 10 * 32, 20 * 32);
    ctx.stroke();
    for (let column = 0; column < 10 * 32; column += 32) {
      for (let row = 0; row < 20 * 32; row += 32) {
        ctx.beginPath();
        ctx.strokeStyle = COLOR;
        ctx.lineWidth = "1";
        ctx.rect(column, row, 32, 32);
        ctx.stroke();
      }
    }
  }

  update(deltaTime) {
    if (!deltaTime) return;
  }
}
