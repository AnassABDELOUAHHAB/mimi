const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const img = new Image();
img.src = "image.jpg";

const rows = 3;
const cols = 3;

let pieces = [];
let selected = null;
let offsetX, offsetY;

canvas.width = 600;
canvas.height = 400;

class Piece {
  constructor(x, y, correctX, correctY) {
    this.x = x;
    this.y = y;
    this.correctX = correctX;
    this.correctY = correctY;
    this.width = 100;
    this.height = 100;
    this.placed = false;
  }

  draw() {
    ctx.save();

    // 🧩 fake curved shape
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.width, this.y);
    ctx.quadraticCurveTo(this.x + this.width + 10, this.y + this.height / 2,
                         this.x + this.width, this.y + this.height);
    ctx.lineTo(this.x, this.y + this.height);
    ctx.quadraticCurveTo(this.x - 10, this.y + this.height / 2,
                         this.x, this.y);
    ctx.clip();

    ctx.drawImage(
      img,
      this.correctX, this.correctY,
      this.width, this.height,
      this.x, this.y,
      this.width, this.height
    );

    ctx.restore();
  }

  isClose() {
    return Math.abs(this.x - this.correctX) < 20 &&
           Math.abs(this.y - this.correctY) < 20;
  }
}

img.onload = () => {
  // create pieces
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {

      let piece = new Piece(
        Math.random() * 400 + 200, // start on right
        Math.random() * 300,
        x * 100,
        y * 100
      );

      pieces.push(piece);
    }
  }

  draw();
};

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  pieces.forEach(p => p.draw());

  requestAnimationFrame(draw);
}

// mouse events
canvas.addEventListener("mousedown", e => {
  const rect = canvas.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;

  pieces.forEach(p => {
    if (
      mx > p.x && mx < p.x + p.width &&
      my > p.y && my < p.y + p.height
    ) {
      selected = p;
      offsetX = mx - p.x;
      offsetY = my - p.y;
    }
  });
});

canvas.addEventListener("mousemove", e => {
  if (!selected) return;

  const rect = canvas.getBoundingClientRect();
  selected.x = e.clientX - rect.left - offsetX;
  selected.y = e.clientY - rect.top - offsetY;
});

canvas.addEventListener("mouseup", () => {
  if (!selected) return;

  // snap into place
  if (selected.isClose()) {
    selected.x = selected.correctX;
    selected.y = selected.correctY;
    selected.placed = true;
  }

  selected = null;

  checkWin();
});

function checkWin() {
  if (pieces.every(p => p.placed)) {
    showGift();
  }
}

// 🎁 gift effect
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
  }, 200);

  setTimeout(() => clearInterval(confetti), 3000);
}
