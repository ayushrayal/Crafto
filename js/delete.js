import { getSelected, clearSelection } from "./state.js";
import { center } from "./canvas.js";

const deleteBtn = document.getElementById("Delete");

deleteBtn.addEventListener("click", () => {
  const el = getSelected();
  if (!el) return;

  center.removeChild(el);
  clearSelection();
});
