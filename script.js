const canvas = document.querySelector(".game-canvas");
const ctx = canvas.getContext("2d");

const unitSize = 20;

const worldHeight = canvas.clientHeight / unitSize;
const worldWidth = canvas.clientWidth / unitSize;

let world = [];

function clearCanvas() {
  ctx.fillStyle = "Black";
  ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
}

function initWorld() {
  for (let y = 0; y < worldHeight; y++) {
    world[y] = [];
    for (let x = 0; x < worldWidth; x++) {
      // I want more blank spaces
      world[y][x] = Math.random() > 0.9 ? 1 : 0;
    }
  }
}

function drawWorld() {
  ctx.fillStyle = "White";
  for (let y = 0; y < worldHeight; y++) {
    for (let x = 0; x < worldWidth; x++) {
      if (world[y][x] == 1) {
        ctx.fillRect(x * unitSize, y * unitSize, unitSize - 1, unitSize - 1);
      }
    }
  }
}

function checkNeighbors(x, y) {
  let neighbors = 0;
  for (let i = y - 1; i < y + 2; i++) {
    for (let j = x - 1; j < x + 2; j++) {
      if (i < 0 || j < 0 || i >= worldHeight || j >= worldWidth) continue;
      if (world[i][j]) {
        neighbors++;
      }
    }
  }
  // Substract the cell itself
  if (world[y][x] == 1) neighbors--;
  return neighbors;
}

function evolve() {
  // Copying the current world
  let world_copy = [];
  for (let i = 0; i < worldHeight; i++) {
    world_copy[i] = [...world[i]];
  }

  for (let y = 0; y < worldHeight; y++) {
    for (let x = 0; x < worldWidth; x++) {
      if (checkNeighbors(x, y) > 3) {
        world_copy[y][x] = 0;
      } else if (checkNeighbors(x, y) == 3) {
        world_copy[y][x] = 1;
      } else if (checkNeighbors(x, y) < 2) {
        world_copy[y][x] = 0;
      }
    }
  }
  world = world_copy;
}

function gameLoop() {
  setTimeout(() => {
    clearCanvas();
    evolve();
    drawWorld();
    gameLoop();
  }, 500);
}

function startGame() {
  clearCanvas();
  initWorld();
  drawWorld();
  gameLoop();
}

startGame();
