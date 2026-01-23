import { center } from "../canvas.js";
import { makeSelectable } from "../select.js";
import { makeDraggable } from "../drag.js";

function createSquare() {
  const square = document.createElement("div");
  square.classList.add("square");

  square.style.position = "absolute";
  square.style.left = "40px";
  square.style.top = "40px";

  makeSelectable(square);
  makeDraggable(square);

  center.appendChild(square);
}

export { createSquare };
