# Crafto 🎨

Crafto is a lightweight browser-based design editor inspired by tools like Canva and Figma.  
It allows users to create simple designs using shapes, text, and images directly on a canvas.

This project is built completely using **HTML, SCSS, and Vanilla JavaScript**, without any frameworks.

---

## ✨ Features

### 🧱 Shapes
- Rectangle
- Square
- Circle
- Line

Each shape can be:
- Selected
- Dragged inside the canvas
- Resized using controls
- Recolored
- Deleted

---

### 📝 Text Tools
- Heading
- Sub-Heading
- Paragraph
- Editable directly on the canvas
- Font size control
- Text color control

---

### 🖼 Image Upload
- Upload images from local system
- Images behave like other elements:
  - Drag
  - Resize
  - Delete

---

### 🗂 Layers Panel
- Displays all elements added to the canvas
- Click to select elements
- Move layers up and down using z-index
- Active layer highlighting

---

### 🎛 Property Controls
- Width & Height controls
- Font size controls (for text)
- Color picker (auto-detects shape or text)
- Minimum size constraints for better UX

---

### ⬇️ Download
- Export the canvas as a PNG image
- Uses `html2canvas` for client-side rendering
- No backend required

---

## 🛠 Tech Stack

- HTML
- SCSS (for structured styling)
- Vanilla JavaScript (ES Modules)
- html2canvas (for download functionality)

---

## 🧠 Architecture

The JavaScript code is structured using modules for better readability and scalability:

