let nn;
let d, ind, guess;
let frameCount = 0;
let displays = document.querySelectorAll(".item");

const data = [
  {
    inputs: [0, 0, 0, 0],
    outputs: [1, 0, 0, 0],
  },
  {
    inputs: [1, 1, 0, 0],
    outputs: [0, 1, 0, 0],
  },
  {
    inputs: [1, 0, 1, 0],
    outputs: [0, 0, 1, 0],
  },
  {
    inputs: [1, 0, 0, 1],
    outputs: [0, 0, 0, 1],
  },
];

function setup() {
  createCanvas(400, 400);
  background(51);

  nn = new NeuralNet(4, 6, 4);
  nn.setLearningRate(0.01);
  d = random(data);
  [guess] = nn.forward(data[0].inputs);
  console.log(d.inputs, d.outputs);
}

function draw() {
  background(255);
  frameCount++;

  let resolution = 200;
  let cols = width / resolution;
  let rows = height / resolution;

  for (let i = 0; i < 100; i++) {
    let td = random(data);
    nn.train(td.inputs, td.outputs);
  }

  // if (frameCount % 60 === 0) {
  //   console.log(d.inputs, d.outputs);
  //   console.log(guess);
  // }

  let ind = 0;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      [guess] = nn.forward(d.inputs);
      displays.forEach((element, k) => {
        element.textContent = guess[k];
      });

      stroke(255);
      strokeWeight(5);

      fill(d.inputs[ind] * 255, 255, d.inputs[ind] * 255, 100);
      rect(j * resolution, i * resolution, resolution, resolution);

      fill(0, guess[ind] * 255);
      rect(j * resolution, i * resolution, resolution, resolution);

      ind++;
    }
  }
}
