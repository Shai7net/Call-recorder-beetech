/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AppProvider } from "./AppContext";
import { Scene } from "./components/Scene";
import { MainUI } from "./components/UI";

export default function App() {
  return (
    <AppProvider>
      <div className="w-full h-screen bg-[#181a1f] relative overflow-hidden font-sans flex flex-col">
          {/* 3D Canvas Layer */}
          <div className="absolute inset-0 z-0">
              <Scene />
          </div>

          {/* UI Overlay Layer */}
          <div className="absolute inset-0 z-10 pointer-events-none">
              <MainUI />
          </div>
      </div>
    </AppProvider>
  );
}
