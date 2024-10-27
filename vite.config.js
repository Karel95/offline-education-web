import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      workbox: {
        maximumFileSizeToCacheInBytes: 50000000, // 50 MB
        runtimeCaching: [
          {
            // Coincide con cualquier archivo dentro de la carpeta `public`
            urlPattern: /^\/.*\.(?:png|jpg|jpeg|svg|gif|js|json|css)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'assets-cache',
              expiration: {
                maxEntries: 100, // Puede ajustarse según el tamaño de tu proyecto
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 días
              },
            },
          },
          {
            urlPattern: ({ request }) => request.mode === 'navigate',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'pages-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 7, // 1 semana
              },
            },
          },
        ],
      },
      registerType: 'autoUpdate',
      manifest: {
        display: 'standalone',
        name: 'Suriname Offline Education Web | by TechMentors',
        short_name: 'EduWeb',
        description:
          'PWA for offline access to educational content in regions with limited internet.',
        theme_color: '#ffffff',
        background_color: '#000000',
        icons: [
          {
            src: '/img/suriname-logo.png',
            sizes: 'any',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
});
