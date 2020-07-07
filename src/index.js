import * as Constants from "./Constants.js";
import Grid from "./grid.js";
import Tetromino from "./tetromino.js";

window.addEventListener("keydown", keyDown, false);
window.addEventListener("keyup", keyUp, false);

let keyDowns = {
  left: false,
  right: false,
  up: false,
  down: false,
  space: false,
};
let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");
let lastTime = 0;

let grid = new Grid();
let tetromino = new Tetromino();

function init() {}

function gameLoop(timestamp) {
  let deltaTime = timestamp - lastTime;
  lastTime = timestamp;
  ctx.clearRect(
    0,
    0,
    Constants.COLUMNS * Constants.GRID_SIZE,
    Constants.ROWS * Constants.GRID_SIZE
  );
  grid.update(deltaTime);
  tetromino.update(deltaTime);
  grid.draw(ctx);
  tetromino.draw(ctx);
  requestAnimationFrame(gameLoop);
}

function keyDown(e) {
  let code = e.keyCode;
  switch (code) {
    case 87:
      keyDowns.up = true;
      break;
    case 83:
      tetromino.startSpeedUp();
      keyDowns.down = true;
      break;
    case 65:
      keyDowns.left = true;
      break;
    case 68:
      keyDowns.right = true;
      break;
    case 32:
      keyDowns.space = true;
      break;
    default:
      return;
  }
}

function keyUp(e) {
  let code = e.keyCode;
  switch (code) {
    case 87:
      tetromino.rotate();
      keyDowns.up = false;
      break;
    case 83:
      tetromino.stopSpeedUp();
      keyDowns.down = false;
      break;
    case 65:
      tetromino.moveLeft();
      keyDowns.left = false;
      break;
    case 68:
      tetromino.moveRight();
      keyDowns.right = false;
      break;
    case 32:
      tetromino.changeType();
      keyDowns.space = false;
      break;
    default:
      return;
  }
}

init();
gameLoop();
