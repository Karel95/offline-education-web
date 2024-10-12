import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      workbox: {
        maximumFileSizeToCacheInBytes: 5000000, // 5 MB
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.mode === 'navigate',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'pages-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 7, // 1 week
              },
            },
          },
        ],
      },
      registerType: 'autoUpdate', // Asegura que las actualizaciones se manejen automáticamente
      manifest: {
        display: 'standalone',
        display_override: ['window-controls-overlay'],
        lang: 'en',
        name: 'Suriname Offline Education Web | By KarlDev',
        short_name: 'EduWeb',
        description: 'PWA for offline access to educational content in regions with limited internet.',
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
  server: {
    hmr: {
      overlay: false, // Desactiva la superposición del Hot Module Replacement
    },
  },
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
});
