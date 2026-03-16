// select.js — Element selection with Shift+click multi-select

import { setSelected, clearSelection, addToSelection, removeFromSelection, getSelectedAll } from "./state.js";
import { center } from "./canvas.js";
import { updateLayers } from "./layers.js";

function makeSelectable(element) {
  element.addEventListener("mousedown", (e) => {
    if (e.target.classList.contains("resize-handle")) return;
    e.stopPropagation();

    if (e.shiftKey) {
      // Toggle from selection
      if (getSelectedAll().has(element)) {
        removeFromSelection(element);
      } else {
        addToSelection(element);
      }
    } else {
      // Single selection — only change if not already uniquely selected
      const all = getSelectedAll();
      if (all.size !== 1 || !all.has(element)) {
        setSelected(element);
      }
    }

    updateLayers();
  });
}

// Canvas click → deselect all (handled by multiselect.js for canvas background)
center.addEventListener("click", (e) => {
  if (e.target === center) {
    clearSelection();
    updateLayers();
  }
});

export { makeSelectable };
