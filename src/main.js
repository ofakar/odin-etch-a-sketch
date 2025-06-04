// @ts-check

import "./style.css";
const squaresContainer = document.querySelector(".square-container");
const squaresCount = document.querySelector(".squares-count");
const promptButton = document.querySelector(".prompt-button");

const rgb = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`;
};

const handleEventListeners = () => {
  /** @type {NodeListOf<HTMLDivElement>} */
  const squares = document.querySelectorAll(".square");

  squares.forEach(square => {
    square.addEventListener("mouseenter", () => {
      square.classList.contains("leave-transition") && square.classList.remove("leave-transition");
      if (Number(square.style.opacity) === 1) square.style.backgroundColor = rgb();
      square.style.opacity = `calc(${square.style.opacity} - 0.1)`;
    });
  });
};

const addSquareDivs = (squaresPerRow = 16) => {
  const totalSquares = squaresPerRow * squaresPerRow;
  if (squaresCount) squaresCount.textContent = `${squaresPerRow} x ${squaresPerRow}`;
  if (squaresContainer) squaresContainer.innerHTML = "";

  for (let i = 1; i <= totalSquares; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.style.width = `calc(100% / ${squaresPerRow})`;
    square.style.opacity = String(1);
    squaresContainer?.appendChild(square);
  }

  handleEventListeners();
};

addSquareDivs();

promptButton?.addEventListener("click", () => {
  let validInput = false;

  while (!validInput) {
    const rowsInput = prompt("Number of squares per row (1-100):");
    if (rowsInput === null) break;

    const parsed = parseInt(rowsInput);
    if (!isNaN(parsed) && parsed > 0 && parsed <= 100) {
      addSquareDivs(parsed);
      validInput = true;
    } else if (rowsInput.trim() !== "") {
      alert("Invalid input. Try again (between 1 and 100)");
    } else {
      break;
    }
  }
});
