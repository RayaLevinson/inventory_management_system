import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      components: path.resolve(__dirname, "./src/components"),
      pages: path.resolve(__dirname, "./src/pages"),
      forms: path.resolve(__dirname, "./src/forms"),
      utils: path.resolve(__dirname, "./src/utils"),
      providers: path.resolve(__dirname, "./src/providers"),
      assets: path.resolve(__dirname, "./src/assets"),
      routes: path.resolve(__dirname, "./src/routes"),
      hooks: path.resolve(__dirname, "./src/hooks"),
      config: path.resolve(__dirname, "./src/config"),
      services: path.resolve(__dirname, "./src/services"),
      "@redux": path.resolve(__dirname, "./src/redux"),
    },
  },
  plugins: [react()],
  server: {
    port: 3000
  },
  preview: {
    port: 3000
  }  
});
