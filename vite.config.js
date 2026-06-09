import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  server: {
    open: true,
    port: 5173,
  },
});
