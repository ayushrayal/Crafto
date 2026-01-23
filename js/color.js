import { getSelected } from "./state.js";

const colorInput = document.getElementById("colorInput");

colorInput.addEventListener("input", () => {
  const el = getSelected();
  if (!el) return;

  el.style.backgroundColor = colorInput.value;
});
