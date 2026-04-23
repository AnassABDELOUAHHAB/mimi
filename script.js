const board = document.getElementById("board");

const img = "image.jpg";

// 9 puzzle pieces
let pieces = [];

if (board) {
  board.style.width = "300px";
  board.style.height = "300px";
  board.style.margin = "auto";
  board.style.display = "grid";
  board.style.gridTemplateColumns = "repeat(3, 1fr)";

  for (let i = 0; i < 9; i++) {
    let piece = document.createElement("div");

    piece.style.width = "100px";
    piece.style.height = "100px";
    piece.style.backgroundImage = `url(${img})`;
    piece.style.backgroundSize = "300px 300px";
    piece.style.backgroundPosition =
      `${-(i % 3) * 100}px ${-Math.floor(i / 3) * 100}px`;

    /* 🧩 JIGSAW FEEL (fake irregular shape) */
    piece.style.clipPath =
      "polygon(10% 0%, 90% 0%, 100% 20%, 100% 80%, 90% 100%, 10% 100%, 0% 80%, 0% 20%)";

    piece.draggable = true;

    pieces.push(piece);
    board.appendChild(piece);
  }

  // shuffle
  pieces.sort(() => Math.random() - 0.5);
  pieces.forEach(p => board.appendChild(p));

  let dragged;

  pieces.forEach(p => {
    p.ondragstart = () => dragged = p;

    p.ondragover = e => e.preventDefault();

    p.ondrop = function () {
      if (dragged !== this) {
        let temp = this.style.backgroundPosition;
        this.style.backgroundPosition = dragged.style.backgroundPosition;
        dragged.style.backgroundPosition = temp;
      }
    };

let score = 0;
const btn = document.getElementById("btn");

if (btn) {
  btn.onclick = () => {
    score++;
    document.getElementById("score").innerText = score;

    // floating heart effect
    let heart = document.createElement("div");
    heart.innerHTML = "❤️";
    heart.style.position = "absolute";
    heart.style.left = Math.random() * window.innerWidth + "px";
    heart.style.top = "80%";
    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 1000);
  };
}
  });
}
