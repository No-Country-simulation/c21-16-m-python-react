import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path'; // Importar 'resolve' desde 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    open: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'), // Usa 'resolve' para definir el alias correctamente
    },
  },
});

