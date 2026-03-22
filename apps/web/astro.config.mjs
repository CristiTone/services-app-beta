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
      // Use div/span on web for ui-react (no react-native dependency in browser)
      alias: {},
    },
    ssr: {
      noExternal: ['@marketplace/shared', '@marketplace/ui-react', '@marketplace/i18n'],
    },
  },
});
