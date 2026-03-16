// export.js — Export canvas as PNG, JPEG, or clipboard

import { center } from "./canvas.js";
import { showToast } from "./undo.js";

const exportBtn       = document.getElementById("exportBtn");
const exportDropdown  = document.getElementById("exportDropdown");
const exportPNG       = document.getElementById("exportPNG");
const exportJPEG      = document.getElementById("exportJPEG");
const exportClipboard = document.getElementById("exportClipboard");

// Toggle dropdown
exportBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  exportDropdown.classList.toggle("hidden");
});

// Close dropdown on outside click
document.addEventListener("click", () => exportDropdown.classList.add("hidden"));

async function captureCanvas(format = "image/png", quality = 0.95) {
  // Temporarily hide selection outlines
  const selected = center.querySelector(".selected");
  if (selected) selected.classList.remove("selected");
  center.querySelectorAll(".resize-handle").forEach(h => h.style.display = "none");

  const canvas = await html2canvas(center, {
    backgroundColor: null,
    scale: 2,
    useCORS: true,
    allowTaint: true,
  });

  // Restore
  if (selected) selected.classList.add("selected");
  center.querySelectorAll(".resize-handle").forEach(h => h.style.display = "");

  return canvas;
}

exportPNG.addEventListener("click", async () => {
  exportDropdown.classList.add("hidden");
  showToast("Exporting PNG…");
  const canvas = await captureCanvas("image/png");
  download(canvas, "crafto-design.png", "image/png");
});

exportJPEG.addEventListener("click", async () => {
  exportDropdown.classList.add("hidden");
  showToast("Exporting JPEG…");
  const canvas = await captureCanvas("image/jpeg", 0.9);
  download(canvas, "crafto-design.jpg", "image/jpeg", 0.9);
});

exportClipboard.addEventListener("click", async () => {
  exportDropdown.classList.add("hidden");
  showToast("Copying to clipboard…");
  const canvas = await captureCanvas();
  canvas.toBlob(blob => {
    try {
      navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
      showToast("✓ Copied to clipboard!");
    } catch {
      showToast("Clipboard not supported in this browser");
    }
  });
});

function download(canvas, filename, type, quality) {
  const link = document.createElement("a");
  link.download = filename;
  link.href = quality
    ? canvas.toDataURL(type, quality)
    : canvas.toDataURL(type);
  link.click();
  showToast("✓ Download started");
}
