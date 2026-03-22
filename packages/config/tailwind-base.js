/** @type {import('tailwindcss').Config} */
// Base Tailwind config shared by web app and referenced by NativeWind
// Apps extend this and add their content paths
module.exports = {
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
