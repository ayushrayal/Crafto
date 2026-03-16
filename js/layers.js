// layers.js — Layer panel management with visibility toggle

import { center } from "./canvas.js";
import { getSelected, setSelected } from "./state.js";

const layerList = document.getElementById("layerList");
const layerUp   = document.getElementById("layerUp");
const layerDown = document.getElementById("layerDown");

// Layer icons by element type
const ICONS = {
  rectangle:     `<svg class="layer-icon" viewBox="0 0 16 16" fill="currentColor"><rect x="1" y="4" width="14" height="8" rx="1"/></svg>`,
  square:        `<svg class="layer-icon" viewBox="0 0 16 16" fill="currentColor"><rect x="3" y="3" width="10" height="10" rx="1"/></svg>`,
  circle:        `<svg class="layer-icon" viewBox="0 0 16 16" fill="currentColor"><circle cx="8" cy="8" r="6"/></svg>`,
  line:          `<svg class="layer-icon" viewBox="0 0 16 16" fill="currentColor"><rect x="1" y="7" width="14" height="2"/></svg>`,
  "triangle-shape": `<svg class="layer-icon" viewBox="0 0 16 16" fill="currentColor"><polygon points="8,2 15,14 1,14"/></svg>`,
  "star-shape":  `<svg class="layer-icon" viewBox="0 0 16 16" fill="currentColor"><polygon points="8,2 9.8,6.6 15,7.4 11.2,11 12.2,16 8,13.4 3.8,16 4.8,11 1,7.4 6.2,6.6"/></svg>`,
  text:          `<svg class="layer-icon" viewBox="0 0 16 16" fill="currentColor"><text x="2" y="13" font-size="13" font-weight="bold">T</text></svg>`,
  image:         `<svg class="layer-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="1" y="2" width="14" height="12" rx="1"/><circle cx="5" cy="5.5" r="1.5"/><polyline points="1 11 5 7 8 10 11 8 15 12"/></svg>`,
};

function getIcon(el) {
  for (const cls of el.classList) {
    if (ICONS[cls]) return ICONS[cls];
  }
  return `<svg class="layer-icon" viewBox="0 0 16 16" fill="currentColor"><rect x="2" y="2" width="12" height="12" rx="2"/></svg>`;
}

function getLabel(el, index) {
  const type = el.classList[0] || "element";
  return type.charAt(0).toUpperCase() + type.slice(1) + " " + (index + 1);
}

function updateLayers() {
  layerList.innerHTML = "";
  const elements = [...center.children].filter(el => !el.classList.contains("resize-handle") && el.id !== "marquee");

  elements.forEach((el, index) => {
    const li = document.createElement("li");
    li.dataset.index = index;

    const isSelected = el === getSelected();
    if (isSelected) li.classList.add("active");

    const hidden = el.dataset.hidden === "true";

    li.innerHTML = `
      ${getIcon(el)}
      <span class="layer-name">${getLabel(el, index)}</span>
      <span class="layer-vis" title="${hidden ? "Show" : "Hide"}">${hidden ? "◎" : "●"}</span>
    `;

    // Click → select element
    li.addEventListener("click", (e) => {
      if (e.target.classList.contains("layer-vis")) return;
      setSelected(el);
      updateLayers();
    });

    // Visibility toggle
    li.querySelector(".layer-vis").addEventListener("click", (e) => {
      e.stopPropagation();
      if (el.dataset.hidden === "true") {
        el.style.visibility = "";
        el.dataset.hidden = "false";
      } else {
        el.style.visibility = "hidden";
        el.dataset.hidden = "true";
      }
      updateLayers();
    });

    layerList.prepend(li); // Top layer first
  });
}

// Bring forward
layerUp.addEventListener("click", () => {
  const el = getSelected();
  if (!el) return;
  el.style.zIndex = (parseInt(el.style.zIndex) || 0) + 1;
  updateLayers();
});

// Send backward
layerDown.addEventListener("click", () => {
  const el = getSelected();
  if (!el) return;
  el.style.zIndex = (parseInt(el.style.zIndex) || 0) - 1;
  updateLayers();
});

export { updateLayers };
