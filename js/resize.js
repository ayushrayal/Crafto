import { getSelected } from "./state.js";

// buttons
const widthPlus = document.getElementById("widthplus");
const widthMinus = document.getElementById("widthminus");
const heightPlus = document.getElementById("heightplus");
const heightMinus = document.getElementById("heightminus");
const widthInput = document.querySelector("#widthInput");
const heightInput = document.querySelector("#heightInput");

function hasElement() {
  return getSelected();
}
// WIDTH +
widthPlus.addEventListener("click", () => {
  const el = getSelected();
  if (!el) return;
  widthInput.value = el.offsetWidth + 10;
  el.style.width = el.offsetWidth + 10 + "px";
});

// WIDTH -
widthMinus.addEventListener("click", () => {
  const el = getSelected();
  if (!el) return;
  if (el.offsetWidth <= 5) return;
  widthInput.value = el.offsetWidth - 10;
  el.style.width = el.offsetWidth - 10 + "px";
});

// HEIGHT +
heightPlus.addEventListener("click", () => {
  const el = getSelected();
  if (!el) return;
  heightInput.value = el.offsetHeight + 10;
  el.style.height = el.offsetHeight + 10 + "px";
});

// HEIGHT -
heightMinus.addEventListener("click", () => {
  const el = getSelected();
  if (!el) return;
  if (el.offsetHeight <= 5) return;
heightInput.value = el.offsetHeight - 10;
  el.style.height = el.offsetHeight - 10 + "px";
});

widthInput.addEventListener("input", () => {
  const el = hasElement();
  if (!el) return;

  const value = parseInt(widthInput.value);
  if (value < 20) return;

  el.style.width = value + "px";
});

heightInput.addEventListener("input", () => {
  const el = hasElement();
  if (!el) return;

  const value = parseInt(heightInput.value);

  // line minimum height
  if (el.classList.contains("line") && value < 5) return;

  if (value < 20) return;

  el.style.height = value + "px";
});