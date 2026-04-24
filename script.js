const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const img = new Image();
img.src = "image.jpg";

const rows = 3;
const cols = 3;
const size = 100;

canvas.width = 600;
canvas.height = 400;

let pieces = [];
let selected = null;
let offsetX = 0;
let offsetY = 0;

class Piece {
  constructor(cx, cy) {
    this.correctX = cx;
    this.correctY = cy;

    // start on right side
    this.x = Math.random() * 200 + 350;
    this.y = Math.random() * 300;

    this.placed = false;
  }

  draw() {
    ctx.save();

    // rounded / curved style
    ctx.beginPath();
    ctx.moveTo(this.x + 10, this.y);
    ctx.lineTo(this.x + size - 10, this.y);
    ctx.quadraticCurveTo(this.x + size, this.y, this.x + size, this.y + 10);
    ctx.lineTo(this.x + size, this.y + size - 10);
    ctx.quadraticCurveTo(this.x + size, this.y + size, this.x + size - 10, this.y + size);
    ctx.lineTo(this.x + 10, this.y + size);
    ctx.quadraticCurveTo(this.x, this.y + size, this.x, this.y + size - 10);
    ctx.lineTo(this.x, this.y + 10);
    ctx.quadraticCurveTo(this.x, this.y, this.x + 10, this.y);
    ctx.closePath();

    ctx.clip();

    ctx.drawImage(
      img,
      this.correctX,
      this.correctY,
      size,
      size,
      this.x,
      this.y,
      size,
      size
    );

    ctx.restore();
  }

  isClicked(mx, my) {
    return mx > this.x && mx < this.x + size &&
           my > this.y && my < this.y + size;
  }

  snap() {
    if (
      Math.abs(this.x - this.correctX) < 20 &&
      Math.abs(this.y - this.correctY) < 20
    ) {
      this.x = this.correctX;
      this.y = this.correctY;
      this.placed = true;
    }
  }
}

// create pieces
img.onload = () => {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      pieces.push(new Piece(x * size, y * size));
    }
  }
  draw();
};

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  pieces.forEach(p => p.draw());

  requestAnimationFrame(draw);
}

// mouse down
canvas.addEventListener("mousedown", e => {
  const rect = canvas.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;

  for (let p of pieces) {
    if (p.isClicked(mx, my)) {
      selected = p;
      offsetX = mx - p.x;
      offsetY = my - p.y;
      break;
    }
  }
});

// move
canvas.addEventListener("mousemove", e => {
  if (!selected) return;

  const rect = canvas.getBoundingClientRect();
  selected.x = e.clientX - rect.left - offsetX;
  selected.y = e.clientY - rect.top - offsetY;
});

// release
canvas.addEventListener("mouseup", () => {
  if (!selected) return;

  selected.snap();
  selected = null;

  checkWin();
});

// win check
function checkWin() {
  if (pieces.every(p => p.placed)) {
    showGift();
  }
}

// 🎁 gift animation
function showGift() {
  document.getElementById("gift").classList.remove("hidden");

  let confetti = setInterval(() => {
    let c = document.createElement("div");
    c.innerHTML = "🎉";
    c.style.position = "absolute";
    c.style.left = Math.random() * window.innerWidth + "px";
    c.style.top = "0px";
    document.body.appendChild(c);

    setTimeout(() => c.remove(), 2000);
  }, 150);

  setTimeout(() => clearInterval(confetti), 3000);
}
