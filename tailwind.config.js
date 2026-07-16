/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: {
          950: 'var(--color-ink-950)',
          900: 'var(--color-ink-900)',
          800: 'var(--color-ink-800)',
          700: 'var(--color-ink-700)',
          500: 'var(--color-ink-500)',
          400: 'var(--color-ink-400)',
          300: 'var(--color-ink-300)',
          100: 'var(--color-ink-100)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          light: 'var(--color-accent-light)',
          muted: 'var(--color-accent-muted)',
        },
      },
    },
  },
  plugins: [],
};
