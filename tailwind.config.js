/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#0a0a0f',
          800: '#12121a',
          700: '#1a1a27',
          600: '#22223a',
          500: '#2d2d4e',
        },
        accent: {
          500: '#6c63ff',
          600: '#5a52e8',
        }
      },
      minHeight: {
        dvh: '100dvh',
      },
      height: {
        dvh: '100dvh',
      },
      spacing: {
        safe: 'env(safe-area-inset-bottom, 0px)',
      },
    },
  },
  plugins: [],
  safelist: [
    'pb-safe-nav',
    'pb-safe',
    'pt-safe',
    'min-h-dvh',
    'touch-target',
    'glass',
    'live-dot',
    'float-up',
    'animate-slide-up',
    'animate-fade-in',
  ],
}
