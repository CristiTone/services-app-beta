/** Tailwind config for web - extends shared config and sets content paths */
import base from '@marketplace/config/tailwind-base.js';
export default {
  ...base,
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    '../../packages/ui-react/src/**/*.{js,ts,jsx,tsx}',
  ],
};
