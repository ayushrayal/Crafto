let selected = null;

function setSelected(element) {
  if (selected) {
    selected.style.outline = "none";
  }

  selected = element;

  if (selected) {
    selected.style.outline = "2px solid yellow";
  }
}

function getSelected() {
  return selected;
}

function clearSelection() {
  if (selected) {
    selected.style.outline = "none";
  }
  selected = null;
}

export { setSelected, getSelected, clearSelection };