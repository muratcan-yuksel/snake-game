const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let speed = 7;
let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
//x position of the head of the snake
let headX = 10;
//y position of the head of the snake
let headY = 10;
//to control the position of the snake via keyboard
let xVelocity = 0;
let yVelocity = 0;
//apple
let appleX = 5;
let appleY = 5;

//game loop
function drawGame() {
  clearScreen();
  changeSnakePosition();
  changeAppleCollision();
  drawApple();
  drawSnake();
  console.log("drawGame");
  setTimeout(drawGame, 1000 / speed);
}

function clearScreen() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
  ctx.fillStyle = "orange";
  ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

function changeSnakePosition() {
  headX = headX + xVelocity;
  headY = headY + yVelocity;
}

function drawApple() {
  ctx.fillStyle = "red";
  ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

function changeAppleCollision() {
  //if the head of the snake nad the apple are in the same position
  if (appleX === headX && appleY === headY) {
    //generate a new apple on a random location
    appleX = Math.floor(Math.random() * tileCount);
    appleY = Math.floor(Math.random() * tileCount);
  }
}

//keyboard controls
document.body.addEventListener("keydown", keyDown);

function keyDown(event) {
  //up
  if (event.keyCode == 38) {
    //to prevent the snake to crash its own body
    //like if you're going up you can't go down directly
    if (yVelocity == 1) return;
    yVelocity = -1;
    xVelocity = 0;
  }
  //down
  if (event.keyCode == 40) {
    if (yVelocity == -1) return;
    yVelocity = 1;
    xVelocity = 0;
  }
  //left
  if (event.keyCode == 37) {
    if (xVelocity == 1) return;
    yVelocity = 0;
    xVelocity = -1;
  }
  //right
  if (event.keyCode == 39) {
    if (xVelocity == -1) return;
    yVelocity = 0;
    xVelocity = 1;
  }
}

drawGame();
