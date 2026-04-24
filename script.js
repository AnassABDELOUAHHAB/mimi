const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const img = new Image();
img.src = "image.jpg";

const rows = 3;
const cols = 3;
const size = 120;

canvas.width = 700;
canvas.height = 450;

let pieces = [];
let selected = null;
let offsetX = 0;
let offsetY = 0;

class Piece {
  constructor(cx, cy) {
    this.correctX = cx;
    this.correctY = cy;

    this.x = Math.random() * 250 + 400;
    this.y = Math.random() * 300;

    this.placed = false;
  }

  draw() {
    ctx.save();

    // 🧩 REAL jigsaw-like shape
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);

    ctx.lineTo(this.x + size * 0.3, this.y);
    ctx.bezierCurveTo(
      this.x + size * 0.4, this.y - 20,
      this.x + size * 0.6, this.y - 20,
      this.x + size * 0.7, this.y
    );

    ctx.lineTo(this.x + size, this.y);
    ctx.lineTo(this.x + size, this.y + size);

    ctx.lineTo(this.x, this.y + size);
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

  isInside(mx, my) {
    return mx > this.x && mx < this.x + size &&
           my > this.y && my < this.y + size;
  }

  snap() {
    if (
      Math.abs(this.x - this.correctX) < 25 &&
      Math.abs(this.y - this.correctY) < 25
    ) {
      this.x = this.correctX;
      this.y = this.correctY;
      this.placed = true;
    }
  }
}

// init
img.onload = () => {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      pieces.push(new Piece(x * size, y * size));
    }
  }
  loop();
};

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  pieces.forEach(p => p.draw());

  requestAnimationFrame(loop);
}

// mouse events
canvas.addEventListener("mousedown", e => {
  const rect = canvas.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;

  for (let i = pieces.length - 1; i >= 0; i--) {
    if (pieces[i].isInside(mx, my)) {
      selected = pieces[i];
      offsetX = mx - selected.x;
      offsetY = my - selected.y;

      // bring to front
      pieces.push(pieces.splice(i, 1)[0]);
      break;
    }
  }
});

canvas.addEventListener("mousemove", e => {
  if (!selected) return;

  const rect = canvas.getBoundingClientRect();
  selected.x = e.clientX - rect.left - offsetX;
  selected.y = e.clientY - rect.top - offsetY;
});

canvas.addEventListener("mouseup", () => {
  if (!selected) return;

  selected.snap();
  selected = null;

  checkWin();
});

function checkWin() {
  if (pieces.every(p => p.placed)) {
    showGift();
  }
}

// 🎁 celebration
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
  }, 120);

  setTimeout(() => clearInterval(confetti), 3000);
}
