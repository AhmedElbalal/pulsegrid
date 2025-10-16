import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "shell",
      remotes: {
        dashboard: "http://localhost:5174/assets/remoteEntry.js",
        reports: "http://localhost:5175/assets/remoteEntry.js",
        collab: "http://localhost:5176/assets/remoteEntry.js"
      },
      shared: ["react", "react-dom", "react-router-dom"]
    })
  ],
  server: { port: 5173 }
});