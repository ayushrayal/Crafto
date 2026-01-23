import "./select.js";   
import "./drag.js";
import "./resize.js";
import "./color.js";
import "./delete.js";

import { createRectangle } from "./shapes/rectangle.js";

const rectangleBtn = document.getElementById("Rectangle");

rectangleBtn.addEventListener("click", () => {
  createRectangle();
});
