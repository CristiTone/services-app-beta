import type { Config } from 'tailwindcss';
import base from './tailwind-base.js';

const config: Config = {
  ...base,
  content: [],
  // Apps that use this package should merge and set their own content paths
};

export default config;
