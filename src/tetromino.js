import * as Constants from "./Constants.js";
import Grid from "./grid.js";
const COLOR = "GRAY";
const SOUND = false;
const moveSound = new Audio("move.mp3");
const rotateSound = new Audio("rotate.mp3");
const stoppedSound = new Audio("stopped.mp3");
const changedSound = new Audio("change.mp3");
export default class Tetrominos {
  constructor(grid) {
    // prettier-ignore
    this.layouts = Constants.layouts;
    this.colors = Constants.colors;
    this.grid = grid;
    this.rotation = 0;
    this.x =
      (Constants.GRID_SIZE * Constants.COLUMNS) / 2 - 2 * Constants.GRID_SIZE;
    this.y = 0 - Constants.GRID_SIZE - 4 * Constants.GRID_SIZE;
    this.currentTime = 0;
    this.spedUp = false;
    this.stopped = false;
    this.movingLeft = false;
    this.movingRight = false;
    this.type = this.randomNumber(0, 1);
    //this.type = 0;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = "RED";
    ctx.lineWidth = "4";
    ctx.rect(this.x, this.y, 4 * Constants.GRID_SIZE, 4 * Constants.GRID_SIZE);
    this.drawLayout(ctx);
    ctx.stroke();
  }

  drawLayout(ctx) {
    ctx.strokeStyle = this.colors[this.type];
    let column = 0;
    let row = 0;
    this.layouts[this.type][this.rotation].forEach((e) => {
      if (e != "") {
        ctx.rect(
          this.x + Constants.GRID_SIZE * column,
          this.y + Constants.GRID_SIZE * row,
          Constants.GRID_SIZE,
          Constants.GRID_SIZE
        );
      }
      column++;
      if (column >= 4) {
        row++;
        column = 0;
      }
    });
  }

  update(deltaTime) {
    if (!deltaTime || this.stopped) return;
    this.currentTime += deltaTime;
    if (
      this.currentTime >= 1 * 1000 ||
      (this.currentTime >= 0.05 * 1000 && this.spedUp)
    ) {
      if (SOUND) moveSound.play();
      this.y += Constants.GRID_SIZE;
      this.currentTime = 0;
      this.maybeStop();
    }
  }

  maybeStop() {
    if (
      this.y >=
      Constants.GRID_SIZE * Constants.ROWS - 4 * Constants.GRID_SIZE
    ) {
      if (SOUND) stoppedSound.play();
      this.stopped = true;
      this.saveToGrid();
      this.reset();
    }
  }

  moveRight() {
    if (this.stopped) return;
    if (SOUND) moveSound.play();
    this.x += Constants.GRID_SIZE;
    if (
      this.x >
      Constants.GRID_SIZE * Constants.COLUMNS - 4 * Constants.GRID_SIZE
    ) {
      this.x =
        Constants.GRID_SIZE * Constants.COLUMNS - 4 * Constants.GRID_SIZE;
    }
  }

  moveLeft() {
    if (this.stopped) return;
    if (SOUND) moveSound.play();
    this.x -= Constants.GRID_SIZE;
    if (this.x < 0) {
      this.x = 0;
    }
  }

  startSpeedUp() {
    if (this.spedUp) return;
    this.spedUp = true;
  }

  stopSpeedUp() {
    if (!this.spedUp) return;
    this.spedUp = false;
  }

  rotate() {
    if (this.stopped) return;
    if (SOUND) rotateSound.play();
    this.rotation++;
    if (this.rotation >= 4) this.rotation = 0;
  }

  changeType() {
    this.type++;
    if (SOUND) changedSound.play();
    if (this.type >= 6) this.type = 0;
  }

  randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  saveToGrid() {
    this.grid.addTetromino(
      this.x / Constants.GRID_SIZE,
      this.y / Constants.GRID_SIZE,
      this.type,
      this.rotation
    );
  }
  reset() {
    setTimeout(() => {
      this.rotation = 0;
      this.x =
        (Constants.GRID_SIZE * Constants.COLUMNS) / 2 - 2 * Constants.GRID_SIZE;
      this.y = 0 - Constants.GRID_SIZE - 4 * Constants.GRID_SIZE;
      this.spedUp = false;
      this.stopped = false;
      this.movingLeft = false;
      this.movingRight = false;
      console.log(this.type);
    }, 1 * 1000);
  }
}
