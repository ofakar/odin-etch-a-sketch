// @ts-check

import "./style.css";
const squaresContainer = document.querySelector(".squares-container");
const squaresCountText = document.querySelector(".squares-count-text");
const squaresCountSlider = document.querySelector(".squares-count-slider");
const promptButton = document.querySelector(".prompt-button");
const resetButton = document.querySelector(".reset-button");
const toggleThemeButton = document.querySelector(".toggle-theme-button");
const root = document.documentElement;

let currentSquaresPerRow = 16;
let isDrawing = false;

const rgb = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`;
};

const handleEventListeners = () => {
  /** @type {NodeListOf<HTMLDivElement>} */
  const squares = document.querySelectorAll(".square");
  /** @type {HTMLDivElement | null} */
  const buttonsContainer = document.querySelector(".buttons-container");

  const draw = event => {
    if (event.target && event.target instanceof HTMLElement) {
      const square = event.target;
      let currentOpacity = parseFloat(square.style.opacity);
      if (isNaN(currentOpacity)) currentOpacity = 1.0;

      if (currentOpacity >= 0.99) square.style.backgroundColor = rgb();
      square.style.opacity = Math.max(0, currentOpacity - 0.1);
    }
  };

  squares.forEach(square => {
    // square.addEventListener("mouseenter", draw);
    square.addEventListener("mousedown", e => {
      isDrawing = true;
      draw(e);
    });
    square.addEventListener("mouseup", () => (isDrawing = false));
    // square.addEventListener("mouseleave", () => (isDrawing = false));
    square.addEventListener("mousemove", e => isDrawing && draw(e));
    buttonsContainer?.addEventListener("mouseleave", () => (isDrawing = false));
  });

  resetButton?.addEventListener("click", () => addSquareDivs(currentSquaresPerRow));

  localStorage.setItem("theme", "dark");
  const getCurrentTheme = () => localStorage.getItem("theme");
  root.classList.add(getCurrentTheme() === "dark" ? "dark" : "light");

  if (toggleThemeButton) {
    toggleThemeButton.textContent = getCurrentTheme() === "dark" ? "☀" : "☽";
  }

  const handleThemeToggle = () => {
    const newTheme = getCurrentTheme() === "dark" ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    root.classList.remove("dark", "light");
    root.classList.add(newTheme);
    if (toggleThemeButton) {
      toggleThemeButton.textContent = newTheme === "dark" ? "☀" : "☽";
    }
  };

  toggleThemeButton?.addEventListener("click", handleThemeToggle);
};

const addSquareDivs = (squaresPerRow = 16) => {
  currentSquaresPerRow = squaresPerRow;
  const totalSquares = squaresPerRow * squaresPerRow;
  if (squaresCountText) squaresCountText.textContent = `${squaresPerRow} x ${squaresPerRow}`;
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

/* squaresCountSlider?.addEventListener("input", event => {
  // @ts-ignore
  const val = event.target.value;
  addSquareDivs(val);
}); */

window.onload = () => {
  addSquareDivs();
};
