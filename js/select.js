import { setSelected, clearSelection } from "./state.js";
import { center } from "./canvas.js";

function makeSelectable(element) {
  element.addEventListener("click", (e) => {
    e.stopPropagation();   // 🔥 MOST IMPORTANT LINE
    setSelected(element);
  });
}

// canvas pe click → deselect
center.addEventListener("click", () => {
  clearSelection();
});

export { makeSelectable };
