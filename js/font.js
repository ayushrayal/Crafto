import { getSelected } from "./state.js";

const fontPlus = document.getElementById("fontPlus");
const fontMinus = document.getElementById("fontMinus");
const fontInput = document.getElementById("fontInput");

// helper
function isText(el) {
  return el.classList.contains("text");
}

// PLUS
fontPlus.addEventListener("click", () => {
  const el = getSelected();
  if (!el || !isText(el)) return;

  const size = parseInt(window.getComputedStyle(el).fontSize);
  const newSize = size + 2;

  el.style.fontSize = newSize + "px";
  fontInput.value = newSize;
});

// MINUS
fontMinus.addEventListener("click", () => {
  const el = getSelected();
  if (!el || !isText(el)) return;

  const size = parseInt(window.getComputedStyle(el).fontSize);
  if (size <= 10) return; 

  const newSize = size - 2;

  el.style.fontSize = newSize + "px";
  fontInput.value = newSize;
});

// DIRECT INPUT
fontInput.addEventListener("input", () => {
  const el = getSelected();
  if (!el || !isText(el)) return;

  const value = parseInt(fontInput.value);
  if (value < 10) return;

  el.style.fontSize = value + "px";
});
