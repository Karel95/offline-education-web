import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      workbox: {
        maximumFileSizeToCacheInBytes: 4000000, // 4 MB (increase this as needed)
      },
      includeAssets: ['img/**/*'],
      manifest: {
        display: 'standalone',
        display_override: ['window-controls-overlay'],
        lang: 'en',
        name: 'Suriname Offline Education Web | By KarlDev',
        short_name: 'EduWeb',
        description:
          'PWA for offline access to educational content in regions with limited internet.',
        theme_color: '#ffffff',
        background_color: '#000000',
        screenshots: [
          {
            src: '/img/screenshots/desktop-1366x769.png',
            sizes: '1366x769',
            type: 'image/png',
            form_factor: 'wide',
          },
          {
            src: '/img/screenshots/mobile-247x549.png',
            sizes: '247x549',
            type: 'image/png',
            form_factor: 'narrow',
          },
        ],
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
