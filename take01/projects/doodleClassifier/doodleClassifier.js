let nn;

function setup() {
  noLoop();
  createCanvas(400, 400);
  background(51);

  nn = new NeuralNet(3, 4, 2);
  nn.setLearningRate(0.01);
}

function draw() {
  background(51);
}
