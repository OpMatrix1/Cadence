import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

const repoBase = process.env.GITHUB_REPOSITORY?.split('/')[1];

export default defineConfig({
  base: repoBase ? `/${repoBase}/` : '/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['cadence-icon.svg', 'cadence-logo.svg'],
      manifest: {
        name: 'Cadence',
        short_name: 'Cadence',
        description: 'Build your rhythm with tasks, habits, streaks, and daily focus.',
        theme_color: '#241E33',
        background_color: '#EFEAE2',
        display: 'standalone',
        icons: [
          { src: 'pwa-192x192.svg', sizes: '192x192', type: 'image/svg+xml', purpose: 'any maskable' },
          { src: 'pwa-512x512.svg', sizes: '512x512', type: 'image/svg+xml', purpose: 'any maskable' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico}']
      }
    })
  ]
});
