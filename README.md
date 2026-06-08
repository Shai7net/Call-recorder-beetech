# BeeTech BT-REC02 Recorder Demo

Interactive React, Three.js, and Web Audio demo for the BeeTech BT-REC02
recorder.

## Run Locally

Prerequisite: Node.js 18 or newer.

```sh
npm install
npm run dev
```

Open the URL printed by Vite, normally <http://localhost:3000>.
On Windows, you can also double-click `Run_Local_Server.bat`.

Do not open `index.html` or `dist/index.html` directly with a `file://` URL.
Browser JavaScript modules and microphone access require the app to be served
over HTTP. Production hosting must use HTTPS for microphone access; GitHub
Pages provides HTTPS automatically.

To test the production build locally:

```sh
npm run build
npm run preview
```

## Live Site

[https://shai7net.github.io/Call-recorder-beetech/](https://shai7net.github.io/Call-recorder-beetech/)

## Deploy to GitHub Pages

Pushes to the `main` branch automatically build and deploy the site through
the GitHub Actions workflow in `.github/workflows/deploy-pages.yml`.
