import { selectedElement } from "./state.js";

// WIDTH
const widthBox = document.querySelector("#width");
const wPlus = widthBox.querySelector("button:first-child");
const wMinus = widthBox.querySelector("button:last-child");

// HEIGHT
const heightBox = document.querySelector("#hight");
const hPlus = heightBox.querySelector("button:first-child");
const hMinus = heightBox.querySelector("button:last-child");

// Width +
wPlus.addEventListener("click", () => {
  if (!selectedElement) return;
  selectedElement.style.width =
    selectedElement.offsetWidth + 5 + "px";
});

// Width -
wMinus.addEventListener("click", () => {
  if (!selectedElement) return;
  if (selectedElement.offsetWidth > 20) {
    selectedElement.style.width =
      selectedElement.offsetWidth - 5 + "px";
  }
});

// Height +
hPlus.addEventListener("click", () => {
  if (!selectedElement) return;
  selectedElement.style.height =
    selectedElement.offsetHeight + 5 + "px";
});

// Height -
hMinus.addEventListener("click", () => {
  if (!selectedElement) return;
  if (selectedElement.offsetHeight > 20) {
    selectedElement.style.height =
      selectedElement.offsetHeight - 5 + "px";
  }
});
