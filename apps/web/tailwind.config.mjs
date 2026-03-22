/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    '../../packages/ui-react/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        marketplace: {
          primary: '#0ea5e9',
          secondary: '#64748b',
          accent: '#f59e0b',
        },
      },
    },
  },
  plugins: [],
};
