import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": "http://localhost:5000",
      "/user": "http://localhost:5000",
      "/userinfo": "http://localhost:5000",
      "/userevent": "http://localhost:5000",
    },
  },
});
