const board = document.getElementById("board");
const piecesBox = document.getElementById("pieces");
const gift = document.getElementById("gift");

let correct = 0;

// create pieces
let pieces = [];

for (let i = 0; i < 9; i++) {
  let piece = document.createElement("div");

  piece.classList.add("piece");

  piece.style.backgroundPosition =
    `${-(i % 3) * 100}px ${-Math.floor(i / 3) * 100}px`;

  piece.setAttribute("data-id", i);
  piece.draggable = true;

  pieces.push(piece);
}

// shuffle pieces in tray
pieces.sort(() => Math.random() - 0.5);
pieces.forEach(p => piecesBox.appendChild(p));

// drag start
let dragged = null;

pieces.forEach(p => {
  p.addEventListener("dragstart", () => {
    dragged = p;
  });
});

// allow drop on board
board.addEventListener("dragover", e => e.preventDefault());

board.addEventListener("drop", function (e) {
  if (!dragged) return;

  board.appendChild(dragged);

  checkWin();
});

// also allow moving back to tray
piecesBox.addEventListener("dragover", e => e.preventDefault());

piecesBox.addEventListener("drop", function () {
  if (!dragged) return;

  piecesBox.appendChild(dragged);

  checkWin();
});

// WIN CHECK
function checkWin() {
  let current = board.querySelectorAll(".piece");

  if (current.length !== 9) return;

  let correctOrder = true;

  current.forEach((p, index) => {
    if (parseInt(p.dataset.id) !== index) {
      correctOrder = false;
    }
  });

  if (correctOrder) {
    showGift();
  }
}

// 🎁 GIFT EFFECT
function showGift() {
  gift.classList.remove("hidden");

  document.body.style.background = "radial-gradient(circle, gold, black)";

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
