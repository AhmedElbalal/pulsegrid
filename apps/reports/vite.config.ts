import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

// ✅ Fixes top-level await errors
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "app-reports",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/App.tsx",
      },
      shared: ["react", "react-dom", "@pulsegrid/ui", "@pulsegrid/utils"],
    }),
  ],

  build: {
    target: "esnext",        // ✅ allow top-level await
    modulePreload: false,
    cssCodeSplit: true,
    sourcemap: false,
    minify: true,
  },

  optimizeDeps: {
    esbuildOptions: {
      target: "esnext",      // ✅ important fix
    },
  },

  server: {
    port: 5175,
  },
});
