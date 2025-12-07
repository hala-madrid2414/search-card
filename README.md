## Rspeedy project

This is a ReactLynx project bootstrapped with `create-rspeedy`.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Scan the QRCode in the terminal with your LynxExplorer App to see the result.

You can start editing the page by modifying `src/App.jsx`. The page auto-updates as you edit the file.

## Description Of The Project
This pdf doc describes the progress of this task.

It's a pdf version of a feishu doc.

第2周作业进度.pdf

## Backend

Start the backend server from the project root:

```bash
npm run server
```

Start with auto-reload (development):

```bash
npm run server:dev
```

Default port is `8888` (can be overridden via `PORT`).

API endpoints:

- `GET /health`
- `GET /api/shop-header`
- `GET /api/shop-products`
- `GET /api/waterfall-cards`

Static assets:

- Served under `GET /static/...`

For detailed instructions on the Express backend, see the [Express Backend Guide](.trae/documents/EXPRESS_BACKEND_GUIDE.md).
