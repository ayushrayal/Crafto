// image.js — Image upload
import { center } from "./canvas.js";
import { makeSelectable } from "./select.js";
import { makeDraggable } from "./drag.js";
import { updateLayers } from "./layers.js";
import { pushState } from "./undo.js";
import { setSelected } from "./state.js";

const uploadBtn  = document.getElementById("imageUpload");
const imageInput = document.getElementById("imageInput");

uploadBtn.addEventListener("click", () => imageInput.click());

imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];
  if (!file) return;

  const img = document.createElement("img");
  img.classList.add("canvas-el", "image");
  img.src = URL.createObjectURL(file);

  img.style.left = Math.max(20, center.offsetWidth  / 2 - 100) + "px";
  img.style.top  = Math.max(20, center.offsetHeight / 2 - 100) + "px";

  img.onload = () => {
    makeSelectable(img);
    makeDraggable(img);
    center.appendChild(img);
    setSelected(img);
    updateLayers();
    pushState();
  };

  imageInput.value = "";
});
