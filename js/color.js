import { selectedElement } from "./state.js";

const colorInput = document.querySelector("#color input");

colorInput.addEventListener("input", () => {
  if (!selectedElement) return;
  selectedElement.style.backgroundColor = colorInput.value;
});
