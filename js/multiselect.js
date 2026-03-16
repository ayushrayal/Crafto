// multiselect.js — Shift+click multi-select & marquee rubber-band

import { center } from "./canvas.js";
import { setSelected, addToSelection, clearSelection, getSelectedAll } from "./state.js";
import { updateLayers } from "./layers.js";

// Marquee rubber-band selection
let isMarquee = false;
let marqueeEl = null;
let startX = 0, startY = 0;

center.addEventListener("mousedown", (e) => {
  // Only fire on canvas background, not on an element
  if (e.target !== center) return;
  // Only left-click without Shift
  if (e.shiftKey) return;

  clearSelection();

  isMarquee = true;
  const rect = center.getBoundingClientRect();
  startX = e.clientX - rect.left;
  startY = e.clientY - rect.top;

  marqueeEl = document.createElement("div");
  marqueeEl.id = "marquee";
  marqueeEl.style.left   = startX + "px";
  marqueeEl.style.top    = startY + "px";
  marqueeEl.style.width  = "0px";
  marqueeEl.style.height = "0px";
  center.appendChild(marqueeEl);
});

document.addEventListener("mousemove", (e) => {
  if (!isMarquee || !marqueeEl) return;
  const rect = center.getBoundingClientRect();
  const currentX = e.clientX - rect.left;
  const currentY = e.clientY - rect.top;

  const x = Math.min(startX, currentX);
  const y = Math.min(startY, currentY);
  const w = Math.abs(currentX - startX);
  const h = Math.abs(currentY - startY);

  marqueeEl.style.left   = x + "px";
  marqueeEl.style.top    = y + "px";
  marqueeEl.style.width  = w + "px";
  marqueeEl.style.height = h + "px";
});

document.addEventListener("mouseup", (e) => {
  if (!isMarquee || !marqueeEl) return;
  isMarquee = false;

  const mRect = marqueeEl.getBoundingClientRect();
  marqueeEl.remove();
  marqueeEl = null;

  // Find elements inside the marquee
  const hit = [];
  [...center.children].forEach(el => {
    if (el.id === "marquee" || el.classList.contains("resize-handle")) return;
    const er = el.getBoundingClientRect();
    if (er.left < mRect.right && er.right > mRect.left &&
        er.top  < mRect.bottom && er.bottom > mRect.top) {
      hit.push(el);
    }
  });

  if (hit.length === 1) {
    setSelected(hit[0]);
  } else if (hit.length > 1) {
    clearSelection();
    hit.forEach(el => addToSelection(el));
  }

  updateLayers();
});

export {};
