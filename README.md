# QR Code Generator

A browser-based QR code configurator built with React and Vite. Generate, style, and download QR codes without any server - everything runs client-side.

**[Live demo →](https://teduard.github.io/QRCodeGenerator/)**

---

## Features

- **Live preview** - the QR code updates instantly as you type or change any option
- **Dot styles** - square, dots, classy, rounded
- **Corner styles** - dot or square corner markers
- **Color picker** - six preset colours plus a free-form colour input
- **Logo overlay** - embed a preset logo (React, Vite, Gmail) or upload your own image
- **Download** - export as JPG, PNG, SVG, or WebP

---

## Stack

|               |                                                                  |
| ------------- | ---------------------------------------------------------------- |
| Framework     | React 19, Vite                                                   |
| UI components | MUI (Material UI)                                                |
| QR generation | [qr-code-styling](https://github.com/kozakdenys/qr-code-styling) |

---

## Running locally

```bash
npm install
npm run dev
```

---

## Project structure

```
src/
├── App.jsx               - main component, all QR state and handlers
├── ColorSelector.jsx     - preset colour swatches + free-form colour picker
├── StyleSelector.jsx     - dot/corner style thumbnail buttons
├── LogoSelector.jsx      - logo picker with custom upload support
├── Separator.jsx         - thin divider utility component
└── assets/               - style preview thumbnails, logo SVGs
```

---

## License

[MIT](https://choosealicense.com/licenses/mit/)