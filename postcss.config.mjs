/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    // Tailwind v4 PostCSS plugin
    "@tailwindcss/postcss": {},
    // Put back what Next.js removes when you add a custom config
    autoprefixer: {},
  },
};

export default config;
