class Apple {
  constructor(res) {
    this.pos = createVector(0, 0);
    this.size = res;
    this.lifeSpan = 100;
  }

  spawn() {
    let x = Math.floor(random(width));
    x -= x % this.size;

    let y = Math.floor(random(height));
    y -= y % this.size;

    this.pos = createVector(x, y);
    this.lifeSpan = 100;
  }

  update(fCount) {
    if (this.lifeSpan <= 0) {
      this.spawn();
    }

    if (fCount % 1 === 0) {
      this.lifeSpan -= 1;
    }
  }

  cast() {
    noStroke();
    fill(0, 255, 100, 100 + this.lifeSpan);
    rect(this.pos.x, this.pos.y, this.size, this.size);
  }
}

class Snake {
  constructor(x, y, res) {
    this.pos = createVector(x, y);
    this.vel = createVector();
    this.trail = [];
    this.length = 1;
    this.size = res;
    this.level = 10;
    this.currentMove = [0, 0, 0, 0];

    this.trail.unshift(this.pos.copy());
  }

  detectCollision(apple) {
    let d = this.pos.dist(apple.pos);

    if (d < this.size - 1) {
      this.length++;
      if (this.level > 1) this.level -= 1;

      apple.spawn();
    }
  }

  detectSelfCollision() {
    for (let i = 1; i <= this.length; i++) {
      if (this.pos.x === this.trail[i]?.x && this.pos.y === this.trail[i]?.y) {
        return true;
      }
    }
    return false;
  }

  updatePos(vel, fCount) {
    if (this.detectSelfCollision()) {
      this.level = 10;
      this.length = 1;
      this.trail = [this.trail[0]];
    }

    if (fCount % this.level === 0) {
      if (vel) {
        this.vel = vel;
      }
      this.pos.add(this.vel);

      // if hit walls -> reverse position self
      if (this.pos.x < 0) this.pos.x = width;
      else if (this.pos.x > width) this.pos.x = 0;
      if (this.pos.y < 0) this.pos.y = height;
      else if (this.pos.y > height) this.pos.y = 0;

      this.trail.unshift(this.pos.copy());
    }
  }

  cast() {
    noStroke();
    fill(255, 200);
    for (let i = 0; i < this.length; i++) {
      rect(this.trail[i]?.x, this.trail[i]?.y, this.size, this.size);
    }
  }
}

const res = 20;
const FRAME_RATE = 5;
let frameCount = 0;
let snake, apple, nn;

function predictMove(self, target, res) {
  let d = self.dist(target);

  let temp = self.copy();
  temp.y -= res;
  let td = temp.dist(target);

  temp = self.copy();
  temp.x += res;
  let rd = temp.dist(target);

  temp = self.copy();
  temp.y += res;
  let bd = temp.dist(target);

  // temp = self.copy();
  // temp.x -= res;
  // let ld = temp.dist(target);

  if (td < d) {
    return 0;
  } else if (rd < d) {
    return 1;
  } else if (bd < d) {
    return 2;
  } else {
    return 3;
  }
}

function applyMove(keyCode) {
  let vel = false;

  if (keyCode === 0 && !snake.currentMove[2]) {
    snake.currentMove = [1, 0, 0, 0];
    vel = createVector(0, -20);
  } else if (keyCode === 2 && !snake.currentMove[0]) {
    snake.currentMove = [0, 0, 1, 0];
    vel = createVector(0, 20);
  } else if (keyCode === 3 && !snake.currentMove[1]) {
    snake.currentMove = [0, 0, 0, 1];
    vel = createVector(-20, 0);
  } else if (keyCode === 1 && !snake.currentMove[3]) {
    snake.currentMove = [0, 1, 0, 0];
    vel = createVector(20, 0);
  }

  return vel;
}

function setup() {
  createCanvas(400, 400);
  background(51);

  snake = new Snake(0, 0, res);
  apple = new Apple(res);
  apple.spawn();
}

// function keyPressed() {
//   let vel = false;

//   if (keyCode === ENTER) {
//     snake = new Snake(0, 0, res);
//   } else if (keyCode === UP_ARROW && !snake.currentMove[2]) {
//     snake.currentMove = [1, 0, 0, 0];
//     vel = createVector(0, -20);
//   } else if (keyCode === DOWN_ARROW && !snake.currentMove[0]) {
//     snake.currentMove = [0, 0, 1, 0];
//     vel = createVector(0, 20);
//   } else if (keyCode === LEFT_ARROW && !snake.currentMove[1]) {
//     snake.currentMove = [0, 0, 0, 1];
//     vel = createVector(-20, 0);
//   } else if (keyCode === RIGHT_ARROW && !snake.currentMove[3]) {
//     snake.currentMove = [0, 1, 0, 0];
//     vel = createVector(20, 0);
//   }

//   return vel;
// }

function draw() {
  frameCount++;
  background(51);

  let correctMove = predictMove(snake.pos, apple.pos, res);

  snake.detectCollision(apple);
  snake.updatePos(applyMove(correctMove), frameCount);
  apple.update(frameCount);
  apple.cast();
  snake.cast();

  let rows = width / res;
  let cols = height / res;
  stroke(255, 10);
  noFill();
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      rect(i * res, j * res, res, res);
    }
  }
}
