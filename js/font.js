// font.js — Font size, bold, italic, underline, text alignment

import { getSelected } from "./state.js";
import { pushState } from "./undo.js";

const fontPlus  = document.getElementById("fontPlus");
const fontMinus = document.getElementById("fontMinus");
const fontInput = document.getElementById("fontInput");
const boldBtn   = document.getElementById("boldBtn");
const italicBtn = document.getElementById("italicBtn");
const underlineBtn = document.getElementById("underlineBtn");

function isText(el) { return el && el.classList.contains("text"); }

// ── Font Size ──────────────────────────────────
fontPlus.addEventListener("click", () => {
  const el = getSelected();
  if (!isText(el)) return;
  const size = parseInt(window.getComputedStyle(el).fontSize) + 2;
  el.style.fontSize = size + "px";
  fontInput.value = size;
  pushState();
});

fontMinus.addEventListener("click", () => {
  const el = getSelected();
  if (!isText(el)) return;
  const size = Math.max(10, parseInt(window.getComputedStyle(el).fontSize) - 2);
  el.style.fontSize = size + "px";
  fontInput.value = size;
  pushState();
});

fontInput.addEventListener("input", () => {
  const el = getSelected();
  if (!isText(el)) return;
  const value = parseInt(fontInput.value);
  if (value < 8) return;
  el.style.fontSize = value + "px";
});

fontInput.addEventListener("change", () => pushState());

// ── Bold / Italic / Underline ──────────────────
function toggleStyle(btn, el, prop, values) {
  const current = window.getComputedStyle(el)[prop];
  const isActive = current === values[1];
  el.style[prop] = isActive ? values[0] : values[1];
  btn.classList.toggle("active", !isActive);
}

boldBtn.addEventListener("click", () => {
  const el = getSelected();
  if (!isText(el)) return;
  toggleStyle(boldBtn, el, "fontWeight", ["400", "700"]);
  pushState();
});

italicBtn.addEventListener("click", () => {
  const el = getSelected();
  if (!isText(el)) return;
  toggleStyle(italicBtn, el, "fontStyle", ["normal", "italic"]);
  pushState();
});

underlineBtn.addEventListener("click", () => {
  const el = getSelected();
  if (!isText(el)) return;
  const current = el.style.textDecoration;
  const isActive = current === "underline";
  el.style.textDecoration = isActive ? "none" : "underline";
  underlineBtn.classList.toggle("active", !isActive);
  pushState();
});

// ── Text Alignment ────────────────────────────
document.querySelectorAll(".txt-align-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const el = getSelected();
    if (!isText(el)) return;
    el.style.textAlign = btn.dataset.talign;
    document.querySelectorAll(".txt-align-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    pushState();
  });
});
