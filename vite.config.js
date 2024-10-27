import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      workbox: {
        maximumFileSizeToCacheInBytes: 500000000, // 500 MB - review as needed
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
            },
          },
          {
            urlPattern: /\/models\/mobilebert\/.*\.(json|bin)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'models-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
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
                maxAgeSeconds: 60 * 60 * 24 * 7, // 1 week
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
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: '/img/suriname-logo.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
        start_url: '/',
        precache: [
          '/models/mobilebert/model.json',
          '/models/mobilebert/processed_vocab.json',
          // Add more essential files here
        ],
      },
    }),
  ],
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
});
