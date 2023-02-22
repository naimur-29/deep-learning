let brain;

function setup() {
  brain = new NeuralNet(2, 2, 1, 0.1);

  let data = [
    [[1, 0], [1]],
    [[0, 1], [1]],
    [[1, 1], [0]],
    [[0, 0], [0]],
  ];

  for (let j = 0; j < 30000; j++) {
    let d = random(data);
    brain.train(d[0], d[1]);

    if ((j + 1) % 10000 === 0) {
      console.log("------------------------------");
      console.log(brain.forward([1, 0])[0]);
      console.log(brain.forward([0, 0])[0]);
      console.log(brain.forward([1, 1])[0]);
      console.log(brain.forward([0, 1])[0]);
      console.log("------------------------------");
    }
  }
}

function draw() {}
