import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "dashboard",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/App.tsx"
      },
      shared: ["react", "react-dom", "@pulsegrid/ui"]
    })
  ],

  // 🧠 This is the critical fix
  build: {
    target: "esnext",            // ✅ enables top-level await
    modulePreload: false,
    minify: false,
    cssCodeSplit: false,
    sourcemap: false,
    rollupOptions: {
      output: {
        format: "es"              // ✅ ensures modern module output
      }
    }
  },

  optimizeDeps: {
    esbuildOptions: {
      target: "esnext"            // ✅ also fixes the pre-bundle phase
    }
  },

  server: {
    port: 5175
  }
});
