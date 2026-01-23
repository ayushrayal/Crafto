import { center } from "./canvas.js";
import { selectedElement } from "./state.js";

let isDragging = false;
let offsetX = 0;
let offsetY = 0;

// 1️⃣ Shape ko draggable banana
export function enableDrag(el) {
  el.addEventListener("mousedown", (e) => {
    e.stopPropagation();

    isDragging = true;

    offsetX = e.offsetX;
    offsetY = e.offsetY;
  });
}

// 2️⃣ Mouse move → element move
document.addEventListener("mousemove", (e) => {
  if (!isDragging || !selectedElement) return;

  const canvasRect = center.getBoundingClientRect();

  let x = e.clientX - canvasRect.left - offsetX;
  let y = e.clientY - canvasRect.top - offsetY;

  selectedElement.style.left = x + "px";
  selectedElement.style.top = y + "px";
});

// 3️⃣ Mouse up → drag stop
document.addEventListener("mouseup", () => {
  isDragging = false;
});
