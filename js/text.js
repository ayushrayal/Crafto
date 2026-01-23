import { center } from "./canvas.js";
import { makeSelectable } from "./select.js";
import { makeDraggable } from "./drag.js";

function createText(type) {
  const text = document.createElement("div");
  text.classList.add("text", type);

  text.contentEditable = true;

  // default content
  if (type === "heading") text.innerText = "Heading";
  if (type === "subheading") text.innerText = "Subheading";
  if (type === "paragraph") text.innerText = "Paragraph text";

  text.style.left = "100px";
  text.style.top = "100px";

  makeSelectable(text);
  makeDraggable(text);

  center.appendChild(text);
}

export { createText };
