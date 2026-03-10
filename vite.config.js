import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import autoprefixer from 'autoprefixer';
import critical from 'rollup-plugin-critical';

const commonInclude = [
  /^\.header/,
  /^\.container/,
  /^\.breadcrumbs/,
  /^\.mobile-menu/,
  /^\.modal/,
  /^\.overlay/,
];

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
      // plugins: [
      //   critical({
      //     criticalUrl: './dist/', // Где лежат собранные файлы
      //     criticalBase: './dist/',
      //     // Список страниц для анализа
      //     criticalPages: [
      //       {
      //         uri: 'index.html',
      //         template: 'index',
      //         criticalConfig: {
      //           include: [
      //             ...commonInclude,
      //             /^\.author-card/,
      //             /^\.promo-banner/,
      //           ],
      //         },
      //       },
      //       {
      //         uri: 'index.html',
      //         template: 'index',
      //         criticalConfig: { include: commonInclude },
      //       },
      //       {
      //         uri: 'about.html',
      //         template: 'about',
      //         criticalConfig: { include: commonInclude },
      //       },
      //       {
      //         uri: 'articles.html',
      //         template: 'articles',
      //         criticalConfig: { include: commonInclude },
      //       },
      //       {
      //         uri: 'services.html',
      //         template: 'services',
      //         criticalConfig: { include: commonInclude },
      //       },
      //       {
      //         uri: 'site-map.html',
      //         template: 'siteMap',
      //         criticalConfig: { include: commonInclude },
      //       },
      //       {
      //         uri: '404.html',
      //         template: '404',
      //         criticalConfig: { include: commonInclude },
      //       },
      //     ],
      //     criticalConfig: {
      //       inline: true,
      //       dimensions: [
      //         { width: 375, height: 667 }, // Мобильные (Mobile-First!)
      //         { width: 1366, height: 1080 },
      //       ],
      //       ignore: {
      //         atrule: ['@font-face'],
      //         rule: [/^\.main$/, /^\.footer/],
      //       },
      //       extract: false,
      //     },
      //   }),
      // ],
      output: {
        entryFileNames: 'assets/js/[name].js',
        chunkFileNames: 'assets/js/[name].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'assets/css/[name].[ext]'; // Сохранит оригинальные имена файлов
          }
          return 'assets/[name].[ext]';
        },
      },
    },
  },
});
