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
over HTTP. Production hosting must use HTTPS for microphone access; Netlify
provides HTTPS automatically.

To test the production build locally:

```sh
npm run build
npm run preview
```

## Deploy to Netlify

This repository includes `netlify.toml`, so Netlify will use:

- Build command: `npm run build`
- Publish directory: `dist`

You can connect the folder to a Git repository in Netlify, or deploy it with
the Netlify CLI:

```sh
npx netlify login
npx netlify deploy --build
npx netlify deploy --build --prod
```

The first deploy may ask you to create or link a Netlify site.
