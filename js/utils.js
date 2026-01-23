// utils.js
import { setSelected } from "./state.js";

export function makeSelectable(el) {
  el.addEventListener("mousedown", (e) => {
    e.stopPropagation();
    setSelected(el);
  });
}
