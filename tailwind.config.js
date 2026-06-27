/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: {
          950: '#0a0a0f',
          900: '#12121a',
          800: '#1c1c28',
          700: '#2a2a3c',
          500: '#6b6b80',
          300: '#a8a8b8',
          100: '#ececf2',
        },
        accent: {
          DEFAULT: '#6366f1',
          light: '#818cf8',
          muted: 'rgba(99, 102, 241, 0.12)',
        },
      },
    },
  },
  plugins: [],
};
