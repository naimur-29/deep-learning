let brain;
let m1;
let m2;

function setup() {
  createCanvas(400, 400);

  brain = new NeuralNetwork(3, 4, 1);
  m1 = new Matrix(20, 30, 1);
  m1.randomize_();
  m2 = m1.transposed();

  console.table(m1.val);
  console.table(m2.val);
}

function draw() {
  background(51);
}
