// resize.js — Property panel width/height/position inputs sync with canvas elements

import { getSelected } from "./state.js";
import { pushState } from "./undo.js";
import { syncPropertyPanel } from "./state.js";

const widthInput  = document.getElementById("widthInput");
const heightInput = document.getElementById("heightInput");
const posX        = document.getElementById("posX");
const posY        = document.getElementById("posY");

// ── Width ──────────────────────────────────────
widthInput.addEventListener("input", () => {
  const el = getSelected();
  if (!el) return;
  const value = parseInt(widthInput.value);
  if (value < 5) return;
  el.style.width = value + "px";
});
widthInput.addEventListener("change", () => pushState());

// ── Height ────────────────────────────────────
heightInput.addEventListener("input", () => {
  const el = getSelected();
  if (!el) return;
  const value = parseInt(heightInput.value);
  if (value < 5) return;
  // line minimum
  if (el.classList.contains("line") && value < 2) return;
  el.style.height = value + "px";
});
heightInput.addEventListener("change", () => pushState());

// ── Position X ────────────────────────────────
posX.addEventListener("input", () => {
  const el = getSelected();
  if (!el) return;
  el.style.left = parseInt(posX.value) + "px";
});
posX.addEventListener("change", () => pushState());

// ── Position Y ────────────────────────────────
posY.addEventListener("input", () => {
  const el = getSelected();
  if (!el) return;
  el.style.top = parseInt(posY.value) + "px";
});
posY.addEventListener("change", () => pushState());