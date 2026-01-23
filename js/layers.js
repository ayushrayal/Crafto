import { center } from "./canvas.js";
import { getSelected, setSelected } from "./state.js";

const layerList = document.getElementById("layerList");
const layerUp = document.getElementById("layerUp");
const layerDown = document.getElementById("layerDown");

// refresh layers
function updateLayers() {
  layerList.innerHTML = "";

  const elements = [...center.children];

  elements.forEach((el, index) => {
    const li = document.createElement("li");

    li.textContent =
      el.classList[0] || "Element " + (index + 1);

    if (el === getSelected()) {
      li.classList.add("active");
    }

    li.addEventListener("click", () => {
      setSelected(el);
      updateLayers();
    });

    layerList.prepend(li); // top layer first
  });
}

// bring forward
layerUp.addEventListener("click", () => {
  const el = getSelected();
  if (!el) return;

  el.style.zIndex = (parseInt(el.style.zIndex) || 0) + 1;
  updateLayers();
});

// send backward
layerDown.addEventListener("click", () => {
  const el = getSelected();
  if (!el) return;

  el.style.zIndex = (parseInt(el.style.zIndex) || 0) - 1;
  updateLayers();
});

// expose function
export { updateLayers };

