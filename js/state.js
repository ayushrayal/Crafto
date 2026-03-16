// state.js — Manages element selection (single + multi)

let selected = null;           // primary selected element
const selectedSet = new Set(); // multi-selection set

function setSelected(element) {
  // Clear previous visual
  if (selected && selected !== element) {
    selected.classList.remove("selected");
    removeResizeHandles(selected);
  }

  selected = element;

  if (selected) {
    selected.classList.add("selected");
    attachResizeHandles(selected);
    syncPropertyPanel(selected);
  }

  selectedSet.clear();
  if (element) selectedSet.add(element);
}

function getSelected() {
  return selected;
}

function addToSelection(element) {
  element.classList.add("multi-selected");
  selectedSet.add(element);
  // last added becomes primary
  if (selected) selected.classList.remove("selected");
  selected = element;
  selected.classList.add("selected");
  attachResizeHandles(selected);
}

function removeFromSelection(element) {
  element.classList.remove("multi-selected");
  element.classList.remove("selected");
  selectedSet.delete(element);
  if (selected === element) {
    removeResizeHandles(element);
    const remaining = [...selectedSet];
    selected = remaining.length ? remaining[remaining.length - 1] : null;
    if (selected) {
      selected.classList.add("selected");
      attachResizeHandles(selected);
    }
  }
}

function getSelectedAll() {
  return selectedSet;
}

function clearSelection() {
  selectedSet.forEach(el => {
    el.classList.remove("selected");
    el.classList.remove("multi-selected");
    removeResizeHandles(el);
  });
  selectedSet.clear();
  selected = null;
}

// ── Resize Handles ─────────────────────────────
const HANDLE_POSITIONS = ["nw","n","ne","e","se","s","sw","w"];

function attachResizeHandles(el) {
  removeResizeHandles(el);
  HANDLE_POSITIONS.forEach(pos => {
    const h = document.createElement("div");
    h.className = "resize-handle";
    h.dataset.pos = pos;
    el.appendChild(h);
    initResizeHandle(h, el);
  });
}

function removeResizeHandles(el) {
  if (!el) return;
  el.querySelectorAll(".resize-handle").forEach(h => h.remove());
}

function initResizeHandle(handle, el) {
  handle.addEventListener("mousedown", (e) => {
    e.stopPropagation();
    e.preventDefault();

    const startX = e.clientX;
    const startY = e.clientY;
    const startW = el.offsetWidth;
    const startH = el.offsetHeight;
    const startL = parseInt(el.style.left) || 0;
    const startT = parseInt(el.style.top)  || 0;
    const pos = handle.dataset.pos;

    function onMove(ev) {
      const dx = ev.clientX - startX;
      const dy = ev.clientY - startY;

      let newW = startW, newH = startH, newL = startL, newT = startT;

      if (pos.includes("e"))  newW = Math.max(20, startW + dx);
      if (pos.includes("s"))  newH = Math.max(20, startH + dy);
      if (pos.includes("w")) { newW = Math.max(20, startW - dx); newL = startL + (startW - newW); }
      if (pos.includes("n")) { newH = Math.max(20, startH - dy); newT = startT + (startH - newH); }

      el.style.width  = newW + "px";
      el.style.height = newH + "px";
      el.style.left   = newL + "px";
      el.style.top    = newT + "px";

      syncPropertyPanel(el);
    }

    function onUp() {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
      import("./undo.js").then(m => m.pushState());
    }

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  });
}

// ── Property Panel Sync ────────────────────────
function syncPropertyPanel(el) {
  const posXEl = document.getElementById("posX");
  const posYEl = document.getElementById("posY");
  const wEl = document.getElementById("widthInput");
  const hEl = document.getElementById("heightInput");
  const opEl = document.getElementById("opacityInput");
  const opValEl = document.getElementById("opacityVal");

  if (posXEl) posXEl.value = parseInt(el.style.left) || 0;
  if (posYEl) posYEl.value = parseInt(el.style.top)  || 0;
  if (wEl)    wEl.value    = el.offsetWidth;
  if (hEl)    hEl.value    = el.offsetHeight;

  const opacity = Math.round((parseFloat(el.style.opacity) ?? 1) * 100);
  if (opEl) opEl.value = isNaN(opacity) ? 100 : opacity;
  if (opValEl) opValEl.textContent = (isNaN(opacity) ? 100 : opacity) + "%";

  // Font size
  if (el.classList.contains("text")) {
    const fEl = document.getElementById("fontInput");
    if (fEl) fEl.value = parseInt(window.getComputedStyle(el).fontSize) || 16;
  }
}

export {
  setSelected, getSelected, clearSelection,
  addToSelection, removeFromSelection, getSelectedAll,
  removeResizeHandles, attachResizeHandles, syncPropertyPanel
};