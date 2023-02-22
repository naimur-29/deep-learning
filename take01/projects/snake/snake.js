let brain;
let foodPos;
let playerPos;
let stepSize = 10;
let frameCount = 0;

function guess(output, pos, stepSize) {
  let maxOutput = max(output);

  if (output[0] === maxOutput) {
    // console.log("up");
    pos.y -= stepSize;
  } else if (output[1] === maxOutput) {
    // console.log("right");
    pos.x += stepSize;
  } else if (output[2] === maxOutput) {
    // console.log("bottom");
    pos.y += stepSize;
  } else {
    // console.log("left");
    pos.x -= stepSize;
  }
}

function printGuess(output) {
  let maxOutput = max(output);

  if (output[0] === maxOutput) {
    console.log("up");
  } else if (output[1] === maxOutput) {
    console.log("right");
  } else if (output[2] === maxOutput) {
    console.log("bottom");
  } else {
    console.log("left");
  }
}

function getCorrectMove(targetPos, currentPos, stepSize) {
  let upDist = dist(
    targetPos.x,
    targetPos.y,
    currentPos.x,
    currentPos.y - stepSize
  );
  let rightDist = dist(
    targetPos.x,
    targetPos.y,
    currentPos.x + stepSize,
    currentPos.y
  );
  let bottomDist = dist(
    targetPos.x,
    targetPos.y,
    currentPos.x,
    currentPos.y + stepSize
  );
  let leftDist = dist(
    targetPos.x,
    targetPos.y,
    currentPos.x - stepSize,
    currentPos.y
  );

  let minDist = min([upDist, rightDist, bottomDist, leftDist]);
  if (upDist === minDist) {
    return [1, 0, 0, 0];
  } else if (rightDist === minDist) {
    return [0, 1, 0, 0];
  } else if (bottomDist === minDist) {
    return [0, 0, 1, 0];
  } else {
    return [0, 0, 0, 1];
  }
}

function setup() {
  createCanvas(400, 400);
  background(51);

  brain = new NeuralNet(4, 6, 4);
  brain.setLearningRate(0.1);

  let X = [250.121, 10.23, 100.23, 143.123];
  let Y = [1, 0, 0, 0];

  brain.train(X, Y);
  let [output] = brain.forward(X);
  console.log(output);

  foodPos = createVector(random(10, width - 10), random(10, height - 10));
  playerPos = createVector(width / 2, height / 2);
}

function draw() {
  background(51, 100);
  frameCount++;

  stroke(255);
  strokeWeight(stepSize);
  point(foodPos.x, foodPos.y);

  noStroke();
  fill(0, 255, 0);
  rectMode("center");
  rect(playerPos.x, playerPos.y, stepSize, stepSize);

  // update player pos:
  let x = [foodPos.x, foodPos.y, playerPos.x, playerPos.y];
  let y = getCorrectMove(foodPos, playerPos, stepSize);
  if (frameCount % 1 === 0) {
    let [yPredicted] = brain.forward(x);
    printGuess(yPredicted);

    guess(yPredicted, playerPos, stepSize);
  }

  for (let index = 0; index < 10; index++) {
    brain.train(x, y);
  }

  if (foodPos.dist(playerPos) <= stepSize) {
    foodPos = createVector(
      Math.floor(random(stepSize, width - stepSize) / stepSize) * stepSize,
      Math.floor(random(stepSize, height - stepSize) / stepSize) * stepSize
    );
  }
}
