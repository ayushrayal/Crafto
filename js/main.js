import "./select.js";   
import "./drag.js";
import "./resize.js";
import "./color.js";
import "./delete.js";
import { createRectangle } from "./shapes/rectangle.js";
import { createSquare } from "./shapes/square.js";
import { createCircle } from "./shapes/circle.js";
import { createLine } from "./shapes/line.js";

document.getElementById("Square").addEventListener("click", createSquare);
document.getElementById("Circle").addEventListener("click", createCircle);
document.getElementById("Line").addEventListener("click", createLine);

const rectangleBtn = document.getElementById("Rectangle");

rectangleBtn.addEventListener("click", () => {
  createRectangle();
});
