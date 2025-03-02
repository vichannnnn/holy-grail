import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      lineClamp: {
        2: '2',
      },
      colors: {
        'hima-white': '#e5e5e5',
        'hima-dark': '#484b6a',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },

      // This is where you map custom fonts from the ttf files through fonts/stylesheet.css
      fontFamily: {
        PatrickHandSC: ['PatrickHandSC', 'sans-serif'],
        poppins: ['var(--font-poppins)'],
        PlusJakartaSans: ['Plus'],
      },
    },
  },
  plugins: [],
};
export default config;
