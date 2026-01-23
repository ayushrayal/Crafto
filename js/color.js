import { getSelected } from "./state.js";

const colorInput = document.getElementById("colorInput");

colorInput.addEventListener("input", () => {
  const el = getSelected();
  if (!el) return;

  // text ke liye
  if (el.classList.contains("text")) {
    el.style.color = colorInput.value;
  } else {
    el.style.backgroundColor = colorInput.value;
  }
});
