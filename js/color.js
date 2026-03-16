// color.js — Fill color, stroke color, opacity controls

import { getSelected } from "./state.js";
import { pushState } from "./undo.js";

const colorInput      = document.getElementById("colorInput");
const colorHex        = document.getElementById("colorHex");
const strokeColorInput = document.getElementById("strokeColorInput");
const strokeColorHex  = document.getElementById("strokeColorHex");
const strokeWidth     = document.getElementById("strokeWidthInput");
const opacityInput    = document.getElementById("opacityInput");
const opacityVal      = document.getElementById("opacityVal");

// ── Fill color ──────────────────────────────────
colorInput.addEventListener("input", () => {
  applyFill(colorInput.value);
  colorHex.value = colorInput.value;
});

colorHex.addEventListener("input", () => {
  const val = colorHex.value;
  if (/^#[0-9a-fA-F]{6}$/.test(val)) {
    colorInput.value = val;
    applyFill(val);
  }
});

colorInput.addEventListener("change", () => pushState());

function applyFill(value) {
  const el = getSelected();
  if (!el) return;
  if (el.classList.contains("text")) {
    el.style.color = value;
  } else if (el.classList.contains("triangle-shape")) {
    // Triangle uses border-bottom color
    el.style.borderBottomColor = value;
  } else {
    el.style.backgroundColor = value;
  }
}

// ── Stroke ────────────────────────────────────
function applyStroke() {
  const el = getSelected();
  if (!el || el.classList.contains("text")) return;
  const w = parseInt(strokeWidth.value) || 0;
  if (w === 0) {
    el.style.outline = "none";
    el.style.border  = "none";
  } else {
    el.style.outline = `${w}px solid ${strokeColorInput.value}`;
  }
}

strokeColorInput.addEventListener("input", () => {
  strokeColorHex.value = strokeColorInput.value;
  applyStroke();
});
strokeColorHex.addEventListener("input", () => {
  if (/^#[0-9a-fA-F]{6}$/.test(strokeColorHex.value)) {
    strokeColorInput.value = strokeColorHex.value;
    applyStroke();
  }
});
strokeWidth.addEventListener("input", applyStroke);
strokeColorInput.addEventListener("change", () => pushState());

// ── Opacity ──────────────────────────────────
opacityInput.addEventListener("input", () => {
  const el = getSelected();
  if (!el) return;
  const val = opacityInput.value;
  el.style.opacity = val / 100;
  opacityVal.textContent = val + "%";
});
opacityInput.addEventListener("change", () => pushState());
