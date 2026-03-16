// drag.js — Drag elements on canvas with snap-to-grid support

import { getSelected } from "./state.js";
import { center } from "./canvas.js";
import { snapToGrid } from "./grid.js";
import { syncPropertyPanel } from "./state.js";

function makeDraggable(element) {
  element.addEventListener("mousedown", (e) => {
    // Don't drag when clicking resize handles
    if (e.target.classList.contains("resize-handle")) return;
    // Don't hijack text editing
    if (e.target.isContentEditable && e.detail > 1) return;

    const el = getSelected();
    if (!el || el !== element) return;

    e.stopPropagation();

    const elementRect = el.getBoundingClientRect();
    const canvasRect  = center.getBoundingClientRect();

    const offsetX = e.clientX - elementRect.left;
    const offsetY = e.clientY - elementRect.top;

    let dragging = false;

    function onMouseMove(ev) {
      dragging = true;
      let x = ev.clientX - canvasRect.left - offsetX;
      let y = ev.clientY - canvasRect.top  - offsetY;

      x = snapToGrid(x);
      y = snapToGrid(y);

      // Clamp inside canvas
      x = Math.max(0, Math.min(x, center.offsetWidth  - el.offsetWidth));
      y = Math.max(0, Math.min(y, center.offsetHeight - el.offsetHeight));

      el.style.left = x + "px";
      el.style.top  = y + "px";

      syncPropertyPanel(el);
    }

    function onMouseUp() {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup",   onMouseUp);
      if (dragging) {
        import("./undo.js").then(m => m.pushState());
      }
    }

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup",   onMouseUp);
  });
}

export { makeDraggable };
