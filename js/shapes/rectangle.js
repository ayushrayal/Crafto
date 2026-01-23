import { center } from "../canvas.js";
import { makeSelectable } from "../select.js";
import { makeDraggable } from "../drag.js";

function createRectangle() {
  const rect = document.createElement("div");
  rect.classList.add("rectangle");

  rect.style.position = "absolute";
  rect.style.left = "0px";
  rect.style.top = "0px";

  makeSelectable(rect);   // select
  makeDraggable(rect);   // drag  

  center.appendChild(rect);
}

export { createRectangle };
