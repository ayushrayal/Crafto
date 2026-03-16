// text.js — Create editable text elements
import { center } from "./canvas.js";
import { makeSelectable } from "./select.js";
import { makeDraggable } from "./drag.js";
import { updateLayers } from "./layers.js";
import { pushState } from "./undo.js";
import { setSelected } from "./state.js";

function createText(type) {
  const el = document.createElement("div");
  el.classList.add("canvas-el", "text", type);
  el.contentEditable = "true";

  if (type === "heading")    el.innerText = "Heading";
  if (type === "subheading") el.innerText = "Subheading";
  if (type === "paragraph")  el.innerText = "Paragraph text goes here";

  el.style.left = Math.max(20, center.offsetWidth  / 2 - 70) + "px";
  el.style.top  = Math.max(20, center.offsetHeight / 2 - 20) + "px";

  // Prevent drag while editing
  el.addEventListener("dblclick", () => el.focus());

  makeSelectable(el);
  makeDraggable(el);
  center.appendChild(el);
  setSelected(el);
  updateLayers();
  pushState();
}

export { createText };
