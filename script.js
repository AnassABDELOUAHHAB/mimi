// 🎯 CLICK GAME
let score = 0;

const btn = document.getElementById("btn");
if (btn) {
  btn.onclick = () => {
    score++;
    document.getElementById("score").innerText = "Score : " + score;
  };
}

// 🧩 PUZZLE
const puzzle = document.getElementById("puzzle");

if (puzzle) {
  let pieces = [];

  for (let i = 0; i < 9; i++) {
    let div = document.createElement("div");
    div.className = "tile";
    div.draggable = true;
    div.dataset.index = i;
    div.style.backgroundPosition =
      `${-(i % 3) * 100}px ${-Math.floor(i / 3) * 100}px`;

    pieces.push(div);
  }

  pieces.sort(() => Math.random() - 0.5);
  pieces.forEach(p => puzzle.appendChild(p));

  let dragged;

  pieces.forEach(tile => {
    tile.ondragstart = () => dragged = tile;

    tile.ondragover = e => e.preventDefault();

    tile.ondrop = function () {
      if (dragged !== this) {
        let temp = document.createElement("div");
        puzzle.replaceChild(temp, this);
        puzzle.replaceChild(this, dragged);
        puzzle.replaceChild(dragged, temp);
      }
    };
  });
}