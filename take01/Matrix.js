class Matrix {
  constructor(rows = 1, cols = 1, fill = 0) {
    this.rows = rows;
    this.cols = cols;
    this.data = [];

    for (let i = 0; i < this.rows; i++) {
      this.data.push(new Array(this.cols));
      this.data[i].fill(fill);
    }
  }

  /////////// REGULAR FUNCTIONS ///////////
  // copy the matrix given:
  print() {
    console.table(this.data);
  }

  copy(m) {
    this.rows = m.rows;
    this.cols = m.cols;
    this.data = m.data;
  }

  // rows = cols & cols = rows:
  transpose() {
    let res = new Matrix(this.cols, this.rows);

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        res.data[j][i] = this.data[i][j];
      }
    }

    this.copy(res);
  }

  // map a function to the data of instance
  map(func) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let val = this.data[i][j];
        this.data[i][j] = func(val, i, j);
      }
    }
  }

  // return the addition result:
  add(n) {
    // if n is another matrix:
    if (n instanceof Matrix) {
      if (n.rows !== this.rows || n.cols !== this.cols) {
        console.log("invalid matrix to add with!");
        return undefined;
      }

      // matrix addition:
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          this.data[i][j] += n.data[i][j];
        }
      }

      return true;
    }

    // if n is a number:
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.data[i][j] += n;
      }
    }
  }

  // return the multiplication result:
  mult(n) {
    // if n is another matrix:
    if (n instanceof Matrix) {
      if (this.cols !== n.rows) {
        console.log("invalid matrix to multiply with!");
        return undefined;
      }

      let res = new Matrix(this.rows, n.cols);
      // matrix product:
      for (let i = 0; i < res.rows; i++) {
        for (let j = 0; j < res.cols; j++) {
          for (let x = 0; x < this.cols; x++) {
            res.data[i][j] += this.data[i][x] * n.data[x][j];
          }
        }
      }

      this.copy(res);
      return true;
    }

    // if n is a number:
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.data[i][j] *= n;
      }
    }
  }

  /////////// STATIC FUNCTIONS ///////////
  // array -> matrix:
  static fromArray(arr) {
    let res = new Matrix(arr.length, arr[0]?.length);
    res.data = [...arr];

    return res;
  }

  // matrix -> array:
  static toArray(matrix) {
    return [...matrix.data];
  }

  // rows = cols & cols = rows:
  static transpose(a) {
    let res = new Matrix(a.cols, a.rows);

    for (let i = 0; i < a.rows; i++) {
      for (let j = 0; j < a.cols; j++) {
        res.data[j][i] = a.data[i][j];
      }
    }

    return res;
  }

  // return the addition result:
  static add(a, b) {
    // if b is another matrix:
    if (b instanceof Matrix) {
      if (b.rows !== a.rows || b.cols !== a.cols) {
        console.log("invalid matrix to add with!");
        return a;
      }

      let res = new Matrix(a.rows, a.cols);
      // matrix addition:
      for (let i = 0; i < a.rows; i++) {
        for (let j = 0; j < a.cols; j++) {
          res.data[i][j] = a.data[i][j] + b.data[i][j];
        }
      }
      return res;
    }

    // if b is a number:
    let res = new Matrix(a.rows, a.cols);

    for (let i = 0; i < a.rows; i++) {
      for (let j = 0; j < a.cols; j++) {
        res.data[i][j] = a.data[i][j] + b;
      }
    }
    return res;
  }

  // return the multiplication result:
  static mult(a, b) {
    // if b is another matrix:
    if (b instanceof Matrix) {
      if (a.cols !== b.rows) {
        console.log("invalid matrix to multiply with!");
        return a;
      }

      let res = new Matrix(a.rows, b.cols);
      // matrix product:
      for (let i = 0; i < res.rows; i++) {
        for (let j = 0; j < res.cols; j++) {
          for (let x = 0; x < a.cols; x++) {
            res.data[i][j] += a.data[i][x] * b.data[x][j];
          }
        }
      }
      return res;
    }

    // if b is a number:
    let res = new Matrix(a.rows, a.cols);
    for (let i = 0; i < a.rows; i++) {
      for (let j = 0; j < a.cols; j++) {
        res.data[i][j] = a.data[i][j] * b;
      }
    }
    return res;
  }
}
