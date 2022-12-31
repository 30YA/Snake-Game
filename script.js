// import sia from "./animation.js";
const boxsize = 25;
const row = 20;
const col = 20;
let gameOver = false;
let snakeX = 5 * boxsize;
let snakeY = 5 * boxsize;
let foodX;
let foodY;
let velocityX = 0;
let velocityY = 0;
let snakeBody = [];

const board = document.querySelector(".board");
const context = board.getContext("2d");
window.addEventListener("load", () => {
  gameHelp();
  board.width = boxsize * row;
  board.height = boxsize * col;

  placeFood();
  document.addEventListener("keyup", changeDirection);
  setInterval(update, 1000/10);
});
function update() {
  if (gameOver) {
    return;
  }

  context.fillStyle = "black";
  context.fillRect(0, 0, board.width, board.height);

  context.fillStyle = "green";
  context.fillRect(foodX, foodY, boxsize, boxsize);

  if (snakeX === foodX && snakeY === foodY) {
    snakeBody.push([foodX, foodY]);
    placeFood();
  }
  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }
  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY];
  }
  context.fillStyle = "red";
  snakeX += velocityX * boxsize;
  snakeY += velocityY * boxsize;
  context.fillRect(snakeX, snakeY, boxsize, boxsize);

  snakeBody.forEach((item) => {
    context.fillRect(item[0], item[1], boxsize, boxsize);
  });

  if (
    snakeX < 0 ||
    snakeX >= col * boxsize ||
    snakeY < 0 ||
    snakeY >= row * boxsize
  ) {
    gameOver = true;
    GameOver();
  }

  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
      gameOver = true;
      GameOver();
    }
  }
}

function changeDirection(e) {
  if (e.key === "ArrowRight" && velocityX !== -1) {
    velocityX = 1;
    velocityY = 0;
  }else if (e.key === "ArrowLeft" && velocityX !== 1) {
    velocityX = -1;
    velocityY = 0;
  }else if (e.key === "ArrowUp" && velocityY !== 1) {
    velocityX = 0;
    velocityY = -1;
  }else if (e.key === "ArrowDown" && velocityY !== -1) {
    velocityX = 0;
    velocityY = 1;
  }
}
function placeFood() {
  foodX = Math.floor(Math.random() * row) * boxsize;
  foodY = Math.floor(Math.random() * col) * boxsize;
}

const GameOverBanner = document.createElement("div");
const resetBtn = document.createElement("div");
resetBtn.addEventListener("click", reset);

function reset() {
  gameOver = false;
  snakeX = 5 * boxsize;
  snakeY = 5 * boxsize;
  velocityX = 0;
  velocityY = 0;
  snakeBody = [];
  document.querySelector(".gameOver").remove();
  document.querySelector(".reset").remove();
}
function GameOver() {
  GameOverBanner.classList.add("gameOver");
  GameOverBanner.innerHTML = "Game Over !";

  resetBtn.classList.add("reset");
  resetBtn.innerHTML = "Reset";

  document.querySelector(".Game").append(GameOverBanner, resetBtn);
}
function gameHelp() {
  const help = document.createElement("div");
  help.classList.add("help");
  help.innerHTML = `
    <img class="arrow-img" src="./assets/image/Arrow-white.png" alt="">
    <p class="img-discription">use Arrow Keys for playing game</p>
    <button class="closeModal">&#10060;</button>
  `;
  document.body.append(help);
  const timeOut = setTimeout(() => {
    document.querySelector('.help').remove();
  },5000)
  document.querySelector('.closeModal').addEventListener('click',() => {
    clearInterval(timeOut);
    document.querySelector('.help').remove();
  })
}
