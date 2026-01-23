import { center } from "../canvas.js";
import { makeSelectable } from "../utils.js";
import { enableDrag } from "../drag.js";

export function createRectangle() {
  const rect = document.createElement("div");
  rect.classList.add("rectangle");

  rect.style.position = "absolute";
  rect.style.left = "20px";
  rect.style.top = "20px";

  makeSelectable(rect);
  enableDrag(rect);

  center.appendChild(rect);
}
