// square.js
import { center } from "../canvas.js";
import { makeSelectable } from "../select.js";
import { makeDraggable } from "../drag.js";
import { updateLayers } from "../layers.js";
import { pushState } from "../undo.js";

function createSquare() {
  const el = document.createElement("div");
  el.classList.add("canvas-el", "square");
  el.style.position = "absolute";
  el.style.left = Math.max(20, center.offsetWidth  / 2 - 45) + "px";
  el.style.top  = Math.max(20, center.offsetHeight / 2 - 45) + "px";

  makeSelectable(el);
  makeDraggable(el);
  center.appendChild(el);
  updateLayers();
  pushState();
}

export { createSquare };
