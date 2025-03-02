import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const host = "https://api-g4fh4sabra-uc.a.run.app";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",  
  server: {
    host: true,
    proxy: {
      // prefix api URLs
      "/jc": {
        target: `${host}/api`,
        changeOrigin: true,
        secure: false,
      },
    },
  },
});