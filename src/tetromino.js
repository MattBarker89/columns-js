import * as Constants from "./Constants.js";
const COLOR = "GRAY";
const moveSound = new Audio("move.mp3");
const rotateSound = new Audio("rotate.mp3");
const stoppedSound = new Audio("stopped.mp3");
const changedSound = new Audio("change.mp3");
export default class Tetrominos {
  constructor() {
    // prettier-ignore
    this.layouts = [
      [ // LONG
        [
          0, 0, 0, 0,
          1, 1, 1, 1,
          0, 0, 0, 0, 
          0, 0, 0, 0,
        ],
        [ 
          0, 0, 1, 0,
          0, 0, 1, 0,
          0, 0, 1, 0, 
          0, 0, 1, 0,
        ],
        [
          0, 0, 0, 0,
          0, 0, 0, 0,
          1, 1, 1, 1, 
          0, 0, 0, 0,
        ],
        [
          0, 1, 0, 0,
          0, 1, 0, 0,
          0, 1, 0, 0, 
          0, 1, 0, 0,
        ],
      ],
      [ // LEFT PIPE
        [ 
          1, 0, 0, 0,
          1, 1, 1, 0,
          0, 0, 0, 0, 
          0, 0, 0, 0,
        ],
        [ 
          0, 1, 1, 0,
          0, 1, 0, 0,
          0, 1, 0, 0, 
          0, 0, 0, 0,
        ],
        [
          0, 0, 0, 0,
          1, 1, 1, 0,
          0, 0, 1, 0, 
          0, 0, 0, 0,
        ],
        [
          0, 1, 0, 0,
          0, 1, 0, 0,
          1, 1, 0, 0, 
          0, 0, 0, 0,
        ],
      ],
      [ // RIGHT PIPE
        [ 
          0, 0, 0, 1,
          0, 1, 1, 1,
          0, 0, 0, 0, 
          0, 0, 0, 0,
        ],
        [ 
          0, 0, 1, 0,
          0, 0, 1, 0,
          0, 0, 1, 1, 
          0, 0, 0, 0,
        ],
        [
          0, 0, 0, 0,
          1, 1, 1, 0,
          1, 0, 0, 0, 
          0, 0, 0, 0,
        ],
        [
          1, 1, 0, 0,
          0, 1, 0, 0,
          0, 1, 0, 0, 
          0, 0, 0, 0,
        ],
      ],
      [ // CUBE
        [ 
          0, 1, 1, 0,
          0, 1, 1, 0,
          0, 0, 0, 0, 
          0, 0, 0, 0,
        ],
        [ 
          0, 1, 1, 0,
          0, 1, 1, 0,
          0, 0, 0, 0, 
          0, 0, 0, 0,
        ],
        [
          0, 1, 1, 0,
          0, 1, 1, 0,
          0, 0, 0, 0, 
          0, 0, 0, 0,
        ],
        [
          0, 1, 1, 0,
          0, 1, 1, 0,
          0, 0, 0, 0, 
          0, 0, 0, 0,
        ],
      ],
      [ // LEFT SNAKE
        [ 
          0, 1, 1, 0,
          1, 1, 0, 0,
          0, 0, 0, 0, 
          0, 0, 0, 0,
        ],
        [ 
          0, 1, 0, 0,
          0, 1, 1, 0,
          0, 0, 1, 0, 
          0, 0, 0, 0,
        ],
        [
          0, 0, 0, 0,
          0, 1, 1, 0,
          1, 1, 0, 0, 
          0, 0, 0, 0,
        ],
        [
          1, 0, 0, 0,
          1, 1, 0, 0,
          0, 1, 0, 0, 
          0, 0, 0, 0,
        ],
      ],
      [ // TEE
        [ 
          0, 0, 1, 0,
          0, 1, 1, 1,
          0, 0, 0, 0, 
          0, 0, 0, 0,
        ],
        [ 
          0, 0, 1, 0,
          0, 0, 1, 1,
          0, 0, 1, 0, 
          0, 0, 0, 0,
        ],
        [
          0, 0, 0, 0,
          0, 1, 1, 1,
          0, 0, 1, 0, 
          0, 0, 0, 0,
        ],
        [
          0, 0, 1, 0,
          0, 1, 1, 0,
          0, 0, 1, 0, 
          0, 0, 1, 0,
        ],
      ],
      [ // RIGHT SNAKE
        [ 
          1, 1, 0, 0,
          0, 1, 1, 0,
          0, 0, 0, 0, 
          0, 0, 0, 0,
        ],
        [ 
          0, 0, 1, 0,
          0, 1, 1, 0,
          0, 1, 0, 0, 
          0, 0, 0, 0,
        ],
        [
          0, 0, 0, 0,
          1, 1, 0, 0,
          0, 1, 1, 0, 
          0, 0, 0, 0,
        ],
        [
          0, 1, 0, 0,
          1, 1, 0, 0,
          1, 0, 0, 0, 
          0, 0, 0, 0,
        ],
      ],
    ]
    this.rotation = 0;
    this.x =
      (Constants.GRID_SIZE * Constants.COLUMNS) / 2 - 2 * Constants.GRID_SIZE;
    this.y = 0 - Constants.GRID_SIZE - 4 * Constants.GRID_SIZE;
    this.currentTime = 0;
    this.spedUp;
    this.stopped;
    this.movingLeft = false;
    this.movingRight = false;
    this.type = 6;
    this.colors = [
      "AQUA",
      "BLUE",
      "ORANGE",
      "YELLOW",
      "LIME",
      "FUCHSIA",
      "PURPLE",
    ];
  }
  ww;

  draw(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = "RED";
    ctx.lineWidth = "4";
    //ctx.rect(this.x, this.y, 4 * Constants.GRID_SIZE, 4 * Constants.GRID_SIZE);
    this.drawLayout(ctx);
    ctx.stroke();
  }

  drawLayout(ctx) {
    ctx.strokeStyle = this.colors[this.type];
    let column = 0;
    let row = 0;
    this.layouts[this.type][this.rotation].forEach((e) => {
      if (e === 1) {
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
      moveSound.play();
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
      stoppedSound.play();
      this.stopped = true;
    }
  }

  moveRight() {
    if (this.stopped) return;
    moveSound.play();
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
    moveSound.play();
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
    rotateSound.play();
    this.rotation++;
    if (this.rotation >= 4) this.rotation = 0;
  }

  changeType() {
    this.type++;
    changedSound.play();
    if (this.type >= 6) this.type = 0;
  }
}
