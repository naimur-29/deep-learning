let r, g, b;
let nn, which;
let count = 0;

function pickColor() {
  r = random(255);
  g = random(255);
  b = random(255);
}

function colorPredictor() {
  let inputs = [r / 255, g / 255, b / 255];
  let [outputs] = nn.forward(inputs);
  let y = [];

  if (r + g + b > 300) {
    y = [1, 0];
  } else {
    y = [0, 1];
  }

  if (outputs[0] > outputs[1]) {
    console.log((outputs[0] * 100).toFixed(2) + "%");
    return "black";
  } else {
    console.log((outputs[1] * 100).toFixed(2) + "%");
    return "white";
  }
}

function trainer() {
  let inputs = [r / 255, g / 255, b / 255];
  let [outputs] = nn.forward(inputs);
  let y = [];

  if (r + g + b > 300) {
    y = [1, 0];
  } else {
    y = [0, 1];
  }

  if (outputs[0] > outputs[1]) {
    if (y[0] < y[1]) {
      nn.train(inputs, y);
    }
    return "black";
  } else {
    if (y[0] > y[1]) {
      nn.train(inputs, y);
    }
    return "white";
  }
}

function setup() {
  noLoop();
  createCanvas(600, 300);
  background(51);

  nn = new NeuralNet(3, 4, 2);
  nn.setLearningRate(0.01);

  pickColor();
}

function mousePressed() {
  count++;
  if (count <= 20) {
    for (let i = 0; i < 1000; i++) {
      pickColor();
      which = trainer();
      redraw();
    }
    console.log("training...");
  } else {
    pickColor();
    which = colorPredictor();
    redraw();
  }
  console.log(r + g + b);
}

function draw() {
  background(r, g, b);

  textSize(64);
  textAlign(CENTER, CENTER);
  noStroke();
  fill(0);
  text("Black", 150, 100);
  fill(255);
  text("White", width - 150, 100);
  stroke(0);
  strokeWeight(5);
  line(width / 2, 0, width / 2, height);

  noStroke();
  if (which === "black") {
    fill(0);
    ellipse(150, height - 100, 60);
  } else {
    fill(255);
    ellipse(width - 150, height - 100, 60);
  }
}
