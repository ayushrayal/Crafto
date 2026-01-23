import { center } from "./canvas.js";
import { makeSelectable } from "./select.js";
import { makeDraggable } from "./drag.js";

const uploadBtn = document.getElementById("imageUpload");
const imageInput = document.getElementById("imageInput");

// button → open file picker
uploadBtn.addEventListener("click", () => {
  imageInput.click();
});

// file selected
imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];
  if (!file) return;

  const img = document.createElement("img");
  img.classList.add("image");

  img.src = URL.createObjectURL(file);

  img.style.left = "100px";
  img.style.top = "100px";

  makeSelectable(img);
  makeDraggable(img);

  center.appendChild(img);

  imageInput.value = ""; // reset input
});
