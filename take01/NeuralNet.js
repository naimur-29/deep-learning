class ActivationFunction {
  constructor(func, dfunc) {
    this.func = func;
    this.dfunc = dfunc;
  }
}

let sigmoid = new ActivationFunction(
  (x) => 1 / (1 + Math.exp(-x)),
  (y) => y * (1 - y)
);

let tanh = new ActivationFunction(
  (x) => Math.tanh(x),
  (y) => 1 - y * y
);

class NeuralNet {
  constructor(inputSize, hiddenSize, outputSize) {
    this.inputSize = inputSize;
    this.hiddenSize = hiddenSize;
    this.outputSize = outputSize;
    this.learningRate = 0.01;
    this.activationFunction = sigmoid;

    // weights between input and hidden layers:
    this.hiddenWeights = new Matrix(this.hiddenSize, this.inputSize);
    this.hiddenWeights.map(() => Math.random() * 2 - 1);

    // weights between hidden and output layers:
    this.outputWeights = new Matrix(this.outputSize, this.hiddenSize);
    this.outputWeights.map(() => Math.random() * 2 - 1);

    // hidden layer biases:
    this.hiddenBias = new Matrix(this.hiddenSize, 1);
    this.hiddenBias.map(() => Math.random() * 2 - 1);

    // output layer biases:
    this.outputBias = new Matrix(this.outputSize, 1);
    this.outputBias.map(() => Math.random() * 2 - 1);
  }

  setLearningRate(num) {
    this.learningRate = num;
  }

  setActivationFunction(func, dfunc) {
    this.activationFunction = new ActivationFunction(func, dfunc);
  }

  forward(X) {
    let x = Matrix.fromArray(X);

    // GENERATING THE HIDDEN OUTPUTS
    // weighted sum in hidden layers:
    let hiddenOut = Matrix.mult(this.hiddenWeights, x);
    // add hidden bias:
    hiddenOut.add(this.hiddenBias);
    // activation function:
    hiddenOut.map(this.activationFunction.func);

    // GENERATING FINAL OUTPUT
    // weighted sum in output layer/layers:
    let yPredicted = Matrix.mult(this.outputWeights, hiddenOut);
    // // add output bias:
    yPredicted.add(this.outputBias);
    // // activation function:
    yPredicted.map(this.activationFunction.func);

    let Y = Matrix.toArray(yPredicted);

    return [Y, yPredicted, hiddenOut];
  }

  backward(x, yPredicted, hiddenOut, outputErrors, hiddenErrors) {
    // calculate output gradients:
    let outputGradients = Matrix.map(yPredicted, this.activationFunction.dfunc);
    outputGradients.multNormal(outputErrors);
    outputGradients.mult(this.learningRate);

    // calculate hidden delta weights:
    let trans_hiddenOut = Matrix.transpose(hiddenOut);
    let deltaOutputWeights = Matrix.mult(outputGradients, trans_hiddenOut);

    // update weight & biases:
    this.outputBias.add(outputGradients);
    this.outputWeights.add(deltaOutputWeights);

    // calculate hidden gradients:
    let hiddenGradients = Matrix.map(hiddenOut, this.activationFunction.dfunc);
    hiddenGradients.multNormal(hiddenErrors);
    hiddenGradients.mult(this.learningRate);

    // // calculate input delta weights:
    let trans_x = Matrix.transpose(x);
    let deltaHiddenWeights = Matrix.mult(hiddenGradients, trans_x);

    // // update weight & biases:
    this.hiddenBias.add(hiddenGradients);
    this.hiddenWeights.add(deltaHiddenWeights);
  }

  train(X, Y) {
    let y = Matrix.fromArray(Y);
    let x = Matrix.fromArray(X);

    // feed forward:
    let [_, yPredicted, hiddenOut] = this.forward(X);

    // CALCULATE THE ERRORS
    // output error = labels - y_predicted:
    let outputErrors = Matrix.sub(y, yPredicted);

    // hidden error = hidden weights(transposed) * output errors:
    let trans_outputWeights = Matrix.transpose(this.outputWeights);
    let hiddenErrors = Matrix.mult(trans_outputWeights, outputErrors);

    // BACK PROPAGATION
    this.backward(x, yPredicted, hiddenOut, outputErrors, hiddenErrors);
  }
}
