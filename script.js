const center = document.getElementById("Center");
const rectangleBtn = document.getElementById("Rectangle");
const deleteBtn = document.getElementById("Delete");
const widthBox = document.querySelector("#width");
const widthPlusBtn = document.querySelector("#widthplus");
const widthMinusBtn = document.querySelector("#widthminus");
const widthInput = document.querySelector("#widthInput");
const heightBox = document.querySelector("#height");
const heightPlusBtn = document.querySelector("#heightplus");
const heightMinusBtn = document.querySelector("#heightminus");
const heightInput = document.querySelector("#heightInput");
const colorInput = document.querySelector('#color input');

let isDragging = false;
let offsetX = 0;
let offsetY = 0;

rectangleBtn.addEventListener("click", () => {
  const rectangle = document.createElement("div");
  rectangle.classList.add("rectangle");
 rectangle.style.position = "absolute";
  rectangle.style.left = "0px";
  rectangle.style.top = "0px";
  center.appendChild(rectangle);
  rectangle.addEventListener("mousedown", (e) => {
    e.stopPropagation();
    selectElement(rectangle);
    isDragging = true;
    offsetX = e.offsetX;
    offsetY = e.offsetY;
  });
});
let selectedElement = null;

function selectElement(el) {
  if (selectedElement) {
    selectedElement.style.outline = "none";
  }

  selectedElement = el;
  el.style.outline = "2px solid #ffd400";
}

center.addEventListener("click", () => {
  if (selectedElement) {
    selectedElement.style.outline = "none";
    selectedElement = null;
  }
});

deleteBtn.addEventListener("click", () => {
  if (!selectedElement) return;

  selectedElement.remove();
  selectedElement = null;
});

// Width Plus Controls
widthPlusBtn.addEventListener("click", () => {
  if (!selectedElement) return;

  const currentWidth = selectedElement.offsetWidth;
  const newWidth = currentWidth + 5;

  selectedElement.style.width = newWidth + "px";
  widthInput.value = newWidth;
});
// Width Minus Controls
widthMinusBtn.addEventListener("click", () => {
  if (!selectedElement) return;

  const currentWidth = selectedElement.offsetWidth;
  const newWidth = currentWidth - 5;

  if (newWidth < 20) return;

  selectedElement.style.width = newWidth + "px";
  widthInput.value = newWidth;
});
// Height Plus Controls
heightPlusBtn.addEventListener("click", () => {
  if (!selectedElement) return;

  const currentHeight = selectedElement.offsetHeight;
  const newHeight = currentHeight + 5;
  selectedElement.style.height = newHeight + "px";
  heightInput.value = newHeight;
});
// Height Minus Controls
heightMinusBtn.addEventListener("click", () => {
  if (!selectedElement) return;

  const currentHeight = selectedElement.offsetHeight;
  const newHeight = currentHeight - 5;
  if (newHeight < 20) return;

  selectedElement.style.height = newHeight + "px";
  heightInput.value = newHeight;
});
// Drag and Drop Functionality
document.addEventListener("mousemove", (e) => {
  if (!isDragging || !selectedElement) return;

  const canvasRect = center.getBoundingClientRect();

  // Mouse position relative to canvas
  let x = e.clientX - canvasRect.left - offsetX;
  let y = e.clientY - canvasRect.top - offsetY;

  // REAL usable canvas size
  const canvasWidth = center.clientWidth;
  const canvasHeight = center.clientHeight;

  const elemWidth = selectedElement.offsetWidth;
  const elemHeight = selectedElement.offsetHeight;

  // Clamp X
  if (x < 0) x = 0;
  if (x + elemWidth > canvasWidth) {
    x = canvasWidth - elemWidth;
  }

  // Clamp Y
  if (y < 0) y = 0;
  if (y + elemHeight > canvasHeight) {
    y = canvasHeight - elemHeight;
  }

  selectedElement.style.left = x + "px";
  selectedElement.style.top = y + "px";
});


document.addEventListener("mouseup", () => {
  isDragging = false;
});

// Color Picker Functionality
colorInput.addEventListener("input", () => {
  if (!selectedElement) return;

  selectedElement.style.backgroundColor = colorInput.value;
});
