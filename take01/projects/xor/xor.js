let nn;

let trainingData = [
  {
    inputs: [0, 0],
    outputs: [0],
  },
  {
    inputs: [0, 1],
    outputs: [1],
  },
  {
    inputs: [1, 0],
    outputs: [1],
  },
  {
    inputs: [1, 1],
    outputs: [0],
  },
];

function setup() {
  createCanvas(400, 400);

  nn = new NeuralNet(2, 4, 1);
  nn.setLearningRate(0.1);
}

function draw() {
  background(0);

  for (let i = 0; i < 1000; i++) {
    let data = random(trainingData);
    nn.train(data.inputs, data.outputs);
  }

  let resolution = 10;
  let cols = width / resolution;
  let rows = height / resolution;

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x1 = i / cols;
      let x2 = j / rows;
      let inputs = [x1, x2];
      let yPredicted = nn.forward(inputs);
      yPredicted = yPredicted[0];

      noStroke();
      fill(yPredicted * 255);
      rect(i * resolution, j * resolution, resolution, resolution);
    }
  }
}
