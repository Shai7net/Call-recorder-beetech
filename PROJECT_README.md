# BeeTech 3D Voice Recorder

![App Preview](https://via.placeholder.com/800x400?text=BeeTech+3D+Voice+Recorder)

## Project Overview

BeeTech is an interactive, browser-based 3D voice recorder simulation built with React, Vite, Tailwind CSS, and Three.js / React Three Fiber. The application presents a high-fidelity 3D model of a sleek, portable digital voice recorder (styled somewhat like a futuristic industrial device). 

The key highlight of the app is that it's not just a static 3D model; it's a **fully functional voice recorder** tied to the 3D button interactions. Users can power on the device via a physical side toggle switch, press the 3D 'REC' button to actually start recording from their microphone, and press 'STOP' and 'PLAY' to listen back to the audio, complete with a functional retro-digital segment display and status LEDs on the device screen itself. 

It supports both English and Hebrew (`he`) with mirrored UI layouts and bidirectional text.

## Tech Stack & Architecture

- **Framework**: React 18, Vite
- **Styling**: Tailwind CSS
- **3D Graphics & Rendering**: 
  - `three` (Core WebGL)
  - `@react-three/fiber` (React bindings for Three.js)
  - `@react-three/drei` (Useful helpers for R3F like Text, RoundedBox, Html, Environment, OrbitControls)
- **Audio Processing**: Native Web Audio API (`MediaRecorder`)
- **Icons**: `lucide-react`

### File Structure Highlights

- `src/components/Scene.tsx`: The heart of the 3D application. It handles the 3D layout of the recorder (body, buttons, meshes), the custom green digital LED `Html` overlay screen, hotspot labels, and interactive states.
- `src/components/UI.tsx`: The 2D HTML/CSS overlay floating on top of the 3D canvas. Contains the language switcher, device state context, info tutorial modal, and static overlay headers/footers.
- `src/AppContext.tsx`: Global state management for language, device active state (`off`, `idle`, `recording`, `playing`), and tutorial mode logic.
- `src/hooks/useAudioRecorder.ts`: Custom hook to abstract away the browser's `MediaRecorder` API logic, handling permissions, audio chunking, and playback Blobs.
- `vite.config.ts`: Configured with `base: './'` to allow the built HTML/JS files to be opened locally by double-clicking the `index.html` after running `npm run build`.

## Core Features & Mechanics

1. **Interactive Power Switch (`PowerSwitch` in Scene.tsx)**
   - To prevent the scene from rotating while dragging the switch, we temporarily disable `OrbitControls` via the `useThree()` hook. The device screen boots up once the switch hits the upward threshold.
2. **Pressable 3D Buttons (`PressableDeviceButton` in Scene.tsx)**
   - Buttons respond to `onPointerDown`/`onPointerUp` to briefly scale down to `0.9` size, simulating physical travel. 
   - Interactions use `e.stopPropagation()` so clicks don't register on items behind them.
3. **HTML Overlay Screen**
   - The device 'display' is rendered using Drei's `<Html transform>` component embedded onto a 3D Plane. It uses standard Tailwind classes that are projected into 3D space, which allows us to use standard CSS animations (like pulsing LEDs) easily.
4. **Information Hotspots**
   - Raycasted points on the model that show floating lines and tooltips when hovered (`Hotspot` component). The UI adapts entirely to `RTL` when Hebrew is active.
5. **Tutorial Overlay**
   - Guided onboarding overlay managed by `TutorialOverlay` in `UI.tsx`, highlighting specific 3D hotspots based on the active tutorial step.

## Developer Guidelines & Tips (For AI Agents)

1. **3D Interactions vs Camera Controls**: 
   When implementing drag controls on a 3D mesh (like sliders or switches), always remember that `OrbitControls` will try to steal the drag event. You **must** retrieve the controls reference (e.g. `const { controls } = useThree()`) and set `controls.enabled = false` on `pointerdown` and `true` on `pointerup`.
2. **Performance in R3F**: 
   Avoid putting React `useState` changes inside `useFrame` unless absolutely necessary, or else you will trigger continuous React re-renders up to 60fps, tanking performance. Mutate `ref.current.position` or `ref.current.rotation` directly.
3. **Hover States**: 
   Always explicitly revert `document.body.style.cursor = 'auto'` on `onPointerLeave` for 3D elements! Otherwise, the cursor will get stuck as a pointer even after moving the mouse out of the canvas.
4. **Local Builds**:
   The project uses relative asset paths (`base: './'`) so it can be deployed under different URL paths. Serve the exported `dist` bundle over HTTP with `npm run preview`; do not open it directly with a `file://` URL. Browser JavaScript modules and microphone access require HTTP/HTTPS.
5. **Component Separation**:
   `Scene.tsx` is growing large. For future iterations, it is highly recommended to split the `RecorderModel`, `PowerSwitch`, `PressableDeviceButton`, and `Hotspot` into their own files under a `src/components/3d/` directory to prevent the file from becoming unmanageable.

## Running the Project

- `npm install`
- `npm run dev` (Starts development server)
- `npm run build` (Builds for production into `/dist/` folder. Assets are relative).
- `npm run preview` (Serves the production build locally over HTTP).

## Hosting

The production site is deployed to GitHub Pages from the `main` branch:

https://shai7net.github.io/Call-recorder-beetech/
