// main.js
import { createRectangle } from "./shapes/rectangle.js";
import { clearSelection } from "./state.js";
import "./resize.js";
import "./color.js";
import "./drag.js";


document.querySelector("#Rectangle")
  .addEventListener("click", createRectangle);

document.querySelector("#Center")
  .addEventListener("mousedown", clearSelection);
