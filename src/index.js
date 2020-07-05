import Grid from "./grid.js";
import Tetromino from "./tetromino.js";

const GRID_SIZE = 32;
const NUM_COLUMNS = 10;
const NUM_ROWS = 20;
const SCREEN_SIZE = {
  width: NUM_COLUMNS * GRID_SIZE,
  height: NUM_ROWS * NUM_ROWS,
};

window.addEventListener("keydown", keyDown, false);
window.addEventListener("keyup", keyUp, false);

let keyDowns = { left: false, right: false, up: false, down: false };
let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");
let lastTime = 0;

let grid = new Grid();
let tetromino = new Tetromino();

function init() {
  console.log(`Started Game`);
}

function gameLoop(timestamp) {
  let deltaTime = timestamp - lastTime;
  lastTime = timestamp;
  grid.draw(ctx);
  tetromino.draw(ctx);
  //  / ctx.clearRect(0, 0, SCREEN_SIZE.width, SCREEN_SIZE.height);
  requestAnimationFrame(gameLoop);
}

function keyDown(e) {
  let code = e.keyCode;
  switch (code) {
    case 87:
      keyDowns.up = true;
      break;
    case 83:
      keyDowns.down = true;
      break;
    case 65:
      keyDowns.left = true;
      break;
    case 68:
      keyDowns.right = true;
      break;
    default:
      return;
  }
}

function keyUp(e) {
  let code = e.keyCode;
  switch (code) {
    case 87:
      keyDowns.up = false;
      break;
    case 83:
      keyDowns.down = false;
      break;
    case 65:
      keyDowns.left = false;
      break;
    case 68:
      keyDowns.right = false;
      break;
    default:
      return;
  }
}

init();
gameLoop();
