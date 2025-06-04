// @ts-check

import "./style.css";
const squareContainer = document.querySelector(".square-container");
const promptButton = document.querySelector(".prompt-button");

const rgb = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`;
};

const addSquareDivs = (squaresPerRow = 16) => {
  let isExecuted;
  if (!isExecuted) {
    const totalSquares = squaresPerRow * squaresPerRow;
    if (squareContainer) squareContainer.innerHTML = "";
    for (let i = 1; i <= totalSquares; i++) {
      const square = document.createElement("div");
      square.classList.add("square");
      square.style.width = `calc(100% / ${squaresPerRow})`;
      square.textContent = String(i);
      squareContainer?.appendChild(square);
    }

    isExecuted = true;
  }
};

addSquareDivs();

/** @type {NodeListOf<HTMLDivElement>} */
const squares = document.querySelectorAll(".square");

squares.forEach(square => {
  square.addEventListener("mouseenter", () => {
    square.classList.contains("leave-transition") && square.classList.remove("leave-transition");
    square.style.backgroundColor = rgb();
  });
  square.addEventListener("mouseleave", () => {
    square.classList.add("leave-transition");
    square.style.backgroundColor = "var(--square-bg-color)";
  });
});

promptButton?.addEventListener("click", () => {
  const squares = prompt("Number of squares per row:");
  if (squares !== null) {
    let isExecuted = false;
    addSquareDivs(parseInt(squares));
  }
});
