// undo.js — Undo / Redo system using DOM serialization

import { center } from "./canvas.js";
import { clearSelection } from "./state.js";

const MAX_HISTORY = 50;
let history = [];
let cursor  = -1;

// Capture current state
function pushState() {
  // Trim redo branch
  history = history.slice(0, cursor + 1);

  // Snapshot: strip resize handles before saving
  const clone = center.cloneNode(true);
  clone.querySelectorAll(".resize-handle").forEach(h => h.remove());
  // also strip selection classes
  clone.querySelectorAll(".selected, .multi-selected").forEach(el => {
    el.classList.remove("selected", "multi-selected");
  });

  history.push(clone.innerHTML);

  if (history.length > MAX_HISTORY) history.shift();
  cursor = history.length - 1;
}

function undo() {
  if (cursor <= 0) { showToast("Nothing to undo"); return; }
  cursor--;
  restore();
  showToast("Undo");
}

function redo() {
  if (cursor >= history.length - 1) { showToast("Nothing to redo"); return; }
  cursor++;
  restore();
  showToast("Redo");
}

function restore() {
  clearSelection();
  center.innerHTML = history[cursor];

  // Re-attach drag + selectable to restored elements
  import("./drag.js").then(({ makeDraggable }) => {
    import("./select.js").then(({ makeSelectable }) => {
      [...center.children].forEach(el => {
        makeSelectable(el);
        makeDraggable(el);
      });
      import("./layers.js").then(m => m.updateLayers());
    });
  });
}

function showToast(msg) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.remove("hidden");
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => toast.classList.add("hidden"), 1800);
}

export { pushState, undo, redo, showToast };
