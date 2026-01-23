import { center } from "../canvas.js";
import { makeSelectable } from "../select.js";
import { makeDraggable } from "../drag.js";

function createCircle() {
  const circle = document.createElement("div");
  circle.classList.add("circle");

  circle.style.position = "absolute";
  circle.style.left = "60px";
  circle.style.top = "60px";

  makeSelectable(circle);
  makeDraggable(circle);

  center.appendChild(circle);
}

export { createCircle };
