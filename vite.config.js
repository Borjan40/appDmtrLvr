import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: './', // Обратите внимание на изменение здесь
  plugins: [react()],
  build: {
    rollupOptions: {
      input: 'src/entry-client.jsx', // И здесь
    },
  },
});