import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    outDir: fileURLToPath(new URL('../templates/assets/lit-dist', import.meta.url)),
    lib: {
      entry: 'src/index.ts',
      name: 'vapor-lit-wc',
      fileName: 'vapor-lit-wc',
      formats: ['iife'],
    },
    emptyOutDir: true,
    rollupOptions: {
      output: {
        extend: true,
      },
    },
  },
  plugins: [
    // UnoCSS({
    //   mode: 'shadow-dom',
    //   presets: [presetUno(), presetIcons()],
    // }),
    dts(),
  ],
});
