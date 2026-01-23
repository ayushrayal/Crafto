import { getSelected } from "./state.js";
import { center } from "./canvas.js";

function makeDraggable(element) {
  let offsetX = 0;
  let offsetY = 0;

  element.addEventListener("mousedown", (e) => {
    const el = getSelected();
    if (!el) return;

    const elementRect = el.getBoundingClientRect();
    const canvasRect = center.getBoundingClientRect();

    // mouse ka gap element ke andar
    offsetX = e.clientX - elementRect.left;
    offsetY = e.clientY - elementRect.top;

    function onMouseMove(ev) {
      // 🔥 CANVAS OFFSET SUBTRACT
      const x = ev.clientX - canvasRect.left - offsetX;
      const y = ev.clientY - canvasRect.top - offsetY;

      el.style.left = x + "px";
      el.style.top = y + "px";
    }

    function onMouseUp() {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    }

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  });
}

export { makeDraggable };
