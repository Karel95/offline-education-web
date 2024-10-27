// vite.config.js
import { defineConfig } from "file:///C:/Users/user/Pictures/KAREL/WebDev/FRONTEND/AI-thon/suriname-offline-education-web/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/user/Pictures/KAREL/WebDev/FRONTEND/AI-thon/suriname-offline-education-web/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { VitePWA } from "file:///C:/Users/user/Pictures/KAREL/WebDev/FRONTEND/AI-thon/suriname-offline-education-web/node_modules/vite-plugin-pwa/dist/index.js";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    VitePWA({
      workbox: {
        maximumFileSizeToCacheInBytes: 5e8,
        // 500 MB
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === "image",
            handler: "CacheFirst",
            options: {
              cacheName: "images-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30
              }
            }
          },
          {
            urlPattern: /\/models\/mobilebert\/.*\.(json|bin)$/,
            handler: "CacheFirst",
            options: {
              cacheName: "models-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30
              }
            }
          },
          {
            urlPattern: ({ request }) => request.mode === "navigate",
            handler: "NetworkFirst",
            options: {
              cacheName: "pages-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 7
                // 1 semana
              }
            }
          }
        ]
      },
      registerType: "autoUpdate",
      manifest: {
        display: "standalone",
        name: "Suriname Offline Education Web | by TechMentors",
        short_name: "EduWeb",
        description: "PWA for offline access to educational content in regions with limited internet.",
        theme_color: "#ffffff",
        background_color: "#000000",
        icons: [
          {
            src: "/img/suriname-logo.png",
            sizes: "any",
            type: "image/png",
            purpose: "any maskable"
          }
        ],
        start_url: "/",
        precache: [
          "/models/mobilebert/model.json",
          "/models/mobilebert/processed_vocab.json"
          // Agrega aquí otros archivos si es necesario
        ]
      }
    })
  ],
  resolve: {
    alias: [{ find: "@", replacement: "/src" }]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFx1c2VyXFxcXFBpY3R1cmVzXFxcXEtBUkVMXFxcXFdlYkRldlxcXFxGUk9OVEVORFxcXFxBSS10aG9uXFxcXHN1cmluYW1lLW9mZmxpbmUtZWR1Y2F0aW9uLXdlYlwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcdXNlclxcXFxQaWN0dXJlc1xcXFxLQVJFTFxcXFxXZWJEZXZcXFxcRlJPTlRFTkRcXFxcQUktdGhvblxcXFxzdXJpbmFtZS1vZmZsaW5lLWVkdWNhdGlvbi13ZWJcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL3VzZXIvUGljdHVyZXMvS0FSRUwvV2ViRGV2L0ZST05URU5EL0FJLXRob24vc3VyaW5hbWUtb2ZmbGluZS1lZHVjYXRpb24td2ViL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XHJcbmltcG9ydCB7IFZpdGVQV0EgfSBmcm9tICd2aXRlLXBsdWdpbi1wd2EnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBwbHVnaW5zOiBbXHJcbiAgICByZWFjdCgpLFxyXG4gICAgVml0ZVBXQSh7XHJcbiAgICAgIHdvcmtib3g6IHtcclxuICAgICAgICBtYXhpbXVtRmlsZVNpemVUb0NhY2hlSW5CeXRlczogNTAwMDAwMDAwLCAvLyA1MDAgTUJcclxuICAgICAgICBydW50aW1lQ2FjaGluZzogW1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICB1cmxQYXR0ZXJuOiAoeyByZXF1ZXN0IH0pID0+IHJlcXVlc3QuZGVzdGluYXRpb24gPT09ICdpbWFnZScsXHJcbiAgICAgICAgICAgIGhhbmRsZXI6ICdDYWNoZUZpcnN0JyxcclxuICAgICAgICAgICAgb3B0aW9uczoge1xyXG4gICAgICAgICAgICAgIGNhY2hlTmFtZTogJ2ltYWdlcy1jYWNoZScsXHJcbiAgICAgICAgICAgICAgZXhwaXJhdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgbWF4RW50cmllczogNTAsXHJcbiAgICAgICAgICAgICAgICBtYXhBZ2VTZWNvbmRzOiA2MCAqIDYwICogMjQgKiAzMCxcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgdXJsUGF0dGVybjogL1xcL21vZGVsc1xcL21vYmlsZWJlcnRcXC8uKlxcLihqc29ufGJpbikkLyxcclxuICAgICAgICAgICAgaGFuZGxlcjogJ0NhY2hlRmlyc3QnLFxyXG4gICAgICAgICAgICBvcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgY2FjaGVOYW1lOiAnbW9kZWxzLWNhY2hlJyxcclxuICAgICAgICAgICAgICBleHBpcmF0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBtYXhFbnRyaWVzOiA1MCxcclxuICAgICAgICAgICAgICAgIG1heEFnZVNlY29uZHM6IDYwICogNjAgKiAyNCAqIDMwLFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICB1cmxQYXR0ZXJuOiAoeyByZXF1ZXN0IH0pID0+IHJlcXVlc3QubW9kZSA9PT0gJ25hdmlnYXRlJyxcclxuICAgICAgICAgICAgaGFuZGxlcjogJ05ldHdvcmtGaXJzdCcsXHJcbiAgICAgICAgICAgIG9wdGlvbnM6IHtcclxuICAgICAgICAgICAgICBjYWNoZU5hbWU6ICdwYWdlcy1jYWNoZScsXHJcbiAgICAgICAgICAgICAgZXhwaXJhdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgbWF4RW50cmllczogMTAsXHJcbiAgICAgICAgICAgICAgICBtYXhBZ2VTZWNvbmRzOiA2MCAqIDYwICogMjQgKiA3LCAvLyAxIHNlbWFuYVxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIF0sXHJcbiAgICAgIH0sXHJcbiAgICAgIHJlZ2lzdGVyVHlwZTogJ2F1dG9VcGRhdGUnLFxyXG4gICAgICBtYW5pZmVzdDoge1xyXG4gICAgICAgIGRpc3BsYXk6ICdzdGFuZGFsb25lJyxcclxuICAgICAgICBuYW1lOiAnU3VyaW5hbWUgT2ZmbGluZSBFZHVjYXRpb24gV2ViIHwgYnkgVGVjaE1lbnRvcnMnLFxyXG4gICAgICAgIHNob3J0X25hbWU6ICdFZHVXZWInLFxyXG4gICAgICAgIGRlc2NyaXB0aW9uOlxyXG4gICAgICAgICAgJ1BXQSBmb3Igb2ZmbGluZSBhY2Nlc3MgdG8gZWR1Y2F0aW9uYWwgY29udGVudCBpbiByZWdpb25zIHdpdGggbGltaXRlZCBpbnRlcm5ldC4nLFxyXG4gICAgICAgIHRoZW1lX2NvbG9yOiAnI2ZmZmZmZicsXHJcbiAgICAgICAgYmFja2dyb3VuZF9jb2xvcjogJyMwMDAwMDAnLFxyXG4gICAgICAgIGljb25zOiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHNyYzogJy9pbWcvc3VyaW5hbWUtbG9nby5wbmcnLFxyXG4gICAgICAgICAgICBzaXplczogJ2FueScsXHJcbiAgICAgICAgICAgIHR5cGU6ICdpbWFnZS9wbmcnLFxyXG4gICAgICAgICAgICBwdXJwb3NlOiAnYW55IG1hc2thYmxlJyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgXSxcclxuICAgICAgICBzdGFydF91cmw6ICcvJyxcclxuICAgICAgICBwcmVjYWNoZTogW1xyXG4gICAgICAgICAgJy9tb2RlbHMvbW9iaWxlYmVydC9tb2RlbC5qc29uJyxcclxuICAgICAgICAgICcvbW9kZWxzL21vYmlsZWJlcnQvcHJvY2Vzc2VkX3ZvY2FiLmpzb24nLFxyXG4gICAgICAgICAgLy8gQWdyZWdhIGFxdVx1MDBFRCBvdHJvcyBhcmNoaXZvcyBzaSBlcyBuZWNlc2FyaW9cclxuICAgICAgICBdLFxyXG4gICAgICB9LFxyXG4gICAgfSksXHJcbiAgXSxcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczogW3sgZmluZDogJ0AnLCByZXBsYWNlbWVudDogJy9zcmMnIH1dLFxyXG4gIH0sXHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTZiLFNBQVMsb0JBQW9CO0FBQzFkLE9BQU8sV0FBVztBQUNsQixTQUFTLGVBQWU7QUFFeEIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sUUFBUTtBQUFBLE1BQ04sU0FBUztBQUFBLFFBQ1AsK0JBQStCO0FBQUE7QUFBQSxRQUMvQixnQkFBZ0I7QUFBQSxVQUNkO0FBQUEsWUFDRSxZQUFZLENBQUMsRUFBRSxRQUFRLE1BQU0sUUFBUSxnQkFBZ0I7QUFBQSxZQUNyRCxTQUFTO0FBQUEsWUFDVCxTQUFTO0FBQUEsY0FDUCxXQUFXO0FBQUEsY0FDWCxZQUFZO0FBQUEsZ0JBQ1YsWUFBWTtBQUFBLGdCQUNaLGVBQWUsS0FBSyxLQUFLLEtBQUs7QUFBQSxjQUNoQztBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsVUFDQTtBQUFBLFlBQ0UsWUFBWTtBQUFBLFlBQ1osU0FBUztBQUFBLFlBQ1QsU0FBUztBQUFBLGNBQ1AsV0FBVztBQUFBLGNBQ1gsWUFBWTtBQUFBLGdCQUNWLFlBQVk7QUFBQSxnQkFDWixlQUFlLEtBQUssS0FBSyxLQUFLO0FBQUEsY0FDaEM7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFVBQ0E7QUFBQSxZQUNFLFlBQVksQ0FBQyxFQUFFLFFBQVEsTUFBTSxRQUFRLFNBQVM7QUFBQSxZQUM5QyxTQUFTO0FBQUEsWUFDVCxTQUFTO0FBQUEsY0FDUCxXQUFXO0FBQUEsY0FDWCxZQUFZO0FBQUEsZ0JBQ1YsWUFBWTtBQUFBLGdCQUNaLGVBQWUsS0FBSyxLQUFLLEtBQUs7QUFBQTtBQUFBLGNBQ2hDO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0EsY0FBYztBQUFBLE1BQ2QsVUFBVTtBQUFBLFFBQ1IsU0FBUztBQUFBLFFBQ1QsTUFBTTtBQUFBLFFBQ04sWUFBWTtBQUFBLFFBQ1osYUFDRTtBQUFBLFFBQ0YsYUFBYTtBQUFBLFFBQ2Isa0JBQWtCO0FBQUEsUUFDbEIsT0FBTztBQUFBLFVBQ0w7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQSxZQUNOLFNBQVM7QUFBQSxVQUNYO0FBQUEsUUFDRjtBQUFBLFFBQ0EsV0FBVztBQUFBLFFBQ1gsVUFBVTtBQUFBLFVBQ1I7QUFBQSxVQUNBO0FBQUE7QUFBQSxRQUVGO0FBQUEsTUFDRjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU8sQ0FBQyxFQUFFLE1BQU0sS0FBSyxhQUFhLE9BQU8sQ0FBQztBQUFBLEVBQzVDO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
