import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import ViteImagesPlugin from "vite-plugin-image-presets";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ViteImagesPlugin({
      fileExtensions: ["gif", "webm"],
    }),
  ],
  base: "./",
});
