import "./select.js";   
import "./drag.js";
import "./resize.js";
import "./color.js";
import "./delete.js";
import "./font.js";
import "./image.js";

import { createRectangle } from "./shapes/rectangle.js";
import { createSquare } from "./shapes/square.js";
import { createCircle } from "./shapes/circle.js";
import { createLine } from "./shapes/line.js";
import { createText } from "./text.js";

document.getElementById("Heading").addEventListener("click", () => {
  createText("heading");
});

document.getElementById("SubHeading").addEventListener("click", () => {
  createText("subheading");
});

document.getElementById("Paragraph").addEventListener("click", () => {
  createText("paragraph");
});

document.getElementById("Square").addEventListener("click", createSquare);
document.getElementById("Circle").addEventListener("click", createCircle);
document.getElementById("Line").addEventListener("click", createLine);

const rectangleBtn = document.getElementById("Rectangle");

rectangleBtn.addEventListener("click", () => {
  createRectangle();
});
