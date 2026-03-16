// keyboard.js — Keyboard shortcuts

import { getSelected, clearSelection } from "./state.js";
import { center } from "./canvas.js";
import { undo, redo, showToast } from "./undo.js";
import { pushState } from "./undo.js";
import { updateLayers } from "./layers.js";

document.addEventListener("keydown", (e) => {
  const tag = document.activeElement.tagName;
  const isEditing = tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT"
                 || document.activeElement.isContentEditable;

  // Ctrl+Z — Undo
  if ((e.ctrlKey || e.metaKey) && e.key === "z" && !e.shiftKey) {
    e.preventDefault();
    undo();
    return;
  }

  // Ctrl+Y or Ctrl+Shift+Z — Redo
  if ((e.ctrlKey || e.metaKey) && (e.key === "y" || (e.key === "z" && e.shiftKey))) {
    e.preventDefault();
    redo();
    return;
  }

  // Ctrl+D — Duplicate
  if ((e.ctrlKey || e.metaKey) && e.key === "d") {
    e.preventDefault();
    duplicateSelected();
    return;
  }

  if (isEditing) return;

  // Delete / Backspace — Delete selected
  if (e.key === "Delete" || e.key === "Backspace") {
    e.preventDefault();
    deleteSelected();
    return;
  }

  // Escape — Deselect
  if (e.key === "Escape") {
    clearSelection();
    return;
  }

  // Arrow keys — Nudge selected element
  const el = getSelected();
  if (!el) return;

  const step = e.shiftKey ? 10 : 1;
  let left = parseInt(el.style.left) || 0;
  let top  = parseInt(el.style.top)  || 0;

  if (e.key === "ArrowLeft")  { e.preventDefault(); el.style.left = (left - step) + "px"; }
  if (e.key === "ArrowRight") { e.preventDefault(); el.style.left = (left + step) + "px"; }
  if (e.key === "ArrowUp")    { e.preventDefault(); el.style.top  = (top  - step) + "px"; }
  if (e.key === "ArrowDown")  { e.preventDefault(); el.style.top  = (top  + step) + "px"; }
});

function deleteSelected() {
  const el = getSelected();
  if (!el) return;
  clearSelection();
  center.removeChild(el);
  updateLayers();
  pushState();
}

function duplicateSelected() {
  const el = getSelected();
  if (!el) return;

  const clone = el.cloneNode(true);
  clone.style.left = (parseInt(el.style.left) || 0) + 20 + "px";
  clone.style.top  = (parseInt(el.style.top)  || 0) + 20 + "px";
  clone.querySelectorAll(".resize-handle").forEach(h => h.remove());
  clone.classList.remove("selected", "multi-selected");

  import("./select.js").then(({ makeSelectable }) => {
    import("./drag.js").then(({ makeDraggable }) => {
      makeSelectable(clone);
      makeDraggable(clone);
      center.appendChild(clone);
      updateLayers();
      pushState();
      showToast("Element duplicated");
    });
  });
}

export { deleteSelected, duplicateSelected };
