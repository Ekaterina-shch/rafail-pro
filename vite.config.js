import { defineConfig } from 'vite';

import { resolve } from 'node:path';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  css: {
    postcss: {
      plugins: [
        autoprefixer({
          overrideBrowserslist: ['last 5 versions', '> 1%', 'ie 10'],
        }),
      ],
    },
  },
  build: {
    rollupOptions: {
      input: {
        // Явно указываем JS как основной entry point
        main: resolve(__dirname, 'src/js/main.js'),
        // HTML файлы
        index: resolve(__dirname, 'index.html'),
        404: resolve(__dirname, '404.html'),
        about: resolve(__dirname, 'about.html'),
        articles: resolve(__dirname, 'articles.html'),
        services: resolve(__dirname, 'services.html'),
        siteMap: resolve(__dirname, 'site-map.html'),
      },
      plugins: [
        critical({
          criticalUrl: './dist/', // Где лежат собранные файлы
          criticalBase: './dist/',
          // Список страниц для анализа
          criticalPages: [
            { uri: 'index.html', template: 'index' },
            { uri: 'services.html', template: 'services' },
            { uri: 'articles.html', template: 'articles' },
          ],
          criticalConfig: {
            dimensions: [
              { width: 375, height: 667 }, // Мобильные (Mobile-First!)
              { width: 1366, height: 768 },
            ],
          },
        }),
      ],
      output: {
        entryFileNames: (chunkInfo) => {
          // Если это наш main.js entry point
          if (chunkInfo.name === 'main') {
            return 'assets/main.js';
          }
          return 'assets/[name].js';
        },
        chunkFileNames: 'assets/[name].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'assets/style.css';
          }
          return 'assets/[name].[ext]';
        },
        manualChunks: undefined,
      },
    },
    cssCodeSplit: false,
  },
});
