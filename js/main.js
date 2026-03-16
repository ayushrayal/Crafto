// main.js — Crafto entry point: imports all modules and wires UI

// ── Core modules (order matters: canvas before consuming modules) ──
import "./grid.js";
import "./color.js";
import "./resize.js";
import "./font.js";
import "./image.js";
import "./layers.js";
import "./align.js";
import "./multiselect.js";
import "./keyboard.js";
import "./background.js";
import "./export.js";

// ── Shape + Text creators ─────────────────────
import { createRectangle } from "./shapes/rectangle.js";
import { createSquare }    from "./shapes/square.js";
import { createCircle }    from "./shapes/circle.js";
import { createLine }      from "./shapes/line.js";
import { createTriangle }  from "./shapes/triangle.js";
import { createStar }      from "./shapes/star.js";
import { createText }      from "./text.js";

// ── Undo/Redo ─────────────────────────────────
import { undo, redo, pushState } from "./undo.js";

// ── Shape buttons ─────────────────────────────
document.getElementById("Rectangle").addEventListener("click", createRectangle);
document.getElementById("Square").addEventListener("click", createSquare);
document.getElementById("Circle").addEventListener("click", createCircle);
document.getElementById("Line").addEventListener("click", createLine);
document.getElementById("Triangle").addEventListener("click", createTriangle);
document.getElementById("Star").addEventListener("click", createStar);

// ── Text buttons ──────────────────────────────
document.getElementById("Heading").addEventListener("click",    () => createText("heading"));
document.getElementById("SubHeading").addEventListener("click", () => createText("subheading"));
document.getElementById("Paragraph").addEventListener("click",  () => createText("paragraph"));

// ── Undo / Redo topbar buttons ────────────────
document.getElementById("undoBtn").addEventListener("click", undo);
document.getElementById("redoBtn").addEventListener("click", redo);

// ── Zoom controls ─────────────────────────────
import { center } from "./canvas.js";
let zoomLevel = 1;
const MAX_ZOOM = 3;
const MIN_ZOOM = 0.25;
const zoomLabel = document.getElementById("zoom-label");

function applyZoom() {
  center.style.transform = `scale(${zoomLevel})`;
  zoomLabel.textContent = Math.round(zoomLevel * 100) + "%";
}

document.getElementById("zoomIn").addEventListener("click", () => {
  if (zoomLevel < MAX_ZOOM) { zoomLevel = Math.min(MAX_ZOOM, zoomLevel + 0.1); applyZoom(); }
});
document.getElementById("zoomOut").addEventListener("click", () => {
  if (zoomLevel > MIN_ZOOM) { zoomLevel = Math.max(MIN_ZOOM, zoomLevel - 0.1); applyZoom(); }
});

// Mouse wheel zoom (Ctrl + wheel)
document.getElementById("canvas-wrap").addEventListener("wheel", (e) => {
  if (!e.ctrlKey) return;
  e.preventDefault();
  zoomLevel += e.deltaY > 0 ? -0.05 : 0.05;
  zoomLevel = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, zoomLevel));
  applyZoom();
}, { passive: false });

// ── Initial state snapshot ────────────────────
pushState();
