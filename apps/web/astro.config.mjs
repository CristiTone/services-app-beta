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
    plugins: [
      {
        // Stub react-native so esbuild never tries to parse its Flow syntax.
        // Platform.tsx wraps the require() in try/catch — the stub throws,
        // catch runs, and web falls back to div/span.
        name: 'react-native-stub',
        resolveId(id) {
          if (id === 'react-native') return '\0react-native-stub';
        },
        load(id) {
          if (id === '\0react-native-stub')
            return `throw new Error('react-native is not available in web context');`;
        },
      },
    ],
    ssr: {
      noExternal: ['@marketplace/shared', '@marketplace/ui-react', '@marketplace/i18n'],
    },
  },
});
