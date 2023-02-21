let brain;

function setup() {
  createCanvas(400, 400);

  brain = new NeuralNetwork(2, 2, 1);

  let inputs = [1, 0];
  let output = brain.forward([inputs]);
  console.log(output);
}

function draw() {
  background(51);
}
