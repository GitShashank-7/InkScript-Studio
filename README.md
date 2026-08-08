# InkScript Studio 📝✨

> **Turn your Word, PDF, PowerPoint, and text documents into beautiful, customizable handwritten notes.**

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Open_App-6366f1?style=for-the-badge)](https://gitshashank-7.github.io/InkScript-Studio/)
![Status](https://img.shields.io/badge/Status-Active-brightgreen) ![HTML5](https://img.shields.io/badge/Frontend-HTML5%2FCSS3%2FJS-blue) ![License](https://img.shields.io/badge/License-MIT-purple)

### 🚀 Live Website: [https://gitshashank-7.github.io/InkScript-Studio/](https://gitshashank-7.github.io/InkScript-Studio/)

**InkScript Studio** is an interactive web application that parses uploaded documents (`.docx`, `.pdf`, `.pptx`, `.txt`, `.md`) and renders them into authentic, customizable handwritten exam and lecture notes. Features real-time editing, human slant/position jitter, adaptive ruled line matching, and high-res PNG/PDF export.

---

## 🌟 Key Features

- 🌐 **Try it Live**: Access the application instantly at [https://gitshashank-7.github.io/InkScript-Studio/](https://gitshashank-7.github.io/InkScript-Studio/).
- 📄 **Multi-Format Document Parsing**: Import `.docx` (via Mammoth.js), `.pdf` (via PDF.js), `.pptx` (via JSZip XML parser), `.txt`, and `.md` files directly in your browser.
- ✒️ **Realistic Handwriting & Fonts**: 9 Google Handwriting Fonts (`Kalam`, `Caveat`, `Patrick Hand`, `Shadows Into Light`, `Gochi Hand`, `Architects Daughter`, `Indie Flower`, `Caveat Brush`, `Permanent Marker`).
- 🎲 **Human Realism & Slant Jitter**: Micro-rotations and vertical shifts applied per word for an authentic human handwriting feel.
- 📐 **Dynamic Paper Line Matching**: Paper ruled lines automatically rescale (`--rule-height = font-size * line-height`) as font size changes, keeping handwritten text resting on ruled lines.
- 🎨 **Paper & Ink Customization**: Single Ruled, Graph Grid, Dot Journal, Aged Parchment, Legal Yellow Pad, and Plain Sheet. Custom ink palettes (Classic Blue, Midnight, Sepia, Charcoal) and pickers.
- ✏️ **Live Markdown & Direct Canvas Editing**: Rich Markdown editor with toolbar buttons for H1-H3, Bold, Highlights, `[box:]`, `[formula:]`, `[diagram:]`, and Hand-Drawn Tables `| col |`. Direct inline canvas editing on the notebook page.
- 📥 **High-Res Export**: Save notebook pages as high-resolution PNG images (`html2canvas`), PDF documents (`html2pdf.js`), or print.

---

## 💻 Running Locally

### 1. Clone the Repository
```bash
git clone https://github.com/GitShashank-7/InkScript-Studio.git
cd InkScript-Studio
```

### 2. Launch Dev Server
You can open `index.html` directly in any web browser, or serve it using any HTTP dev server:
```bash
npx http-server . -p 8080
```
Then visit `http://localhost:8080`.

---

## 🛠️ Built With

- **HTML5 & Vanilla CSS3**: Custom notebook paper design system and glassmorphism UI.
- **Vanilla JavaScript (ES6+)**: Document parsing, markdown DOM compilation, slant jitter engine.
- **Libraries (via CDN)**:
  - [Mammoth.js](https://github.com/mwilliamson/mammoth.js) - Word `.docx` text extraction.
  - [PDF.js](https://mozilla.github.io/pdf.js/) - PDF document parsing.
  - [JSZip](https://stuk.github.io/jszip/) - PowerPoint `.pptx` slide text extraction.
  - [html2canvas](https://html2canvas.hertzen.com/) & [html2pdf.js](https://github.com/eKoopmans/html2pdf.js) - Image and PDF exports.

---

## 📜 License

Distributed under the MIT License.
