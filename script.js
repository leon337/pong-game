const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 500;

const paddleWidth = 10;
const paddleHeight = 100;
let playerY = canvas.height / 2 - paddleHeight / 2;
let aiY = canvas.height / 2 - paddleHeight / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;let playerScore = 0;
let aiScore = 0;
let ballSpeedY = 5;
const paddleSpeed = 14;

function drawRect(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

function drawCircle(x, y, r, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2, false);
  ctx.closePath();
  ctx.fill();
}

function resetBall() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballSpeedX = -ballSpeedX;
  ballSpeedY = 5 * (Math.random() > 0.5 ? 1 : -1);
  }

function draw() {
  drawRect(0, 0, canvas.width, canvas.height, "#222");
  drawRect(0, playerY, paddleWidth, paddleHeight, "white");
  drawRect(canvas.width - paddleWidth, aiY, paddleWidth, paddleHeight, "white");
  drawCircle(ballX, ballY, 10, "white");
  ctx.fillStyle = "white";
  ctx.font = "36px Arial";
  ctx.fillText(`${playerScore}`, canvas.width / 4, 50);
  ctx.fillText(`${aiScore}`, canvas.width * 3 / 4, 50);
}

function update() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballY <= 0 || ballY >= canvas.height) {
    ballSpeedY = -ballSpeedY;
  }

  // Player collision
  if (
    ballX <= paddleWidth &&
    ballY >= playerY &&
    ballY <= playerY + paddleHeight
  ) {
    ballSpeedX = -ballSpeedX;
  }

  // AI collision
  if (
    ballX >= canvas.width - paddleWidth &&
    ballY >= aiY &&
    ballY <= aiY + paddleHeight
  ) {
    ballSpeedX = -ballSpeedX;
  }

  if (ballX < 0) {
    aiScore++;
    resetBall();
  } else if (ballX > canvas.width) {
    playerScore++;
    resetBall();
  }
 

  // AI movement
  aiY += (ballY - (aiY + paddleHeight / 2)) * 0.08;
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" || e.key === "w") {
    playerY -= paddleSpeed;
  } else if (e.key === "ArrowDown" || e.key === "s") {
    playerY += paddleSpeed;
  }
});

loop();
