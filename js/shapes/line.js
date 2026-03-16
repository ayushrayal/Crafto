// line.js
import { center } from "../canvas.js";
import { makeSelectable } from "../select.js";
import { makeDraggable } from "../drag.js";
import { updateLayers } from "../layers.js";
import { pushState } from "../undo.js";

function createLine() {
  const el = document.createElement("div");
  el.classList.add("canvas-el", "line");
  el.style.position = "absolute";
  el.style.left = Math.max(20, center.offsetWidth  / 2 - 60) + "px";
  el.style.top  = Math.max(20, center.offsetHeight / 2 - 2)  + "px";

  makeSelectable(el);
  makeDraggable(el);
  center.appendChild(el);
  updateLayers();
  pushState();
}

export { createLine };
