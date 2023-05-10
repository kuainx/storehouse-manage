import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import viteCompression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteCompression({
      threshold: 1024000, // 对大于 1mb 的文件进行压缩
    }),
  ],
  base: './',
  server: {
    host: '127.0.0.1',
    port: 3000,
    proxy: {
      '/api': 'http://storehouse.demo.ekuai.tech',
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: id => {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
});
