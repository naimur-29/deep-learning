function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}

class NeuralNetwork {
  constructor(inputSize, hiddenSize, outputSize) {
    this.inputSize = inputSize;
    this.hiddenSize = hiddenSize;
    this.outputSize = outputSize;

    // weights between input and hidden layers:
    this.inputWeights = new Matrix(this.hiddenSize, this.inputSize);
    this.inputWeights.map(() => Math.random() * 2 - 1);

    // weights between hidden and output layers:
    this.hiddenWeights = new Matrix(this.outputSize, this.hiddenSize);
    this.hiddenWeights.map(() => Math.random() * 2 - 1);

    // biases:
    this.hiddenBias = new Matrix(this.hiddenSize, 1, 1);
    this.hiddenBias.map(() => Math.random() * 2 - 1);
    this.outputBias = new Matrix(this.outputSize, 1, 1);
    this.outputBias.map(() => Math.random() * 2 - 1);
  }

  forward(X) {
    let x = Matrix.fromArray(X);
    x.transpose();

    // GENERATING THE HIDDEN OUTPUTS
    // weighted sum in hidden layers:
    let hidden = Matrix.mult(this.inputWeights, x);
    // add hidden bias:
    hidden.add(this.hiddenBias);
    // activation function:
    hidden.map(sigmoid);

    // GENERATING FINAL OUTPUT
    // weighted sum in output layer/layers:
    let y = Matrix.mult(this.hiddenWeights, hidden);
    // add output bias:
    y.add(this.outputBias);
    // activation function:
    y.map(sigmoid);

    // clean output:
    y.transpose();
    let Y = Matrix.toArray(y)[0];

    return Y;
  }

  train(inputs, answers) {}
}
