class Matrix {
  constructor(rows, cols, fill = 0) {
    this.rows = rows;
    this.cols = cols;
    this.val = [];

    for (let i = 0; i < this.rows; i++) {
      this.val.push([]);
      for (let j = 0; j < this.cols; j++) {
        this.val[i][j] = fill;
      }
    }
  }

  ///////////// IMPORTANT //////////////
  // 1. Functions with _ after their name changes the object itself, whereas other functions returns the result!
  ///////////// IMPORTANT //////////////

  // randomize the values:
  randomize_() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.val[i][j] = Math.floor(Math.random() * 9 + 1);
      }
    }
  }

  // return the transposed matrix:
  transposed() {
    let res = new Matrix(this.cols, this.rows);

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        res.val[j][i] = this.val[i][j];
      }
    }

    return res;
  }

  // return the addition result:
  add(n) {
    let res = new Matrix(this.rows, this.cols);

    // if n is another matrix:
    if (n instanceof Matrix) {
      if (n.rows !== this.rows || n.cols !== this.cols) {
        console.log("invalid matrix to add with!");
        return this;
      }

      // matrix addition:
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          res[i][j] = this.val[i][j] + n.val[i][j];
        }
      }
      return res;
    }

    // if n is a number:
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        res[i][j] = this.val[i][j] + n;
      }
    }
    return res;
  }

  // return the multiplication result:
  mult(n) {
    // if n is another matrix:
    if (n instanceof Matrix) {
      if (this.cols !== n.rows) {
        console.log("invalid matrix to multiply with!");
        return this;
      }

      let res = new Matrix(this.rows, n.cols);
      // matrix product:
      for (let i = 0; i < res.rows; i++) {
        for (let j = 0; j < res.cols; j++) {
          for (let x = 0; x < this.cols; x++) {
            res.val[i][j] += this.val[i][x] * n.val[x][j];
          }
        }
      }
      return res;
    }

    // if n is a number:
    let res = new Matrix(this.rows, this.cols);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        res[i][j] = this.val[i][j] * n;
      }
    }
    return res;
  }
}
