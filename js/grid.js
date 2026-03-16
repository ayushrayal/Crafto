// grid.js — Grid overlay + snap-to-grid

import { center } from "./canvas.js";

const GRID_SIZE = 20;
let gridEnabled = false;
let snapEnabled = false;

const gridToggleBtn = document.getElementById("gridToggle");
const snapToggleBtn = document.getElementById("snapToggle");

gridToggleBtn.addEventListener("click", () => {
  gridEnabled = !gridEnabled;
  center.classList.toggle("grid-on", gridEnabled);
  gridToggleBtn.classList.toggle("active", gridEnabled);
});

snapToggleBtn.addEventListener("click", () => {
  snapEnabled = !snapEnabled;
  snapToggleBtn.classList.toggle("active", snapEnabled);
});

// Keyboard shortcut G
document.addEventListener("keydown", (e) => {
  const tag = document.activeElement.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || document.activeElement.isContentEditable) return;
  if (e.key.toLowerCase() === "g" && !e.ctrlKey && !e.metaKey) {
    gridToggleBtn.click();
  }
});

function snapToGrid(value) {
  if (!snapEnabled) return value;
  return Math.round(value / GRID_SIZE) * GRID_SIZE;
}

function isSnapEnabled() { return snapEnabled; }
function isGridEnabled() { return gridEnabled; }
function getGridSize()   { return GRID_SIZE; }

export { snapToGrid, isSnapEnabled, isGridEnabled, getGridSize };
