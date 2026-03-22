/** NativeWind - Tailwind for React Native. Extends shared base. */
const base = require('@marketplace/config/tailwind-base.js');
module.exports = {
  ...base,
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    '../../packages/ui-react/src/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
};
