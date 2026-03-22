import { fileURLToPath } from 'url';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  integrations: [
    react(),
    tailwind({
      config: { path: './tailwind.config.mjs' },
      applyBaseStyles: false,
    }),
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ro'],
    routing: { prefixDefaultLocale: false },
  },
  vite: {
    resolve: {
      alias: {
        // Point react-native to a stub that throws so Platform.tsx's try/catch
        // falls back to div/span. resolve.alias works at the esbuild level and
        // is more reliable than a virtual plugin for noExternal packages.
        'react-native': fileURLToPath(new URL('./src/stubs/react-native.js', import.meta.url)),
      },
    },
    ssr: {
      noExternal: ['@marketplace/shared', '@marketplace/ui-react', '@marketplace/i18n'],
    },
  },
});
