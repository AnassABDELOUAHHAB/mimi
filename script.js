
// -------------------- PUZZLE --------------------
const board = document.getElementById("board");

if (board) {
  let pieces = [];

  for (let i = 0; i < 9; i++) {
    let p = document.createElement("div");

    p.style.width = "100px";
    p.style.height = "100px";
    p.style.backgroundImage = "url(image.jpg)";
    p.style.backgroundSize = "300px 300px";
    p.style.backgroundPosition =
      `${-(i % 3) * 100}px ${-Math.floor(i / 3) * 100}px`;

    p.draggable = true;
    pieces.push(p);
    board.appendChild(p);
  }

  pieces.sort(() => Math.random() - 0.5);
  pieces.forEach(p => board.appendChild(p));

  let dragged = null;

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
  });
}

// -------------------- CLICK GAME --------------------
let score = 0;
const btn = document.getElementById("btn");

if (btn) {
  btn.onclick = () => {
    score++;
    document.getElementById("score").innerText = "Connection: " + score + "%";

    let heart = document.createElement("div");
    heart.innerHTML = "💖";
    heart.style.position = "absolute";
    heart.style.left = Math.random() * window.innerWidth + "px";
    heart.style.top = "80%";
    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 1000);
  };
}
