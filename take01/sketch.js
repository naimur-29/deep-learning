let brain;
let m1;
let m2;

function setup() {
  createCanvas(400, 400);

  brain = new NeuralNetwork(3, 4, 1);
  m1 = new Matrix(2, 3);
  m3 = new Matrix(3, 2);
  m1 = Matrix.randomize(m1);
  m3.randomize();
  m3 = Matrix.transpose(m3);
  m2 = Matrix.add(m1, m3);

  console.table(m1.data);
  m1.add(m3);
  console.table(m1.data);
  console.table(m2.data);
}

function draw() {
  background(51);
}
