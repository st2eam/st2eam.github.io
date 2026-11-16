import { type Plugin, defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath, URL } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

/** GitHub Pages SPA：刷新深链时用 404.html 回退到 index */
function spaFallback404(): Plugin {
  return {
    name: 'spa-fallback-404',
    closeBundle() {
      const indexHtml = resolve(__dirname, 'docs/index.html');
      const notFound = resolve(__dirname, 'docs/404.html');
      if (existsSync(indexHtml)) {
        copyFileSync(indexHtml, notFound);
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), spaFallback404()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@/components': resolve(__dirname, 'src/components'),
      '@/pages': resolve(__dirname, 'src/pages'),
      '@/styles': resolve(__dirname, 'src/styles'),
      '@/utils': resolve(__dirname, 'src/utils'),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  build: {
    outDir: 'docs',
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        // 只给实际引入的模块分包，避免为分包扫描组件库的整包入口。
        manualChunks(id) {
          if (/\/node_modules\/(?:@mui|@emotion)\//.test(id)) return 'mui';
          if (
            /\/node_modules\/(?:react|react-dom|react-router|react-router-dom|scheduler)\//.test(id)
          ) {
            return 'react';
          }
          if (/\/node_modules\/(?:motion|motion-dom|motion-utils|framer-motion)\//.test(id)) {
            return 'motion';
          }
        },
      },
    },
  },
});
