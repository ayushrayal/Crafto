import { getSelected } from "./state.js";

// buttons
const widthPlus = document.getElementById("widthplus");
const widthMinus = document.getElementById("widthminus");
const heightPlus = document.getElementById("heightplus");
const heightMinus = document.getElementById("heightminus");

// WIDTH +
widthPlus.addEventListener("click", () => {
  const el = getSelected();
  if (!el) return;

  el.style.width = el.offsetWidth + 10 + "px";
});

// WIDTH -
widthMinus.addEventListener("click", () => {
  const el = getSelected();
  if (!el) return;

  el.style.width = el.offsetWidth - 10 + "px";
});

// HEIGHT +
heightPlus.addEventListener("click", () => {
  const el = getSelected();
  if (!el) return;

  el.style.height = el.offsetHeight + 10 + "px";
});

// HEIGHT -
heightMinus.addEventListener("click", () => {
  const el = getSelected();
  if (!el) return;

  el.style.height = el.offsetHeight - 10 + "px";
});
