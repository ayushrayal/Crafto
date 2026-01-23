import { center } from "./canvas.js";

const downloadBtn = document.getElementById("download");

downloadBtn.addEventListener("click", async () => {
  const canvas = await html2canvas(center, {
    backgroundColor: "#000", // match canvas bg
    scale: 2               // better quality
  });

  const link = document.createElement("a");
  link.download = "crafto-design.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
});
