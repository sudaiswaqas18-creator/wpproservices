import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        // Only split heavy UI libs. Never split react/react-router —
        // that breaks Router context (basename useContext null).
        manualChunks(id) {
          if (id.includes('node_modules/framer-motion')) return 'motion';
          if (id.includes('node_modules/lucide-react')) return 'icons';
        },
      },
    },
  },
  server: {
    port: 5173,
    watch: {
      ignored: ['**/.vercel/**'],
    },
    proxy: {
      '/api': {
        target: 'http://localhost:5002',
        changeOrigin: true,
      },
    },
  },
});
