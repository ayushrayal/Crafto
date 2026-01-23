import { center } from "../canvas.js";
import { makeSelectable } from "../select.js";
import { makeDraggable } from "../drag.js";

function createLine() {
  const line = document.createElement("div");
  line.classList.add("line");

  line.style.left = "80px";
  line.style.top = "80px";

  makeSelectable(line);
  makeDraggable(line);

  center.appendChild(line);
}

export { createLine };
