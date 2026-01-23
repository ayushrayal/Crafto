// state.js
export let selectedElement = null;

export function setSelected(el) {
  if (selectedElement) {
    selectedElement.style.outline = "none";
  }
  selectedElement = el;
  selectedElement.style.outline = "2px solid yellow";
}

export function clearSelection() {
  if (selectedElement) {
    selectedElement.style.outline = "none";
  }
  selectedElement = null;
}
