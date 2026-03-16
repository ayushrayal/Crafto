// background.js — Canvas background editor

import { center } from "./canvas.js";
import { showToast } from "./undo.js";

const bgBtn       = document.getElementById("bgBtn");
const bgPanel     = document.getElementById("bg-panel");
const bgPanelClose = document.getElementById("bgPanelClose");

// Tabs
const tabs = document.querySelectorAll(".fp-tab");
const panes = document.querySelectorAll(".fp-pane");

bgBtn.addEventListener("click", () => {
  bgPanel.classList.toggle("hidden");
});

bgPanelClose.addEventListener("click", () => {
  bgPanel.classList.add("hidden");
});

// Tab switching
tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    panes.forEach(p => p.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById("bg-" + tab.dataset.tab + "-pane").classList.add("active");
  });
});

// ── Solid Color ────────────────────────────────
const bgColorInput = document.getElementById("bgColorInput");
const bgColorHex   = document.getElementById("bgColorHex");

bgColorInput.addEventListener("input", () => {
  center.style.background = bgColorInput.value;
  bgColorHex.value = bgColorInput.value;
});

bgColorHex.addEventListener("input", () => {
  const val = bgColorHex.value;
  if (/^#[0-9a-fA-F]{6}$/.test(val)) {
    center.style.background = val;
    bgColorInput.value = val;
  }
});

// ── Preset swatches ───────────────────────────
document.querySelectorAll(".swatch-preset").forEach(sw => {
  sw.style.background = sw.dataset.color;
  sw.addEventListener("click", () => {
    center.style.background = sw.dataset.color;
    bgColorInput.value = sw.dataset.color;
    bgColorHex.value   = sw.dataset.color;
    showToast("Background updated");
  });
});

// ── Gradient ──────────────────────────────────
const gradColor1    = document.getElementById("gradColor1");
const gradColor2    = document.getElementById("gradColor2");
const gradDirection = document.getElementById("gradDirection");
const applyGradient = document.getElementById("applyGradient");

applyGradient.addEventListener("click", () => {
  const dir = gradDirection.value;
  center.style.background = `linear-gradient(${dir}, ${gradColor1.value}, ${gradColor2.value})`;
  showToast("Gradient applied");
});

// ── None / Transparent ────────────────────────
document.getElementById("applyNone").addEventListener("click", () => {
  center.style.background = "transparent";
  showToast("Background cleared");
});
