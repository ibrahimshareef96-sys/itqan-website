import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#2f1c2c',
          accent: '#cca4c2',
          'accent-on-light': '#6d4a66',
          'accent-secondary': '#d1c2a5',
          cream: '#fffbf5',
        },
        text: {
          primary: '#1a1a1a',
          secondary: '#666666',
          light: '#fffbf5',
        },
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;
