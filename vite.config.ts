import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import compressPlugin from "vite-plugin-compression";

export default defineConfig({
  plugins: [
    compressPlugin({
      ext: ".gz",
    }),
  ],
  build: {
    outDir: fileURLToPath(new URL("./templates/assets/dist", import.meta.url)),
    emptyOutDir: true,
    lib: {
      entry: path.resolve(__dirname, "src/main.ts"),
      name: "main",
      fileName: "main",
      formats: ["iife"],
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    assetsInlineLimit: 2048,
    chunkSizeWarningLimit: 2000,
    minify: "terser",
  },
});
