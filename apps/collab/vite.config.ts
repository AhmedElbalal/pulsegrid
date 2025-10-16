import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "collab",
      filename: "remoteEntry.js",
      exposes: { "./App": "./src/App.tsx" },
      shared: ["react", "react-dom", "socket.io-client", "@pulsegrid/ui"]
    })
  ],
  server: { 
    port: 3002 
  },
  build: {
    target: 'es2022',
    minify: false,
  }
});