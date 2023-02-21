let brain;

function setup() {
  brain = new NeuralNet(2, 2, 2);

  let X = [0, 1];
  let Y = [1, 0];

  brain.train(X, Y);
  let output = brain.forward(X);
  console.log(output);
}

function draw() {}
