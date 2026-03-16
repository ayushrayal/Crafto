// align.js — Alignment tools for selected elements

import { getSelected, getSelectedAll } from "./state.js";
import { center } from "./canvas.js";
import { pushState } from "./undo.js";

const canvasW = () => center.offsetWidth;
const canvasH = () => center.offsetHeight;

function alignLeft() {
  getSelectedAll().forEach(el => el.style.left = "0px");
  pushState();
}

function alignCenterH() {
  getSelectedAll().forEach(el => {
    el.style.left = (canvasW() / 2 - el.offsetWidth / 2) + "px";
  });
  pushState();
}

function alignRight() {
  getSelectedAll().forEach(el => {
    el.style.left = (canvasW() - el.offsetWidth) + "px";
  });
  pushState();
}

function alignTop() {
  getSelectedAll().forEach(el => el.style.top = "0px");
  pushState();
}

function alignMiddleV() {
  getSelectedAll().forEach(el => {
    el.style.top = (canvasH() / 2 - el.offsetHeight / 2) + "px";
  });
  pushState();
}

function alignBottom() {
  getSelectedAll().forEach(el => {
    el.style.top = (canvasH() - el.offsetHeight) + "px";
  });
  pushState();
}

// Wire up alignment buttons in the topbar
document.querySelectorAll(".align-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const align = btn.dataset.align;
    if (!getSelected()) return;
    const map = { left: alignLeft, centerH: alignCenterH, right: alignRight,
                  top: alignTop, middleV: alignMiddleV, bottom: alignBottom };
    if (map[align]) map[align]();
  });
});

export { alignLeft, alignCenterH, alignRight, alignTop, alignMiddleV, alignBottom };
